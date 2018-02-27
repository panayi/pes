import * as R from 'ramda';
import urlForPath from 'utils/urlForPath';

const getMetaTags = ({
  path,
  title,
  description,
  image,
  facebook,
  twitter,
}) => {
  const linkCanonical = path
    ? [{ rel: 'canonical', href: urlForPath(path) }]
    : [];

  const metaTitle = title
    ? [
        { property: 'og:title', content: title },
        { property: 'twitter:title', content: title },
      ]
    : [];

  const metaDescription = description
    ? [
        { name: 'description', content: description },
        { property: 'og:description', content: description },
        { name: 'twitter:description', content: description },
      ]
    : [];

  const metaImage = image
    ? [
        { property: 'og:image', content: image },
        { property: 'twitter:image', content: image },
      ]
    : [];

  const metaFacebookSiteName =
    facebook && facebook.siteName
      ? [{ property: 'og:site_name', content: facebook.siteName }]
      : [];
  const metaFacebookAdmins =
    facebook && facebook.userId
      ? [{ property: 'fb:admins', content: facebook.userId }]
      : [];
  const metaFacebookAppId =
    facebook && facebook.appId
      ? [{ property: 'fb:app_id', content: facebook.appId }]
      : [];

  const metaTwitterCard = [
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
  const metaTwitterCreator =
    twitter && twitter.handle
      ? [{ name: 'twitter:creator', content: twitter.handle }]
      : [];
  const metaTwitterSite =
    twitter && twitter.handle
      ? [{ name: 'twitter:site', content: twitter.handle }]
      : [];

  return R.filter(R.identity, {
    title,
    link: linkCanonical,
    meta: [
      ...metaTitle,
      ...metaDescription,
      ...metaImage,
      ...metaFacebookSiteName,
      ...metaFacebookAdmins,
      ...metaFacebookAppId,
      ...metaTwitterCard,
      ...metaTwitterCreator,
      ...metaTwitterSite,
    ],
  });
};

export default getMetaTags;
