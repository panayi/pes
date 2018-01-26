import * as R from 'ramda';
import { database } from 'lib/firebaseClient';

const mapLocaleToLanguage = R.compose(R.head, R.split('-'));

export const getAll = async () => database.ref(`/locales`).once('value');

export const getDefault = async () =>
  database
    .ref('/locales')
    .orderByChild('default')
    .equalTo(true)
    .once('value');

export const find = async (userLocales = []) => {
  const localeObjects = (await getAll()).val();
  const localeIds = R.compose(R.pluck('id'), R.values)(localeObjects);

  // Try to find an exact locale ID match (e.g. "en-US", "en-GB")
  const matchingLocale = R.find(R.contains(R.__, localeIds), userLocales);
  if (matchingLocale) {
    return matchingLocale;
  }

  // Otherwise match only by language (e.g. match "en-FOO" with "en-US")
  const languages = R.compose(R.pluck('language'), R.values)(localeObjects);
  const userLanguages = R.map(mapLocaleToLanguage, userLocales);
  const matchingIndex = R.findIndex(R.contains(R.__, languages), userLanguages);
  if (matchingIndex > -1) {
    return localeIds[matchingIndex];
  }

  const defaultLocaleSnapshot = await getDefault();
  return defaultLocaleSnapshot.key();
};
