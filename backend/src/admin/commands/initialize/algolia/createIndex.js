import * as R from 'ramda';
import algoliaConfig from 'frontend/config/algolia';
import algolia from 'lib/algoliaClient';
import log from 'utils/log';

export default async () => {
  const { indexes } = algoliaConfig;

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
      }, indexes),
    );

    return R.map(({ name, replicas }) => {
      const replicasList = R.compose(R.join(', '), R.pluck('name'))(replicas);
      return `Created "${name}" index with replicas [${replicasList}]`;
    }, indexes);
  } catch (error) {
    log.error('Algolia: Create indexes failed');
    throw error;
  }
};
