import * as R from 'ramda';

const SECONDARY_RANKING_ATTRIBUTES = [
  'typo',
  'geo',
  'words',
  'filters',
  'proximity',
  'attribute',
  'exact',
  'custom',
];

export const ID = 'objectID';

export const ADS_INDEXES = {
  default: 'ads',
  byDateDesc: 'ads_date_desc',
  byPriceAsc: 'ads_price_asc',
  byPriceDesc: 'ads_price_desc',
  byDistance: 'ads_distance_asc',
};

export const INDEXES = [
  {
    name: ADS_INDEXES.default,
    replicas: [
      {
        name: ADS_INDEXES.byDateDesc,
        settings: {
          ranking: ['desc(createdAt)', ...SECONDARY_RANKING_ATTRIBUTES],
        },
      },
      {
        name: ADS_INDEXES.byPriceAsc,
        settings: {
          ranking: ['asc(price)', ...SECONDARY_RANKING_ATTRIBUTES],
        },
      },
      {
        name: ADS_INDEXES.byPriceDesc,
        settings: {
          ranking: ['desc(price)', ...SECONDARY_RANKING_ATTRIBUTES],
        },
      },
      {
        name: ADS_INDEXES.byDistance,
        settings: {
          ranking: ['geo', ...R.without(['geo'], SECONDARY_RANKING_ATTRIBUTES)],
        },
      },
    ],
    settings: {
      searchableAttributes: ['title', 'body'],
      attributesForFaceting: ['category', 'user'],
    },
  },
];
