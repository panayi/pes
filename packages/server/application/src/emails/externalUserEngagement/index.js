import * as R from 'ramda';
import Mustache from 'mustache';
import mjml2html from 'mjml';
import env from '@pesposa/core/src/config/env';
import { buildUrl } from '@pesposa/core/src/services/imgix';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import * as urlPaths from '@pesposa/core/src/selectors/urlPaths';
import * as emailService from '@pesposa/server-core/src/services/email';
import body from './body.mjml';

const text = ({
  subject,
  adTitle,
  adPrice,
  registerUrl,
  viewAdUrl,
  removeAdUrl,
  mainEmail,
}) => `
${subject}
================================================

"${adTitle}" - €${adPrice}

Don't miss the chance to sell your item fast! Sign up to edit your ad and respond to potential buyers:
${registerUrl}

View your ad:
${viewAdUrl}

If for any reason you want to remove your ad from Pesposa, follow this link:
${removeAdUrl}



------------------------------------------------
Pesposa · All rights reserved
${mainEmail}

Unsubscribe: %tag_unsubscribe_url%
`;

const send = async props => {
  const { email, ad, adId, externalUserCode } = props;
  const subject = '🥇 🎉 Your ad is posted on Pesposa!';
  const adTitle = R.path(['props', 'title'], ad);
  const adPrice = R.path(['props', 'price'], ad);
  const firstAdImagePath = R.compose(
    R.prop('fullPath'),
    R.head,
    R.values,
    R.path(['props', 'images']),
  )(ad);
  const logoUrl = buildUrl('uploads/rlogo.png', {
    auto: ['compress', 'format'],
    w: 65,
  });

  const bgImageUrl = buildUrl('uploads/dots-bg.png');
  const upArrowImageUrl = buildUrl('uploads/arrow-up.png');
  const downArrowImageUrl = buildUrl('uploads/arrow-down.png');
  const adImageUrl = buildUrl(firstAdImagePath, {
    auto: ['compress', 'format'],
    w: 250,
  });
  const registerUrl = `https://${env.domain}${urlPaths.sell({
    code: externalUserCode,
    adId,
  })}`;
  const removeAdUrl = `${registerUrl}?remove`;
  const viewAdUrl = `https://${env.domain}/i/${adId}`;

  const emailProps = {
    subject,
    adImageUrl,
    adTitle,
    adPrice,
    registerUrl,
    removeAdUrl,
    viewAdUrl,
    upArrowImageUrl,
    downArrowImageUrl,
    bgImageUrl,
    mainEmail: pesposaConfig.MAIN_EMAIL_ADDRESS,
    supportEmail: pesposaConfig.SUPPORT_EMAIL_ADDRESS,
    facebookPageUrl: pesposaConfig.FACEBOOK_PAGE_URL,
    logoUrl,
  };
  const textBody = text(emailProps);
  const mjml = Mustache.render(body, emailProps);
  const output = mjml2html(mjml);
  const message = {
    to: email,
    subject,
    html: output.html,
    text: textBody,
    headers: {
      'X-Mailgun-Tag': 'externalUserEngagement',
    },
  };

  await emailService.send(message);

  return textBody;
};

export default send;
