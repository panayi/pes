import * as R from 'ramda';
import propSelector from 'utils/propSelector';
import randomInt from 'utils/randomInt';

// getAdImages :: Ad -> [String] | [Object] | Nil
const getAdImages = R.compose(
  R.defaultTo([]),
  R.when(R.is(Object), R.compose(R.pluck('downloadURL'), R.values)),
  propSelector('images'),
  R.defaultTo({}),
);

// getRandomDimensions :: Nil -> Object
const getRandomDimensions = () => ({
  width: randomInt(2, 7) * 100,
  height: randomInt(2, 7) * 100,
});

export { getAdImages, getRandomDimensions };
