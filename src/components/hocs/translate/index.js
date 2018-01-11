import * as R from 'ramda';
import { withProps } from 'recompose';
import { connectData } from 'lib/connectData';
import { models } from 'store/data';

export default namespace =>
  R.compose(
    withProps({
      _translationsNamespace: namespace,
    }),
    connectData({
      __translations__: models.locales.allObjects,
    }),
    withProps(({ __translations__ }) => ({
      t: key => __translations__[key],
    })),
  );
