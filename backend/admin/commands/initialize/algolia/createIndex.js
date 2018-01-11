import * as R from 'ramda';
import algolia from 'algoliaClient';
import algoliaConfig from '../../../../../src/config/algolia';

export default async () => {
  const { indexes } = algoliaConfig;

  await Promise.all(
    R.map(index => {
      const { name, options = {}, replicas = [] } = index;
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
        R.omit(['name', 'options']),
      )(index);
      const rootPromise = rootIndex.setSettings(rootIndexSettings, options);
      const replicaPromises = R.addIndex(R.map)(
        (replicaIndex, i) =>
          replicaIndex.setSettings(R.omit(['name'], replicas[i])),
        replicaIndexes,
      );

      return Promise.all([...replicaPromises, rootPromise]);
    }, indexes),
  );

  return R.map(({ name, replicas }) => {
    const replicasList = R.compose(R.join(', '), R.pluck('name'))(replicas);
    return `Created "${name}" index with replicas [${replicasList}]`;
  }, indexes);
};
