import * as R from 'ramda';
import algolia from 'lib/algoliaClient';
import algoliaConfig from 'frontend/config/algolia';

export default async () => {
  const { indexes } = algoliaConfig;

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

      // Set settings
      const rootIndexSettings = R.compose(
        R.assoc('replicas', replicaNames),
        R.omit(['name']),
      )(index);
      const rootPromise = rootIndex.setSettings(rootIndexSettings);
      const replicaPromises = R.addIndex(R.map)((replicaIndex, i) => {
        const replicaIndexSettings = R.useWith(R.merge, [
          R.omit(['replicas']),
          R.omit(['name']),
        ])(rootIndexSettings, replicas[i]);
        return replicaIndex.setSettings(replicaIndexSettings);
      }, replicaIndexes);

      return Promise.all([...replicaPromises, rootPromise]);
    }, indexes),
  );

  return R.map(({ name, replicas }) => {
    const replicasList = R.compose(R.join(', '), R.pluck('name'))(replicas);
    return `Created "${name}" index with replicas [${replicasList}]`;
  }, indexes);
};
