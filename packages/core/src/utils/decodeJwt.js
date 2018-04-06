import * as R from 'ramda';
import { isArray } from 'ramda-adjunct';

const decodeJwt = token => {
  try {
    if (!token) {
      throw new Error('Invalid JWT');
    }
    const segments = token.split('.');
    if (!isArray(segments) || R.length(segments) !== 3) {
      throw new Error('Invalid JWT');
    }

    const base64 = segments[1].replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
};

export default decodeJwt;
