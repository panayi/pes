import * as R from 'ramda';
import env from '@pesposa/core/src/config/env';
import * as locationConfig from '@pesposa/core/src/config/location';
import * as siteModel from '@pesposa/core/src/models/site';
import { actions as siteActions } from 'store/site';
import { selectors as userInfoSelectors } from 'store/userInfo';

const setCountrySubdomain = async (req, res, next) => {
  const { store } = res.locals;
  const country = R.prop('country', siteModel.get(req));

  if (country) {
    store.dispatch(siteActions.setCountry(country));
    next();
  } else {
    const state = store.getState();
    const userCountryCode = userInfoSelectors.countryCodeSelector(state);
    const newCountryCode = R.toLower(
      userCountryCode || locationConfig.DEFAULT_COUNTRY_CODE,
    );

    const newUrl = `${req.protocol}://${newCountryCode}.${env.domain}${
      req.originalUrl
    }`;
    res.redirect(newUrl);
  }
};

export default setCountrySubdomain;
