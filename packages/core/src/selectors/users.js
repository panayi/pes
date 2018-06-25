import * as R from 'ramda';
import { createSelector } from 'reselect';
import propSelector from '../utils/propSelector';

const censorWord = (str, asterisksCount) => {
  const finalAsterisksCount = asterisksCount || str.length - 2;
  return str[0] + '*'.repeat(finalAsterisksCount) + str.slice(-1);
};

const censorEmail = email => {
  const arr = email.split('@');
  return `${censorWord(arr[0])}@${censorWord(arr[1])}`;
};

const censorPhone = R.compose(
  R.converge(
    R.compose(
      R.join(''),
      R.flatten,
      R.unapply(R.identity),
    ),
    [
      R.compose(
        R.nth(0),
        R.splitAt(4),
      ),
      R.compose(
        R.times(R.always('*')),
        R.subtract(R.__, 7),
        R.length,
      ),
      R.compose(
        R.nth(1),
        R.splitAt(-3),
      ),
    ],
  ),
  R.split(''),
);

export const nameSelector = createSelector(
  propSelector('name'),
  propSelector('phone'),
  propSelector('email'),
  propSelector('id'),
  (name, phone, email, id) => {
    if (name) {
      return name;
    }

    if (phone) {
      return censorPhone(phone);
    }

    if (email) {
      return censorEmail(email);
    }

    return censorEmail(id);
  },
);
