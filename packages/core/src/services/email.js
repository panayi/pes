import * as R from 'ramda';
import sgMail from '@sendgrid/mail';
import env from '../config/env';
import * as pesposaConfig from '../config/pesposa';

sgMail.setApiKey(env.sendGridApiKey);
sgMail.setSubstitutionWrappers(':', '');

export const send = message => {
  const finalMessage = R.merge(
    {
      template_id: env.sendGridTemplateId,
      from: pesposaConfig.NO_REPLY_EMAIL_ADDRESS,
    },
    message,
  );
  return sgMail.send(finalMessage);
};
