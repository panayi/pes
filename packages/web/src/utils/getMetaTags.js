import * as R from 'ramda';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import urlForPath from 'utils/urlForPath';

const getMetaTags = ({
  path,
  title,
  description,
  image,
  facebook,
  twitter,
}) => {
  const href = path && urlForPath(path);

  const finalFacebook = R.merge(
    {
      siteName: pesposaConfig.SITE_NAME,
      appId: pesposaConfig.FACEBOOK_APP_ID,
    },
    facebook,
  );

  const finalTwitter = R.merge(
    {
      site: `@${pesposaConfig.TWITTER_HANDLE}`,
    },
    twitter,
  );

  const linkCanonical = href ? [{ rel: 'canonical', href }] : [];

  const metaUrl = href ? [{ property: 'og:url', content: href }] : [];

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

  const metaFacebookSiteName = finalFacebook.siteName
    ? [{ property: 'og:site_name', content: finalFacebook.siteName }]
    : [];
  const metaFacebookAdmins = finalFacebook.userId
    ? [{ property: 'fb:admins', content: finalFacebook.userId }]
    : [];
  const metaFacebookAppId = finalFacebook.appId
    ? [{ property: 'fb:app_id', content: finalFacebook.appId }]
    : [];

  const metaTwitterCard = [
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
  const metaTwitterSite = finalTwitter.site
    ? [{ name: 'twitter:site', content: finalTwitter.site }]
    : [];

  return R.filter(R.identity, {
    title,
    link: linkCanonical,
    meta: [
      ...metaUrl,
      ...metaTitle,
      ...metaDescription,
      ...metaImage,
      ...metaFacebookSiteName,
      ...metaFacebookAdmins,
      ...metaFacebookAppId,
      ...metaTwitterCard,
      ...metaTwitterSite,
    ],
  });
};

export default getMetaTags;
