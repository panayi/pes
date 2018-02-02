import * as R from 'ramda';
import { algolia as algoliaConstants } from 'pesposa-core/constants';
import { algolia as algoliaConfig } from 'pesposa-config';
import algolia from 'lib/algoliaClient';
import log from 'utils/log';
import serializeAd from 'utils/serializeAdToAlgolia';

const adsIndexName = algoliaConfig.ADS_INDEXES.default;

// Add or update ad
export const add = (ad, adId) => {
  const index = algolia.initIndex(adsIndexName);

  const finalAd = R.assoc(algoliaConstants.ID, adId, ad);

  return new Promise((resolve, reject) => {
    const serialized = serializeAd(finalAd);
    index.saveObject(serialized, err => {
      if (err) {
        reject(err);
      }

      resolve();
      log.info(
        `Firebase object with id=${
          finalAd[algoliaConstants.ID]
        } created or updated in Algolia`,
        serialized,
      );
    });
  });
};

export const update = (props, adId) => {
  const index = algolia.initIndex(adsIndexName);
  const finalProps = R.assoc(algoliaConstants.ID, adId, props);

  return new Promise((resolve, reject) => {
    // Ensure the object exists
    index.getObject(adId, fetchError => {
      if (fetchError) {
        reject(
          `Failed to update a non-existent object (id=${adId}) on Algolia`,
        );
        return;
      }

      const serialized = serializeAd(finalProps);
      index.partialUpdateObject(serializeAd(serialized), err => {
        if (err) {
          reject(err);
        }

        resolve();
        log.info(
          `Firebase object with id=${
            finalProps[algoliaConstants.ID]
          } updated in Algolia`,
          serialized,
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
      log.info(`Firebase object with id=${adId} deleted in Algolia`);
    });
  });
};
