import * as R from 'ramda';
import { algolia as algoliaConfig } from 'pesposa-config';
import algolia from 'lib/algoliaClient';
import log from 'utils/log';

const createIndex = async () => {
  const { INDEXES } = algoliaConfig;

  try {
    await Promise.all(
      R.map(index => {
        const { name, replicas = [] } = index;
        const replicaNames = R.pluck('name', replicas);

        // Create root and replica indexes
        const rootIndex = algolia.initIndex(name);
        const replicaIndexes = R.map(
          replica => algolia.initIndex(replica.name),
          replicas,
        );

        // Set root index settings
        const rootIndexSettings = R.prop('settings', index);
        const rootPromise = rootIndex.setSettings(
          R.assoc('replicas', replicaNames, rootIndexSettings),
        );

        // Set replica indexes settings
        const replicaPromises = R.addIndex(R.map)((replicaIndex, i) => {
          const replicaIndexSettings = R.compose(
            R.merge(rootIndexSettings),
            R.prop('settings'),
            R.nth(i),
          )(replicas);

          return replicaIndex.setSettings(replicaIndexSettings);
        }, replicaIndexes);

        return Promise.all([...replicaPromises, rootPromise]);
      }, INDEXES),
    );

    return R.map(({ name, replicas }) => {
      const replicasList = R.compose(R.join(', '), R.pluck('name'))(replicas);
      return `Created "${name}" index with replicas [${replicasList}]`;
    }, INDEXES);
  } catch (error) {
    log.error('Algolia: Create indexes failed');
    throw error;
  }
};

export default createIndex;
