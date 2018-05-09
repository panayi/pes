import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import env from '@pesposa/core/src/config/env';
import getSubdomain from '@pesposa/core/src/utils/getSubdomain';
import getLegacyAdId from '@pesposa/core/src/utils/getLegacyAdId';
import mapLegacyToNewCategory from '@pesposa/core/src/utils/mapLegacyToNewCategory';

const parentCategories = [
  'real-estate',
  'vehicles',
  'jobs',
  'pets',
  'for-sale',
  'classes',
  'community',
  'personals',
];
const childCategories = [
  'homes',
  'apartments',
  'land-plots',
  'offices-commercial-space',
  'looking-for-roommates',
  'education-teaching-jobs',
  'sales-jobs',
  'hotel-tourist-jobs',
  'customer-service-jobs',
  'marketing-administration-jobs',
  'advertising-public-relation-jobs',
  'accounting-finance-jobs',
  'restaurant-food-service-jobs',
  'construction-development-jobs',
  'internet-based-jobs',
  'engineering-architecture-jobs',
  'hairdresser-beauty-jobs',
  'manual-labor-jobs',
  'secretarial-jobs',
  'transportation-delivery-jobs',
  'other-jobs',
  'dogs',
  'cats',
  'fish',
  'birds',
  'horses',
  'reptiles',
  'other-pets',
  'cars',
  'parts-and-accessories',
  'motorcycles',
  'boats',
  'trucks-commercial',
  'caravans',
  'other-vehicles',
  'language-classes',
  'computers-multimedia-classes',
  'music-classes',
  'dance-classes',
  'other-classes',
  'seminars-conferences',
  'community-activities',
  'events',
  'volunteers',
  'lost-and-found',
  'home-appliances',
  'electronics',
  'home-and-garden',
  'hunting-stuff',
  'fishing-diving-stuff',
  'computing',
  'cell-phones',
  'cameras-and-accessories',
  'books',
  'musical-instruments',
  'jewelry-watches',
  'health-and-beauty',
  'clothing',
  'food',
  'toys-and-hobbies',
  'video-games',
  'sporting-goods',
  'antiques-collectibles',
  'everything-else',
  'men-looking-for-women',
  'women-looking-for-men',
  'men-looking-for-men',
  'women-looking-for-women',
  'astrology-medium',
  'massage',
];

const formatCategory = str => R.replace(/-/g, '_', str);

const redirectLegacyUrl = (req, res, next) => {
  const subdomain = getSubdomain(req);
  const segments = R.compose(
    R.reject(isNilOrEmpty),
    R.split('/'),
    R.when(R.compose(R.equals('/'), R.head), R.tail),
  )(req.path);

  const firstSegment = R.head(segments);
  const lastSegment = R.last(segments);

  const viewAdPage = R.test(/id--\d+/, lastSegment);
  if (viewAdPage) {
    const categoryParent = formatCategory(subdomain);
    const id = R.replace('id--', '', lastSegment);
    const legacyAdId = getLegacyAdId({ categoryParent, id });
    const newUrl = `${req.protocol}://cy.${env.domain}/il/${legacyAdId}`;
    res.redirect(newUrl);
    return;
  }

  const isVeryOldUrl = firstSegment === 'view';
  if (isVeryOldUrl) {
    const newUrl = `${req.protocol}://cy.${env.domain}`;
    res.redirect(newUrl);
    return;
  }

  const rootPage = R.contains(subdomain, ['www', 'pesposa']);
  if (rootPage) {
    next();
    return;
  }

  const countryCode = R.contains(subdomain, ['cy', 'gr', 'pk'])
    ? subdomain
    : null;

  if (countryCode) {
    // Means we are on new site
    next();
    return;
  }

  const categoryParent = R.contains(subdomain, parentCategories)
    ? subdomain
    : null;

  if (categoryParent) {
    const finalCategoryParent = R.unless(
      R.isNil,
      formatCategory,
      categoryParent,
    );
    const categoryChild = R.compose(
      R.unless(R.isNil, formatCategory),
      R.find(R.contains(R.__, childCategories)),
    )(segments);
    const newCategory = mapLegacyToNewCategory(
      finalCategoryParent,
      categoryChild,
    );
    const newUrl = `${req.protocol}://cy.${env.domain}/${newCategory}`;
    res.redirect(newUrl);
    return;
  }

  next();
};

export default redirectLegacyUrl;
