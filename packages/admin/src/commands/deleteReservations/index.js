import fs from 'fs';
import readline from 'readline';
import * as R from 'ramda';
import fetch from 'node-fetch';
import log from '@pesposa/core/src/utils/log';

// BETA

const CREATE_RESERVATION_URL =
  'https://pesposa.app.waitlisted.co/api/v2/reservations';
const WAITLISTED_API_KEY = '67f166d0daf65e9b8ff0dc8761bf50d2';

const remove = async email => {
  try {
    const response = await fetch(CREATE_RESERVATION_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-Key': WAITLISTED_API_KEY,
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    log.success(`Deleted Waitlisted reservation (email=${email})`);
  } catch (error) {
    log.error(`Failed to delete Waitlisted reservation (email=${email})`);
    log.error(error);
  }
};

const bulkRemove = async filePath => {
  const input = fs.createReadStream(filePath);
  const readInterface = readline.createInterface({ input });

  return new Promise(resolve => {
    let isLast = false;
    readInterface.on('line', async line => {
      readInterface.pause();
      const parts = R.split(',', line);
      const email = parts[0];
      await remove(email);

      if (isLast) {
        resolve();
      } else {
        setTimeout(() => readInterface.resume(), 2000);
      }
    });

    readInterface.on('close', () => {
      isLast = true;
    });
  });
};

const deleteReservations = async file => {
  await bulkRemove(file);

  // process.exit();
};

const command = program =>
  program
    .command('deleteReservations')
    .arguments('<file>', 'File path to import data (bulk create)')
    .description('Add an email to the waiting list')
    .action(deleteReservations);

export default command;
