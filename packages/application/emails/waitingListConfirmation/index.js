import Mustache from 'mustache';
import mjml2html from 'mjml';
import env from '@pesposa/core/src/config/env';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import * as emailService from '@pesposa/core/src/services/email';
import body from './body.mjml';

const subject = 'You\'ve been added to Pesposa waitlist';

const text = ({ title, name, referralUrl, mainEmail }) => `
${title}
================================================

Hello ${name},

Thanks for your interest! You've been added to our waitlist.

Interested in priority access?

Get early access by referring your friends. Get 5 friends to join and skip the waitlist! Just share this link:
${referralUrl}

Or share on Facebook:
https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}



------------------------------------------------
Pesposa · All rights reserved
${mainEmail}

Unsubscribe: %tag_unsubscribe_url%
`;

const send = (betaInvite) => {
  const { email, name, affiliate } = betaInvite;
  const props = {
    title: subject,
    name,
    referralUrl: `https://${env.domain}/beta?refcode=${affiliate}`,
    facebookPageUrl: pesposaConfig.FACEBOOK_PAGE_URL,
    mainEmail: pesposaConfig.MAIN_EMAIL_ADDRESS,
  };
  const mjml = Mustache.render(body, props)
  const output = mjml2html(mjml);
  const message = {
    to: email,
    subject,
    html: output.html,
    text: text(props),
    headers: {
     'X-Mailgun-Tag': 'waitinglist',
    }
  };

  return emailService.send(message);
}

export default send;