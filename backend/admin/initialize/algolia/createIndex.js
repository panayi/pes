import algolia from 'algoliaClient';

export default async () => {
  const adsIndexName = process.env.REACT_APP_ALGOLIA_ADS_INDEX_NAME;
  const index = algolia.initIndex(adsIndexName);

  await index.setSettings({
    searchableAttributes: ['title', 'body'],
    attributesForFaceting: ['category'],
    ranking: [
      'desc(createdAt)',
      'typo',
      'geo',
      'words',
      'filters',
      'proximity',
      'attribute',
      'exact',
      'custom',
    ],
  });

  return [`Created ${adsIndexName} index`];
};
