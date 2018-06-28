import * as R from 'ramda';
import env from '@pesposa/core/src/config/env';
import * as locationConfig from '@pesposa/core/src/config/location';
import * as siteConfig from '@pesposa/core/src/config/site';

const robotsTxt = async (req, res) => {
  const defaultCountryCode = locationConfig.DEFAULT_COUNTRY_CODE;
  const countryCode = R.compose(
    R.toLower,
    R.propOr(defaultCountryCode, 'countryCode'),
  )(siteConfig.get(req));

  const baseUrl = `https://${countryCode}.${env.domain}`;

  res.type('text/plain');
  res.send(`Sitemap: ${baseUrl}/sitemap.xml\nUser-agent: *`);
};

export default robotsTxt;
