import * as R from 'ramda';
import franc from 'franc-min';
import { toGreek, toGreeklish } from 'greek-utils';
import supportedLanguages from '../config/languages';

const GREEK_LANGUAGE_CODE = 'ell';

export const getAll = R.compose(R.pluck('id'), R.always(supportedLanguages));

export const getDefault = () => {
  const defaultLanguage = R.find(R.prop('default'), supportedLanguages);
  return R.prop('id', defaultLanguage);
};

export const detectLanguage = text => franc(text);

export const convertGreek = text => {
  const isGreek = detectLanguage(text) === GREEK_LANGUAGE_CODE;

  if (isGreek) {
    return toGreeklish(text);
  }

  const maybeGreekText = toGreek(text);
  const isConvertedTextGreek =
    detectLanguage(maybeGreekText) === GREEK_LANGUAGE_CODE;

  if (isConvertedTextGreek) {
    return maybeGreekText;
  }

  return null;
};
