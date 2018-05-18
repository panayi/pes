import * as R from 'ramda';
import env from '@pesposa/core/src/config/env';
import * as locationConfig from '@pesposa/core/src/config/location';
import * as siteModel from '@pesposa/core/src/models/site';

const robotsTxt = async (req, res) => {
  const defaultCountryCode = locationConfig.DEFAULT_COUNTRY_CODE;
  const countryCode = R.compose(
    R.toLower,
    R.propOr(defaultCountryCode, 'countryCode'),
  )(siteModel.get(req));

  const baseUrl = `${req.protocol}://${countryCode}.${env.domain}`;

  res.type('text/plain');
  res.send(`Sitemap: ${baseUrl}/sitemap.xml\nUser-agent: *`);
};

export default robotsTxt;
