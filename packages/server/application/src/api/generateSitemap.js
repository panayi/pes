import * as R from 'ramda';
import sm from 'sitemap';
import log from '@pesposa/core/src/utils/log';
import env from '@pesposa/core/src/config/env';
import * as locationConfig from '@pesposa/core/src/config/location';
import * as siteConfig from '@pesposa/core/src/config/site';
import client from '@pesposa/core/src/client';
import firebase from '@pesposa/server-core/src/config/firebaseClient';

const defaultCountryCode = R.toLower(locationConfig.DEFAULT_COUNTRY_CODE);

const generateUrl = (path, req, countryCode, options) => {
  const site = siteConfig.get(req);
  const changefreq = R.propOr('weekly', 'changefreq', options);
  const priority = R.propOr(0.5, 'priority', options);
  const naked = R.prop('naked', options);
  const finalCountryCode = R.toLower(
    countryCode || (site && site.countryCode) || defaultCountryCode,
  );
  let url;

  if (naked && path) {
    url = `https://${env.domain}/${path}`;
  } else if (naked) {
    url = `https://${env.domain}`;
  } else if (path) {
    url = `https://${finalCountryCode}.${env.domain}/${path}`;
  } else {
    url = `https://${finalCountryCode}.${env.domain}`;
  }

  return {
    url,
    changefreq,
    priority,
  };
};

const getAdCountryCode = R.pathOr('', ['location', 'address', 'country']);

const getAdsUrls = (adsSnap, prefix, req, options) => {
  const adsUrls = [];
  adsSnap.forEach(adSnap => {
    const countryCode = getAdCountryCode(adSnap.val());
    adsUrls.push(
      generateUrl(`${prefix}/${adSnap.key}`, req, countryCode, options),
    );
  });

  return adsUrls;
};

const generateSitemap = async (req, res) => {
  const categoriesSnap = await client.categories.getAll(firebase);
  const adsSnap = await client.ads.getAll(firebase);
  const usersSnap = await client.users.getAll(firebase);

  const categoriesUrls = R.compose(
    R.prepend(generateUrl('', req, null, { changefreq: 'daily', priority: 1 })),
    R.map(category =>
      generateUrl(`c/${category.id}`, req, null, {
        changefreq: 'daily',
        priority: 0.8,
      }),
    ),
    R.values,
  )(categoriesSnap.val() || {});

  const adsUrls = getAdsUrls(adsSnap, 'i', req);

  const usersUrls = [];
  usersSnap.forEach(userSnap => {
    const user = userSnap.val();

    if (user.providerData) {
      // ignore anonymous users
      usersUrls.push(
        generateUrl(`user/${userSnap.key}`, req, null, { naked: true }),
      );
    }
  });

  const staticUrls = [
    generateUrl('privacy', req, null, {
      changefreq: 'yearly',
      priority: 0.4,
      naked: true,
    }),
  ];

  const urls = R.flatten([categoriesUrls, adsUrls, usersUrls, staticUrls]);

  const sitemap = sm.createSitemap({
    hostname: `https://${env.domain}`,
    cacheTime: 600000, // 600 sec - cache purge period
    urls,
  });

  sitemap.toXML((err, xml) => {
    if (err) {
      log.error(err);
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send(xml);
    return null;
  });
};

export default generateSitemap;