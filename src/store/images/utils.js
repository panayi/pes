import * as R from 'ramda';
import { isPlainObject } from 'ramda-adjunct';
import propSelector from 'utils/propSelector';
import randomInt from 'utils/randomInt';

// getAdImages :: Ad -> [String] | Nil
const getAdImagesPaths = R.compose(
  R.defaultTo([]),
  R.when(isPlainObject, R.compose(R.pluck('fullPath'), R.values)),
  propSelector('images'),
  R.defaultTo({}),
);

// getRandomDimensions :: Nil -> Object
const getRandomDimensions = () => ({
  width: randomInt(2, 7) * 100,
  height: randomInt(2, 7) * 100,
});

export { getAdImagesPaths, getRandomDimensions };
