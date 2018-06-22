import * as R from 'ramda';

const hashCode = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    /* eslint-disable-next-line no-bitwise */
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = i => {
  /* eslint-disable-next-line no-bitwise */
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
};

const stringToHexColor = R.unless(R.isNil, R.compose(intToRGB, hashCode));

export default stringToHexColor;