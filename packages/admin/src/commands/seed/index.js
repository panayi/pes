import path from 'path';
import fs from 'fs';
import * as R from 'ramda';
import mime from 'mime-types';
import { database } from '@pesposa/core/src/config/firebaseClient';
import log from '@pesposa/core/src/utils/log';
import promiseSerial from '@pesposa/core/src/utils/promiseSerial';
import * as storageService from '@pesposa/core/src/services/storage';
import categories from '@pesposa/core/src/database/seeds/categories.json';
import translations from '@pesposa/core/src/database/seeds/translations.json';

const seedCategories = async () => {
  log.info('Firebase: seeding categories...');
  await database.ref('categories').set(categories);
};

const seedTranslations = async () => {
  log.info('Firebase: seeding translations...');
  await database.ref('translations').set(translations);
};

const seedCountryFlags = async () => {
  log.info('Firebase: seeding country flags...');
  const parentPath = path.join(
    process.cwd(),
    'packages',
    'core',
    'src',
    'database',
    'seeds',
    'images',
    'countries',
  );
  const filenames = fs
    .readdirSync(parentPath)
    .filter(f => fs.statSync(path.join(parentPath, f)).isFile());

  return promiseSerial(
    R.map(
      filename => () => {
        const filePath = path.join(parentPath, filename);
        const fileProps = path.parse(filePath);
        /* eslint-disable */
        const file = require('@pesposa/core/src/database/seeds/images/countries/' +
          filename);
        /* eslint-enable */
        return storageService.uploadFile(
          file,
          'image/png',
          'countries',
          filename,
          metadata =>
            database.ref(`countryFlags/${fileProps.name}`).set(metadata),
        );
      },
      filenames,
    ),
  );
};

const uploadFiles = async () => {
  log.info('Firebase: uploading files...');
  const parentPath = path.join(
    process.cwd(),
    'packages',
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
        /* eslint-disable */
        const file = require('@pesposa/core/src/database/seeds/images/uploads/' +
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
    await uploadFiles();
    await seedCountryFlags();
    log.info('Firebase: Seeded categories, locales, countries');
  } catch (error) {
    log.error('Firebase: Failed to seed data');
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
