import url from 'url';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import fetch from 'node-fetch';
import env from '@pesposa/core/src/config/env';
import log from '@pesposa/core/src/utils/log';
import * as fetchService from '../services/fetch';
import * as storageService from '../services/storage';

const findProviderWithProp = propKey =>
  R.compose(
    R.find(R.prop(propKey)),
    R.propOr([], 'providerData'),
  );

const getFacebookImageUrl = uid =>
  `https://graph.facebook.com/${uid}/picture?height=1000`;

const removeQueryString = str => {
  const obj = url.parse(str);
  obj.search = '';
  obj.query = '';
  return url.format(obj);
};

const getGoogleImageUrl = async uid => {
  try {
    const result = await fetch(
      `https://www.googleapis.com/plus/v1/people/${uid}?fields=image&key=${
        env.googleApisKey
      }`,
    );
    const json = await result.json();
    const imageUrl = R.path(['image', 'url'], json);
    return imageUrl ? removeQueryString(imageUrl) : null;
  } catch (error) {
    log.error(error);
    return null;
  }
};

export const download = async (firebase, userSnapshot, userId) => {
  try {
    const avatar = userSnapshot.child('avatar');

    if (avatar.exists()) {
      return null;
    }

    const user = userSnapshot.val();
    const provider = findProviderWithProp('photoURL')(user);
    const providerId = R.prop('providerId', provider);

    if (isNilOrEmpty(providerId)) {
      return null;
    }

    let imageUrl;
    let filename;
    if (providerId === 'facebook.com') {
      imageUrl = getFacebookImageUrl(provider.uid);
      filename = 'facebook';
    } else if (providerId === 'google.com') {
      imageUrl = await getGoogleImageUrl(provider.uid);
      filename = 'google';
    }

    if (isNilOrEmpty(imageUrl)) {
      return null;
    }

    const path = `profileImages/${userId}`;
    const { buffer, contentType } = await fetchService.getImage(imageUrl);

    return storageService.uploadFile(
      buffer,
      contentType,
      path,
      filename,
      metadata => {
        const finalMetadata = R.assoc('originalUrl', imageUrl, metadata);
        return userSnapshot.ref.child('avatar').set(finalMetadata);
      },
    );
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return null;
  }
};
