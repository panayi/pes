import * as R from 'ramda';
import { ADS_INDEXES } from '@pesposa/core/src/config/algolia';

const PAGINATION_LIMIT = 5000;

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

export const INDEXES = [
  {
    name: ADS_INDEXES.default,
    replicas: [
      {
        name: ADS_INDEXES.byDateDesc,
        settings: {
          ranking: R.prepend('desc(createdAt)', SECONDARY_RANKING_ATTRIBUTES),
          paginationLimitedTo: PAGINATION_LIMIT,
        },
      },
      {
        name: ADS_INDEXES.byPriceAsc,
        settings: {
          ranking: R.prepend('asc(price)', SECONDARY_RANKING_ATTRIBUTES),
          paginationLimitedTo: PAGINATION_LIMIT,
        },
      },
      {
        name: ADS_INDEXES.byPriceDesc,
        settings: {
          ranking: R.prepend('desc(price)', SECONDARY_RANKING_ATTRIBUTES),
          paginationLimitedTo: PAGINATION_LIMIT,
        },
      },
      {
        name: ADS_INDEXES.byDistance,
        settings: {
          ranking: R.prepend(
            'geo',
            R.without(['geo'], SECONDARY_RANKING_ATTRIBUTES),
          ),
          paginationLimitedTo: PAGINATION_LIMIT,
        },
      },
    ],
    settings: {
      searchableAttributes: ['title', 'body', 'convertedText'],
      attributesForFaceting: [
        'category',
        'seller',
        'sold',
        'location.address.country',
      ],
      paginationLimitedTo: PAGINATION_LIMIT,
    },
  },
];
