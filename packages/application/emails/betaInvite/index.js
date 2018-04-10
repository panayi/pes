import * as emailService from '@pesposa/core/src/services/email';
import html from './body.html';

const subject = 'The wait is over. Join the new Pesposa!';

const buttonLabel = 'Get Started';

const text = `
** THE WAIT IS OVER. JOIN THE NEW PESPOSA!
------------------------------------------------------------

You can now join the new Pesposa - the fastest way to buy and sell products in Cyprus.

The new Pesposa is currently in beta, and you are among the first to experience it.

While we are in beta, we are working full-speed to roll-out improvements and new features. Let us know if you hit any issues, or if you have any ideas for improvements.

Ready to get started?
`;

const send = (to, buttonUrl) => {
  const message = {
    to,
    subject,
    html,
    text,
    substitutions: {
      'buttonlabel': buttonLabel,
      'buttonurl': buttonUrl,
    }
  };

  emailService.send(message);
}

export default send;