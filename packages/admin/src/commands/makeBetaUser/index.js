import { database } from '@pesposa/core/src/config/firebaseClient';
import log from '@pesposa/core/src/utils/log';

// BETA

const makeBetaUser = async options => {
  try {
    const { userId } = options;

    if (!userId) {
      throw new Error('`userId` must be provided');
    }

    // Make sure user exists
    const userSnapshot = await database
      .ref('/users')
      .child(userId)
      .once('value');
    if (!userSnapshot.exists()) {
      throw new Error(`User with userId=${userId} does not exist`);
    }

    const ref = database.ref('/betaUsers');

    // Make sure beta user doesn't already exist
    const betaUserSnapshot = await ref.child(userId).once('value');
    if (betaUserSnapshot.exists()) {
      throw new Error(`User with userId=${userId} is already a beta user`);
    }

    // Else convert the user to a beta user
    await ref.child(userId).set(true);
    log.success(`User with userId=${userId} is now a beta user`);
  } catch (error) {
    log.error(error);
  }

  process.exit();
};

const command = program =>
  program
    .command('makeBetaUser')
    .option(
      '-u, --userId [userId]',
      'Give beta access to user with id=<userId>',
    )
    .description('Make a user a beta user')
    .action(makeBetaUser);

export default command;
