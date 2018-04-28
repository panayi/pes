import fs from 'fs';
import readline from 'readline';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import fetch from 'node-fetch';
import log from '@pesposa/core/src/utils/log';

// BETA

const CREATE_RESERVATION_URL =
  'https://pesposa.app.waitlisted.co/api/v2/reservations';
const WAITLISTED_API_KEY = '67f166d0daf65e9b8ff0dc8761bf50d2';

const create = async (email, name, timeout) =>
  new Promise(resolve => {
    setTimeout(async () => {
      try {
        const response = await fetch(CREATE_RESERVATION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-API-Key': WAITLISTED_API_KEY,
          },
          body: JSON.stringify({
            reservation: {
              name: isNilOrEmpty(name) ? email : name,
              email,
            },
          }),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        log.success(
          `Created Waitlisted reservation for name=${name} email=${email}`,
        );
      } catch (error) {
        log.error(
          `Failed to create Waitlisted reservation for name=${name} email=${email}`,
        );
        log.error(error);
      }
      resolve();
    }, timeout);
  });

const bulkCreate = async filePath => {
  const input = fs.createReadStream(filePath);
  const readInterface = readline.createInterface({ input });
  let count = 0;

  readInterface.on('line', line => {
    const parts = R.split(',', line);
    const email = parts[0];
    const name = parts[1] || email;
    create(email, name, count * 1000);
    count += 1;
  });
};

const joinWaitingList = async options => {
  const { file, email, name } = options;

  if (file) {
    await bulkCreate(file);
  } else if (email) {
    const finalName = name || email;
    await create(email, finalName);
  } else {
    log.error('A file or email should be specified');
  }

  // process.exit();
};

const command = program =>
  program
    .command('joinWaitingList')
    .option('-e, --email [email]', 'Email of the user')
    .option('-n, --name [name]', 'Name of the user')
    .option('-f, --file [file]', 'File path to import data (bulk create)')
    .description('Add an email to the waiting list')
    .action(joinWaitingList);

export default command;
