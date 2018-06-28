import fs from 'fs-extra';
import path from 'path';
import * as R from 'ramda';
import shuffle from 'lodash.shuffle';
import logger from 'winston-color';
import promiseSerial from '@pesposa/core/src/utils/promiseSerial';
import env from '@pesposa/core/src/config/env';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import * as storageConfig from '@pesposa/core/src/config/storage';
import apps from '@pesposa/core/src/config/apps';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import generateId from '@pesposa/core/src/utils/generateId';
import client from '@pesposa/core/src/client';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import getValidPhoneNumber from '@pesposa/server-core/src/utils/getValidPhoneNumber';
import server from '@pesposa/server-core/src/server';
import renameFile from '@pesposa/server-core/src/utils/renameFile';
import * as storageService from '@pesposa/server-core/src/services/storage';
import * as pathsConfig from '../../config/paths';

const devopsUid = apps.DEVOPS.uid;

const uploadImage = async (buffer, filename, contentType) => {
  const newFilename = renameFile(generateId(), filename);

  return storageService.uploadFile(
    buffer,
    contentType,
    storageConfig.IMAGES_PATH,
    newFilename,
    metadata =>
      firebase.push(`${modelPaths.DRAFTS(devopsUid).string}/images`, metadata),
  );
};

const uploadImages = images => {
  const funcs = R.compose(
    R.map(image => () =>
      uploadImage(image.buffer, image.filename, image.contentType),
    ),
    R.defaultTo([]),
  )(images);

  return promiseSerial(funcs);
};

const createAd = async dirname => {
  try {
    logger.info(
      `Publishing test ad from ${path.join(
        pathsConfig.LEGACY_ADS_OUTPUT_PATH,
        dirname,
      )}`,
    );

    const localAdPath = path.resolve(
      pathsConfig.LEGACY_ADS_OUTPUT_PATH,
      dirname,
    );
    const ad = fs.readJsonSync(path.join(localAdPath, 'data.json'), 'utf8');
    const { email, phone } = ad;
    const countryCode = R.path(['location', 'address', 'country'], ad);
    const finalPhone = getValidPhoneNumber(phone, countryCode);
    const externalUserSnap = await server.externalUsers.findOrCreate(firebase, {
      email,
      phone: finalPhone,
    });
    const externalUser = externalUserSnap.key;

    const adProps = R.compose(
      R.omit(['images', 'email', 'phone']),
      R.evolve({
        body: str => str.substring(0, env.algoliaMaxBodyLength),
        price: R.defaultTo(0),
      }),
    )(ad);
    const rootProps = {
      seller: externalUser,
      sellerType: sellerTypes.EXTERNAL_USER,
    };
    const imagesWithBuffer = R.compose(
      R.map(image =>
        R.assoc(
          'buffer',
          fs.readFileSync(path.join(localAdPath, image.filename)),
          image,
        ),
      ),
      R.defaultTo([]),
    )(ad.images);
    await uploadImages(imagesWithBuffer, externalUser);

    const draftSnap = await client.drafts.get(firebase, devopsUid);
    const images = R.prop('images', draftSnap.val());
    const finalAdProps = R.assoc('images', images, adProps);

    await client.ads.create(firebase, finalAdProps, rootProps);
    await client.drafts.remove(firebase, devopsUid);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const dirs = p =>
  fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());

const importAds = async howManyToImport => {
  const localAdIds = dirs(pathsConfig.LEGACY_ADS_OUTPUT_PATH);
  const finalLocalAdIds = R.isNil(howManyToImport)
    ? localAdIds
    : R.compose(
        R.take(howManyToImport),
        shuffle,
      )(localAdIds);

  await promiseSerial(R.map(adId => () => createAd(adId), finalLocalAdIds));

  return R.length(finalLocalAdIds);
};

export default importAds;
