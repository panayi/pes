import R from 'ramda';
import palx from 'palx';

export default R.compose(
  R.reduce(
    (acc, [key, value]) => {
      const colors = {};

      if (R.is(Array, value)) {
        // take the color with the
        // median luminance
        colors[key] = value[5];

        R.addIndex(R.forEach)(
          (v, index) => { colors[key + index] = v; },
          value,
        );
      } else {
        colors[key] = value;
      }

      return R.merge(acc, colors);
    },
    {},
  ),
  R.toPairs,
  palx,
);
