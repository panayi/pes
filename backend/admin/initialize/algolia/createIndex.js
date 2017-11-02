import algolia from 'algoliaClient';

export default async () => {
  const postsIndexName = process.env.REACT_APP_ALGOLIA_POSTS_INDEX_NAME;
  const index = algolia.initIndex(postsIndexName);

  await index.setSettings({
    searchableAttributes: [
      'title',
      'body',
    ],
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

  return [`Created ${postsIndexName} index`];
};
