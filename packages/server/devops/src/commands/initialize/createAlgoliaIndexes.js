import * as R from 'ramda';
import logger from 'winston-color';
import * as algoliaConfig from '@pesposa/server-core/src/config/algolia';
import * as algoliaService from '@pesposa/server-core/src/services/algolia';

const createAlgoliaIndexes = async () => {
  const { INDEXES } = algoliaConfig;

  try {
    await Promise.all(
      R.map(index => {
        const { name, replicas = [] } = index;
        const replicaNames = R.pluck('name', replicas);

        // Create root and replica indexes
        const rootIndex = algoliaService.initIndex(name);
        const replicaIndexes = R.map(
          replica => algoliaService.initIndex(replica.name),
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

    return R.forEach(({ name, replicas }) => {
      const replicasList = R.compose(
        R.join(', '),
        R.pluck('name'),
      )(replicas);
      logger.info(
        `Algolia: Created "${name}" index with replicas [${replicasList}]`,
      );
    }, INDEXES);
  } catch (error) {
    logger.error('Algolia: Create indexes failed');
    throw error;
  }
};

export default createAlgoliaIndexes;
