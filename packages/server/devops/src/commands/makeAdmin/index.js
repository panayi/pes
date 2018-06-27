import * as admin from 'firebase-admin';
import logger from 'winston-color';
import env from '@pesposa/core/src/config/env';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import server from '@pesposa/server-core/src/server';

const makeAdmin = async email => {
  try {
    if (!email) {
      logger.error('Need to pass an email');
      process.exit();
    }

    const emailDomain = email.replace(/.*@/, '');
    if (emailDomain !== env.internalEmailDomain) {
      logger.error(
        `Email domain does not match the internal email domain (${
          env.internalEmailDomain
        })`,
      );
      process.exit();
    }

    const userSnap = await server.users.findByEmail(firebase, email);
    if (!userSnap) {
      logger.error(`User with email=${email} does not exist`);
      process.exit();
    }

    const userId = userSnap.key;
    const claims = {
      admin: true,
    };
    await admin.auth().setCustomUserClaims(userId, claims);
    logger.info('Done!');
    process.exit();
  } catch (error) {
    logger.error(error);
    process.exit();
  }
};

const command = program =>
  program
    .command('makeAdmin <email>')
    .description('Make a user an admin')
    .action(makeAdmin);

export default command;
