import * as R from 'ramda';

const navigatorKeys = [
  'languages',
  'language',
  'browserLanguage',
  'userLanguage',
  'systemLanguage',
];

const getLocales = () =>
  R.compose(
    R.uniq,
    R.reject(R.isNil),
    R.flatten,
    R.values,
    R.pick(navigatorKeys),
  )(window.navigator);

export default getLocales;
