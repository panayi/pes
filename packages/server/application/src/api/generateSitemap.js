import * as R from 'ramda';
import sm from 'sitemap';
import log from '@pesposa/core/src/utils/log';
import * as respond from '@pesposa/core/src/utils/respond';
import env from '@pesposa/core/src/config/env';
import * as locationConfig from '@pesposa/core/src/config/location';
import * as siteConfig from '@pesposa/core/src/config/site';
import client from '@pesposa/core/src/client';
import server from '@pesposa/server-core/src/server';
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
    const ad = adSnap.val();

    if (ad && ad.category !== 'personals') {
      adsUrls.push(
        generateUrl(`${prefix}/${adSnap.key}`, req, countryCode, options),
      );
    }
  });

  return adsUrls;
};

const generateSitemap = async (req, res) => {
  try {
    const categoriesSnap = await client.categories.getAll(firebase);
    const adsSnap = await server.ads.getAll(firebase);
    const usersSnap = await server.users.getAll(firebase);
    const externalUsersSnap = await server.externalUsers.getAll(firebase);

    const categoriesUrls = R.compose(
      R.prepend(
        generateUrl('', req, null, { changefreq: 'daily', priority: 1 }),
      ),
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

      // ignore anonymous users
      if (user.providerData) {
        usersUrls.push(
          generateUrl(`user/${userSnap.key}`, req, null, { naked: false }),
        );
      }
    });

    const externalUsersUrls = [];
    externalUsersSnap.forEach(externalUserSnap => {
      const externalUser = externalUserSnap.val();

      if (!externalUser.user) {
        externalUsersUrls.push(
          generateUrl(`user/e/${externalUserSnap.key}`, req, null, {
            naked: false,
          }),
        );
      }
    });

    const staticUrls = [
      generateUrl('privacy', req, null, {
        changefreq: 'yearly',
        priority: 0.4,
        naked: false,
      }),
    ];

    const urls = R.flatten([
      categoriesUrls,
      adsUrls,
      usersUrls,
      externalUsersUrls,
      staticUrls,
    ]);

    const sitemap = sm.createSitemap({
      hostname: `https://${env.domain}`,
      cacheTime: 600000, // 600 sec - cache purge period
      urls,
    });

    sitemap.toXML((error, xml) => {
      if (error) {
        throw error;
      }
      res.header('Content-Type', 'application/xml');
      res.send(xml);
      return null;
    });
  } catch (error) {
    log.error('/api/sitemap.xml failed');
    log.error(error);
    respond.internalServerError(res, error);
  }
};

export default generateSitemap;
