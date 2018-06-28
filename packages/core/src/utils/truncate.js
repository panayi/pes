import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

const ellipsis = '...';
const ellipsisLength = R.length(ellipsis);

const truncate = (maxLength, str) => {
  if (isNilOrEmpty(str) || R.length(str) < maxLength) {
    return str;
  }

  return R.slice(0, maxLength - ellipsisLength, str) + ellipsis;
};

export default truncate;
