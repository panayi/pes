import * as R from 'ramda';
import { database } from '@pesposa/core/src/config/firebaseClient';
import log from '@pesposa/core/src/utils/log';

// BETA

const addBetaUser = async options => {
  try {
    const { email, phone, providerId } = options;

    if (!email && !phone && !providerId) {
      throw new Error('An email, phone, or providerId must be provided');
    }

    let data;
    if (email) {
      data = { email };
    } else if (phone) {
      data = { phone };
    } else {
      data = { providerId };
    }
    const [authMethod, value] = R.compose(R.head, R.toPairs)(data);

    const ref = database.ref('/betaUsers');

    // Make sure beta user doesn't already exist
    const betaUsers = (await ref.once('value')).val();
    const alreadyExists = R.compose(R.find(R.equals(data)), R.values)(
      betaUsers,
    );
    if (alreadyExists) {
      throw new Error(`Beta user with ${authMethod}=${value} already exists`);
    }

    // Else add the user
    await database.ref('/betaUsers').push(data);
    log.success(`Added beta user with ${authMethod}=${value}`);
  } catch (error) {
    log.error(error);
  }

  process.exit();
};

const command = program =>
  program
    .command('addBetaUser')
    .option('-e, --email [email]', 'Give beta access to an email')
    .option('-p, --phone [phone]', 'Give beta access to a phone number')
    .option(
      '-i, --providerId [providerId]',
      'Give beta access to a providerId (Google or Facebook uid)',
    )
    .description('Add a beta user')
    .action(addBetaUser);

export default command;
