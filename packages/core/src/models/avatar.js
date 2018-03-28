import url from 'url';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import fetch from 'node-fetch';
import env from '../config/env';
import log from '../utils/log';
import * as fetchService from '../services/fetch';
import * as storageService from '../services/storage';

const findProviderWithProp = propKey =>
  R.compose(R.find(R.prop(propKey)), R.propOr([], 'providerData'));

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

export const download = async (userSnapshot, userId) => {
  try {
    const user = userSnapshot.val();
    const provider = findProviderWithProp('photoURL')(user);
    const providerId = R.prop('providerId', provider);

    if (
      isNilOrEmpty(providerId) ||
      !userSnapshot.child('providerData').changed()
    ) {
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

    const fullPath = await storageService.uploadImage(
      buffer,
      contentType,
      path,
      filename,
    );
    return userSnapshot.ref.child('avatarPath').set(fullPath);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return null;
  }
};
