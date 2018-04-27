import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import Mustache from 'mustache';
import mjml2html from 'mjml';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import * as emailService from '@pesposa/core/src/services/email';
import * as legacyAdModal from '@pesposa/core/src/models/legacyAd';
import * as constants from '../constants';
import body from './body.mjml';

const subject = 'Great news! You can now enter the new Pesposa!';

const text = ({ title, name, url, mainEmail }) => `
${title}
================================================

Hello ${name},

You can now join the new Pesposa - the fastest way to buy and sell products in Cyprus.

The new Pesposa is currently in beta, and you are among the first to experience it.

While we are in beta, we are working full-speed to roll-out improvements and new features. Let us know if you hit any issues, or if you have any ideas for improvements.

Ready to get started? Follow this link:

${url}



------------------------------------------------
Pesposa · All rights reserved
${mainEmail}

Unsubscribe: %tag_unsubscribe_url%
`;

const send = async betaInvite => {
  const { email, name, url } = betaInvite;
  const ownedLegacyAds = await legacyAdModal.findByEmail(email);
  let claimYourAdsText = '';

  if (!isNilOrEmpty(ownedLegacyAds)) {
    const title = R.compose(R.prop('title'), R.head)(ownedLegacyAds);
    const moreThanOne = R.length(ownedLegacyAds) > 1;
    claimYourAdsText = `Once you enter the new Pesposa, your ads will automatically become available on your profile: "${title}"${
      moreThanOne ? ', etc. ' : '. '
    }`;
  }

  const props = {
    title: subject,
    name,
    url,
    claimYourAdsText,
    mainEmail: pesposaConfig.MAIN_EMAIL_ADDRESS,
    supportEmail: pesposaConfig.SUPPORT_EMAIL_ADDRESS,
    logoUrl: constants.LOGO_URL,
  };
  const mjml = Mustache.render(body, props);
  const output = mjml2html(mjml);
  const message = {
    to: email,
    subject,
    html: output.html,
    text: text(props),
    headers: {
      'X-Mailgun-Tag': 'waitinglist',
    },
  };

  return emailService.send(message);
};

export default send;
