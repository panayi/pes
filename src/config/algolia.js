const secondaryRankingAttributes = [
  'typo',
  'geo',
  'words',
  'filters',
  'proximity',
  'attribute',
  'exact',
  'custom',
];

export const ADS_INDEXES = {
  default: 'ads',
  byDateDesc: 'ads_date_desc',
  byPriceAsc: 'ads_price_asc',
  byPriceDesc: 'ads_price_desc',
};

export default {
  indexes: [
    {
      name: ADS_INDEXES.default,
      options: { forwardToReplicas: true },
      searchableAttributes: ['title', 'body'],
      attributesForFaceting: ['category'],
      replicas: [
        {
          name: ADS_INDEXES.byDateDesc,

          ranking: ['desc(createdAt)', ...secondaryRankingAttributes],
        },
        {
          name: ADS_INDEXES.byPriceAsc,
          ranking: ['asc(price)', ...secondaryRankingAttributes],
        },
        {
          name: ADS_INDEXES.byPriceDesc,
          ranking: ['desc(price)', ...secondaryRankingAttributes],
        },
      ],
    },
  ],
};
