import * as R from 'ramda';
import Mustache from 'mustache';
import mjml2html from 'mjml';
import env from '@pesposa/core/src/config/env';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import * as emailService from '@pesposa/core/src/services/email';
import body from './body.mjml';

const text = ({ subject, otherUserName, adTitle, replyUrl, mainEmail }) => `
${subject}
================================================

You have a new message!

${otherUserName} sent you a message about "${adTitle}".

Reply:

${replyUrl}



------------------------------------------------
Pesposa · All rights reserved
${mainEmail}

Unsubscribe: %tag_unsubscribe_url%
`;

const send = (conversation) => {
  const { thisUser, otherUser, ad, conversationId } = conversation;
  const otherUserName = R.path(['profile', 'displayName'], otherUser);
  const otherUserPhotoUrl = R.path(['profile', 'avatarUrl'], otherUser);
  const adTitle = R.prop('title', ad);
  const replyUrl = `https://${env.domain}/messages/${conversationId}`;
  const subject = `${otherUserName} sent you a message.`;

  const props = {
    subject,
    otherUserName,
    otherUserPhotoUrl,
    adTitle,
    replyUrl,
    mainEmail: pesposaConfig.MAIN_EMAIL_ADDRESS,
  };
  const mjml = Mustache.render(body, props)
  const output = mjml2html(mjml);
  const message = {
    fromName: otherUserName,
    to: thisUser.email,
    subject,
    html: output.html,
    text: text(props),
    headers: {
      'X-Mailgun-Tag': 'unreadMessage',
    }
  };

  return emailService.send(message);
}

export default send;