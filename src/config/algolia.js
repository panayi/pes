import * as R from 'ramda';

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
  byDistance: 'ads_distance_asc',
};

export default {
  indexes: [
    {
      name: ADS_INDEXES.default,
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
        {
          name: ADS_INDEXES.byDistance,
          ranking: ['geo', ...R.without(['geo'], secondaryRankingAttributes)],
        },
      ],
    },
  ],
};
