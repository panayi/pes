import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import * as modelPaths from '../config/modelPaths';
import * as adStatuses from '../config/adStatuses';
import getTimestamp from '../utils/getTimestamp';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const get = async (firebase, id) =>
  firebase
    .ref(modelPaths.ADS.string)
    .child(id)
    .once('value');

export const getSeller = async (firebase, id) => {
  const adSnapshot = await get(firebase, id);
  return adSnapshot.exists() ? adSnapshot.val().seller : null;
};

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const create = async (firebase, adProps, rootProps) => {
  const newAdRef = firebase.ref(modelPaths.ADS.string).push();
  const newAdKey = newAdRef.key;
  const finalRootProps = R.merge(rootProps, {
    createdAt: getTimestamp(firebase),
  });
  const finalAdProps = R.pick(
    ['title', 'body', 'price', 'category', 'location', 'images', 'sold'],
    adProps,
  );
  const ad = R.merge(finalRootProps, { props: finalAdProps });
  const updates = {
    [`${modelPaths.ADS.string}/${newAdKey}`]: ad,
    [`${modelPaths.SELLER_ADS(rootProps.seller).string}/${newAdKey}`]: ad,
  };
  await firebase.update('/', updates);
  return get(firebase, newAdKey);
};

export const update = async (firebase, id, adProps) => {
  const seller = await getSeller(firebase, id);
  const updates = {
    [`${modelPaths.ADS.string}/${id}/props`]: adProps,
    [`${modelPaths.SELLER_ADS(seller).string}/${id}/props`]: adProps,
  };
  return firebase.update('/', updates);
};

export const updateProp = async (firebase, id, key, value) => {
  const seller = await getSeller(firebase, id);
  const updates = {
    [`${modelPaths.ADS.string}/${id}/props/${key}`]: value,
    [`${modelPaths.SELLER_ADS(seller).string}/${id}/props/${key}`]: value,
  };
  return firebase.update('/', updates);
};

export const move = status => async (firebase, id, ad) => {
  let finalAd = ad;
  if (isNilOrEmpty(finalAd)) {
    const adSnap = await get(firebase, id);
    finalAd = adSnap.val();
  }
  const { seller } = finalAd;
  const updates = {
    [`${modelPaths.ADS.string}/${id}`]: null,
    [`${modelPaths.SELLER_ADS(seller).string}/${id}`]: null,
    [`${modelPaths.SELLER_ADS(seller, status).string}/${id}`]: finalAd,
  };
  return firebase.update('/', updates);
};

export const remove = move(adStatuses.DELETED);

export const reject = move(adStatuses.REJECTED);

export const revert = (firebase, id, beforeAd) => {
  const { seller } = beforeAd;
  const updates = {
    [`${modelPaths.ADS.string}/${id}`]: beforeAd,
    [`${modelPaths.SELLER_ADS(seller).string}/${id}`]: beforeAd,
  };

  return firebase.update('/', updates);
};

export const removeExternalUserAd = (firebase, adId, code) =>
  firebase.functions().httpsCallable('removeExternalUserAd')({ adId, code });
