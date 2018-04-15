import * as R from 'ramda';
import createMailgunClient from 'mailgun-js';
import MailComposer from 'nodemailer/lib/mail-composer';
import env from '../config/env';
import * as pesposaConfig from '../config/pesposa';

const mailgun = createMailgunClient({
  apiKey: env.mailgunApiKey,
  domain: env.mailgunDomain,
});

export const send = mailOptions =>
  new Promise((resolve, reject) => {
    const fromName = R.propOr('Pesposa', 'fromName', mailOptions);
    const finalMailOptions = R.merge(
      {
        from: `${fromName} <${pesposaConfig.NO_REPLY_EMAIL_ADDRESS}>`,
      },
      R.omit(['fromName'], mailOptions),
    );
    const mail = new MailComposer(finalMailOptions);

    mail.compile().build((err, message) => {
      if (err) {
        reject(err);
        return;
      }

      const dataToSend = {
        to: mailOptions.to,
        message: message.toString('ascii'),
      };

      mailgun.messages().sendMime(dataToSend, sendError => {
        if (sendError) {
          reject(sendError);
        } else {
          resolve();
        }
      });
    });
  });
