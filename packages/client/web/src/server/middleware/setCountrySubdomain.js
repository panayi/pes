import * as R from 'ramda';
import env from '@pesposa/core/src/config/env';
import * as locationConfig from '@pesposa/core/src/config/location';
import * as siteConfig from '@pesposa/core/src/config/site';
import { actions as siteActions } from '@pesposa/client-core/src/store/site';
import { selectors as userInfoSelectors } from '@pesposa/client-core/src/store/userInfo';

const setCountrySubdomain = (req, res, next) => {
  const { store } = res.locals;
  const country = R.prop('country', siteConfig.get(req));

  if (country) {
    store.dispatch(siteActions.setCountry(country));
    next();
  } else {
    const state = store.getState();
    const userCountryCode = userInfoSelectors.countryCodeSelector(state);
    const defaultCountryCode = locationConfig.DEFAULT_COUNTRY_CODE;
    const siteForCountryCodeExists = R.contains(
      userCountryCode,
      env.countrySites,
    );
    const finalCountryCode = siteForCountryCodeExists
      ? userCountryCode || defaultCountryCode
      : defaultCountryCode;
    const newCountryCode = R.toLower(finalCountryCode);

    const newUrl = `${req.protocol}://${newCountryCode}.${env.domain}${
      req.originalUrl
    }`;
    res.redirect(newUrl);
  }
};

export default setCountrySubdomain;
