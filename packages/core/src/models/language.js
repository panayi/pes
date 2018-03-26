import * as R from 'ramda';
import supportedLanguages from '../config/languages';

export const getAll = R.compose(R.pluck('id'), R.always(supportedLanguages));

export const getDefault = () => {
  const defaultLanguage = R.find(R.prop('default'), supportedLanguages);
  return R.prop('id', defaultLanguage);
};
