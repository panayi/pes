import * as R from 'ramda';

const I18N_PATH = ['i18n'];

export const languageSelector = R.path([...I18N_PATH, 'language']);
