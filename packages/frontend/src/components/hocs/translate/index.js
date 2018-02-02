import * as R from 'ramda';
import { withProps } from 'recompose';
import { connectData } from 'lib/connectData';
import omitProps from 'utils/omitProps';
import { models } from 'store/firebase/data';
import { selectors as profileSelectors } from 'store/firebase/profile';

export default namespace =>
  R.compose(
    connectData({
      localeTranslations: models.translations(
        R.compose(R.prop('id'), profileSelectors.profileLocaleSelector),
        R.always(namespace),
      ).allObjects,
      languageTranslations: models.translations(
        R.compose(R.prop('language'), profileSelectors.profileLocaleSelector),
        R.always(namespace),
      ).allObjects,
    }),
    withProps(({ localeTranslations, languageTranslations }) => ({
      t: key =>
        R.prop(key, localeTranslations) || R.prop(key, languageTranslations),
    })),
    omitProps(['localeTranslations', 'languageTranslations']),
  );
