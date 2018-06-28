import * as R from 'ramda';
import truncate from '@pesposa/core/src/utils/truncate';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import urlForPath from 'utils/urlForPath';

const LOGO = 'logo.png';

const DESCRIPTION_MAX_LENGTH = 299;

const getMetaTags = ({
  path,
  title,
  description,
  image,
  facebook,
  twitter,
}) => {
  const href = path && urlForPath(path);
  const finalImage = image || urlForPath(LOGO);
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

  const finalDescription = truncate(DESCRIPTION_MAX_LENGTH, description);
  const metaDescription = finalDescription
    ? [
        { name: 'description', content: finalDescription },
        { property: 'og:description', content: finalDescription },
        { name: 'twitter:description', content: finalDescription },
      ]
    : [];

  const metaImage = finalImage
    ? [
        { property: 'og:image', content: finalImage },
        { property: 'twitter:image', content: finalImage },
      ]
    : [];

  const metaFacebookType = [{ property: 'og:type', content: 'website' }];
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
      ...metaFacebookType,
      ...metaFacebookSiteName,
      ...metaFacebookAdmins,
      ...metaFacebookAppId,
      ...metaTwitterCard,
      ...metaTwitterSite,
    ],
  });
};

export default getMetaTags;
