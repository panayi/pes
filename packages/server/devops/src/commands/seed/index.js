import path from 'path';
import fs from 'fs';
import * as R from 'ramda';
import mime from 'mime-types';
import logger from 'winston-color';
import env from '@pesposa/core/src/config/env';
import promiseSerial from '@pesposa/core/src/utils/promiseSerial';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import * as storageService from '@pesposa/server-core/src/services/storage';
import categories from '@pesposa/server-core/src/database/seeds/categories.json';
import translations from '@pesposa/server-core/src/database/seeds/translations.json';
import locations from '@pesposa/server-core/src/database/seeds/locations.json';
import rejectionReasons from '@pesposa/server-core/src/database/seeds/rejectionReasons.json';
import messageTemplates from '@pesposa/server-core/src/database/seeds/messageTemplates.json';

const seedCategories = async () => {
  logger.info('Firebase: seeding categories...');
  await firebase.set('categories', categories);
};

const seedTranslations = async () => {
  logger.info('Firebase: seeding translations...');
  await firebase.set('translations', translations);
};

const seedLocations = async () => {
  logger.info('Firebase: seeding locations...');
  await firebase.set('locations', locations);
};

const seedRejectionReasons = async () => {
  logger.info('Firebase: seeding rejectionReasons...');
  await Promise.all(
    R.map(
      rejectionReason =>
        firebase.set(`/rejectionReasons/${rejectionReason}`, true),
      rejectionReasons,
    ),
  );
};

const seedMessageTemplates = async () => {
  logger.info('Firebase: seeding messageTemplates...');
  await firebase.set('messageTemplates', messageTemplates);
};

const seedCountryFlags = async () => {
  logger.info('Firebase: seeding country flags...');

  const { countrySites } = env;
  const countriesToAdd = R.map(R.toLower, countrySites);

  const parentPath = path.join(
    process.cwd(),
    'packages',
    'server',
    'core',
    'src',
    'database',
    'seeds',
    'images',
    'countries',
  );

  return promiseSerial(
    R.map(
      country => () => {
        const filename = `${country}.png`;
        const filePath = path.join(parentPath, filename);
        const fileProps = path.parse(filePath);
        /* eslint-disable */
        const file = require('@pesposa/server-core/src/database/seeds/images/countries/' +
          filename);
        /* eslint-enable */
        return storageService.uploadFile(
          file,
          'image/png',
          'countries',
          filename,
          metadata => firebase.set(`countryFlags/${fileProps.name}`, metadata),
        );
      },
      countriesToAdd,
    ),
  );
};

const uploadFiles = async () => {
  logger.info('Firebase: uploading files...');
  const parentPath = path.join(
    process.cwd(),
    'packages',
    'server',
    'core',
    'src',
    'database',
    'seeds',
    'images',
    'uploads',
  );

  const filenames = fs
    .readdirSync(parentPath)
    .filter(f => fs.statSync(path.join(parentPath, f)).isFile());

  return promiseSerial(
    R.map(
      filename => () => {
        // Ignore .DS_Store and other hidden files
        if (R.head(filename) === '.') {
          return Promise.resolve();
        }

        /* eslint-disable */
        const file = require('@pesposa/server-core/src/database/seeds/images/uploads/' +
          filename);
        const contentType = mime.lookup(filename);
        /* eslint-enable */
        return storageService.uploadFile(
          file,
          contentType,
          'uploads',
          filename,
        );
      },
      filenames,
    ),
  );
};

export const seed = async () => {
  try {
    await seedCategories();
    await seedTranslations();
    await seedLocations();
    await seedRejectionReasons();
    await seedMessageTemplates();
    await uploadFiles();
    await seedCountryFlags();
    logger.info('Firebase: Done');
  } catch (error) {
    logger.error('Firebase: Failed to seed data');
    throw error;
  }
};

const command = program =>
  program
    .command('seed')
    .description(
      'Seed Firebase DB with static data (categories, countryFlags, translations)',
    )
    .action(async (...args) => {
      await seed(...args);
      process.exit();
    });

export default command;
