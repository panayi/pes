import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import env from '@pesposa/core/src/config/env';
import getCountryByCode from '@pesposa/core/src/utils/getCountryByCode';
import * as locationConfig from '@pesposa/core/src/config/location';
import { actions as siteActions } from 'store/site';
import { selectors as userInfoSelectors } from 'store/userInfo';

const setCountrySubdomain = async (req, res, next) => {
  const { store } = res.locals;
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const countryCode = R.compose(R.head, R.split('.'))(host);
  const country = isNilOrEmpty(countryCode)
    ? null
    : getCountryByCode(countryCode);

  if (country) {
    store.dispatch(siteActions.setCountry(country));
    next();
  } else {
    const state = store.getState();
    const userCountryCode = userInfoSelectors.countryCodeSelector(state);
    const newCountryCode = R.toLower(
      userCountryCode || locationConfig.DEFAULT_COUNTRY_CODE,
    );
    const newUrl = `https://${newCountryCode}.${env.domain}${req.originalUrl}`;
    res.redirect(newUrl);
  }
};

export default setCountrySubdomain;
