import * as R from 'ramda';
import { withProps } from 'recompose';
import { connectData } from 'lib/connectData';
import omitProps from 'utils/omitProps';
import { models } from 'store/firebase/data';
import { selectors as userInfoSelectors } from 'store/userInfo';

const translate = namespace =>
  R.compose(
    connectData({
      translations: models.translations(
        userInfoSelectors.languageSelector,
        R.always(namespace),
      ).allObjects,
    }),
    withProps(({ translations }) => ({
      t: key => R.prop(key, translations),
    })),
    omitProps(['translations']),
  );

export default translate;
