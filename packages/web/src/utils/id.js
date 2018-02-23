import * as R from 'ramda';
import { isNotNil } from 'ramda-adjunct';
import { algolia as algoliaConfig } from 'pesposa-config';

// id :: Object | String -> String | Nil
export default R.when(
  R.is(Object),
  R.compose(R.find(isNotNil), R.values, R.pick(['id', algoliaConfig.ID])),
);
