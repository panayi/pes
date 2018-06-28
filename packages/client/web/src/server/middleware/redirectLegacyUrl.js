import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import env from '@pesposa/core/src/config/env';
import getSubdomain from '@pesposa/core/src/utils/getSubdomain';
import getLegacyAdId from '@pesposa/core/src/utils/getLegacyAdId';
import mapLegacyToNewCategory, {
  parentCategories,
  childCategories,
} from '@pesposa/core/src/utils/mapLegacyToNewCategory';

const formatCategory = str => R.replace(/-/g, '_', str);

const redirectLegacyUrl = (req, res, next) => {
  const subdomain = getSubdomain(req);
  const segments = R.compose(
    R.reject(isNilOrEmpty),
    R.split('/'),
    R.when(
      R.compose(
        R.equals('/'),
        R.head,
      ),
      R.tail,
    ),
  )(req.path);

  const firstSegment = R.head(segments);
  const lastSegment = R.last(segments);

  const viewAdPage = R.test(/id--\d+/, lastSegment);
  if (viewAdPage) {
    const categoryParent = formatCategory(subdomain);
    const id = R.replace('id--', '', lastSegment);
    const legacyAdId = getLegacyAdId({ categoryParent, id });
    const newUrl = `https://cy.${env.domain}/il/${legacyAdId}`;
    res.redirect(301, newUrl);
    return;
  }

  const isBrowsePage = firstSegment === 'browse';
  const validCategoryChild = R.compose(
    R.contains(R.__, childCategories),
    R.nth(1),
  )(segments);

  if (isBrowsePage && validCategoryChild) {
    const categoryChild = R.nth(1, segments);
    const newCategory = mapLegacyToNewCategory(null, categoryChild);
    const newUrl = `https://cy.${env.domain}/c/${newCategory}`;
    res.redirect(301, newUrl);
    return;
  }

  const isVeryOldUrl = firstSegment === 'view';
  if (isVeryOldUrl) {
    const newUrl = `https://cy.${env.domain}`;
    res.redirect(301, newUrl);
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
    const newUrl = `https://cy.${env.domain}/c/${newCategory}`;
    res.redirect(301, newUrl);
    return;
  }

  next();
};

export default redirectLegacyUrl;
