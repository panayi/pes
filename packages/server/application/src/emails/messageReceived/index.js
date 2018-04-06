import * as R from 'ramda';
import Mustache from 'mustache';
import mjml2html from 'mjml';
import env from '@pesposa/core/src/config/env';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import * as urlPaths from '@pesposa/core/src/selectors/urlPaths';
import * as emailService from '@pesposa/server-core/src/services/email';
import * as constants from '../constants';
import body from './body.mjml';

const text = ({
  subject,
  otherUserName,
  adTitle,
  replyText,
  externalUserMessage,
  replyUrl,
  mainEmail,
}) => `
${subject}
================================================

You have a new message!

${otherUserName} sent you a message about "${adTitle}".

${externalUserMessage}${replyText}:

${replyUrl}



------------------------------------------------
Pesposa · All rights reserved
${mainEmail}

Unsubscribe: %tag_unsubscribe_url%
`;

const send = conversation => {
  const {
    thisUser,
    otherUser,
    ad,
    adId,
    conversationId,
    isExternalUser,
    externalUserCode,
  } = conversation;
  const otherUserName = R.path(['profile', 'name'], otherUser);
  const otherUserPhotoUrl = R.path(['avatar', 'downloadURL'], otherUser);
  const adTitle = R.path(['props', 'title'], ad);
  const replyUrl = isExternalUser
    ? `https://${env.domain}${urlPaths.sell({ code: externalUserCode, adId })}`
    : `https://${env.domain}/messages/${conversationId}`;
  const subject = `${otherUserName} sent you a message on Pesposa.`;
  const replyText = isExternalUser ? 'Reply to buyer' : 'Reply';
  const externalUserMessage = isExternalUser
    ? "Don't miss the chance to sell your product fast! "
    : null;
  const htmlExternalUserMessage = isExternalUser
    ? "Don't miss the chance to sell your product fast! Click the button above to create an account and respond to buyer."
    : null;

  const props = {
    subject,
    otherUserName,
    otherUserPhotoUrl,
    adTitle,
    replyText,
    externalUserMessage,
    htmlExternalUserMessage,
    replyUrl,
    mainEmail: pesposaConfig.MAIN_EMAIL_ADDRESS,
    facebookPageUrl: pesposaConfig.FACEBOOK_PAGE_URL,
    logoUrl: constants.LOGO_URL,
  };
  const mjml = Mustache.render(body, props);
  const output = mjml2html(mjml);
  const message = {
    fromName: otherUserName,
    to: thisUser.email,
    subject,
    html: output.html,
    text: text(props),
    headers: {
      'X-Mailgun-Tag': isExternalUser
        ? 'externalUserEngagement'
        : 'unreadMessage',
    },
  };

  return emailService.send(message);
};

export default send;
