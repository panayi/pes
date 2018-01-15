import * as R from 'ramda';
import { ADS_INDEXES } from 'frontend/config/algolia';
import algolia from 'lib/algoliaClient';
import serializeAd from 'utils/serializeAdToAlgolia';

const adsIndexName = ADS_INDEXES.default;

// Add or update ad
export const add = (ad, adId) => {
  const index = algolia.initIndex(adsIndexName);

  const finalAd = R.assoc('objectID', adId, ad);

  return new Promise((resolve, reject) => {
    index.saveObject(serializeAd(finalAd), err => {
      if (err) {
        reject(err);
      }

      resolve();
      console.log(
        `Firebase object with id=${
          finalAd.objectID
        } created or updated in Algolia`,
      );
    });
  });
};

export const update = (props, adId) => {
  const index = algolia.initIndex(adsIndexName);
  const finalProps = R.assoc('objectID', adId, props);

  return new Promise((resolve, reject) => {
    // Ensure the object exists
    index.getObject(adId, fetchError => {
      if (fetchError) {
        reject(
          `Failed to update a non-existent object (id=${adId}) on Algolia`,
        );
        return;
      }

      index.partialUpdateObject(serializeAd(finalProps), err => {
        if (err) {
          reject(err);
        }

        resolve();
        console.log(
          `Firebase object with id=${finalProps.objectID} updated in Algolia`,
        );
      });
    });
  });
};

export const remove = adId => {
  const index = algolia.initIndex(adsIndexName);

  return new Promise((resolve, reject) => {
    index.deleteObject(adId, err => {
      if (err) {
        reject(err);
      }

      resolve();
      console.log(`Firebase object with id=${adId} deleted in Algolia`);
    });
  });
};
