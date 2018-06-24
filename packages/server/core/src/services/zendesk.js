import * as R from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import zendesk from 'node-zendesk';
import env from '@pesposa/core/src/config/env';

const client = zendesk.createClient({
  username: env.zendeskUsername,
  token: env.zendeskToken,
  remoteUri: env.zendeskApiUrl,
});

const createOrUpdateUser = props =>
  new Promise((resolve, reject) => {
    const payload = {
      user: R.compose(
        R.filter(R.identity),
        renameKeys({
          uid: 'external_id',
        }),
      )(props),
    };
    client.users.createOrUpdate(payload, (error, req, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.id);
      }
    });
  });

export const createTicket = props =>
  new Promise((resolve, reject) => {
    const { subject, body } = props;
    const userProps = R.pick(['uid', 'email', 'name'], props);
    createOrUpdateUser(userProps)
      .then(zendeskUserId => {
        const payload = {
          ticket: {
            subject,
            comment: {
              body,
            },
            requester_id: zendeskUserId,
          },
        };
        client.tickets.create(payload, error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      })
      .catch(reject);
  });
