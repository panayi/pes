import Mustache from 'mustache';
import mjml2html from 'mjml';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import * as emailService from '@pesposa/core/src/services/email';
import body from './body.mjml';

const subject = 'Great news! You can now enter the new Pesposa!';

const text = ({ title, name, url }) => `
${title}
================================================

Hello ${name},

You can now join the new Pesposa - the fastest way to buy and sell products in Cyprus.

The new Pesposa is currently in beta, and you are among the first to experience it.

While we are in beta, we are working full-speed to roll-out improvements and new features. Let us know if you hit any issues, or if you have any ideas for improvements.

Click the following link to enter the new Pesposa:

${url}
`;

const send = (betaInvite) => {
  const { email, name, url } = betaInvite;
  const props = {
    title: subject,
    name,
    url,
    mainEmail: pesposaConfig.MAIN_EMAIL_ADDRESS,
    supportEmail: pesposaConfig.SUPPORT_EMAIL_ADDRESS,
  };
  const mjml = Mustache.render(body, props)
  const output = mjml2html(mjml);
  const message = {
    to: email,
    subject,
    html: output.html,
    text: text(props),
  };

  emailService.send(message);
}

export default send;