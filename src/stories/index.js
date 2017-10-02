import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
/* eslint-enable import/no-extraneous-dependencies */

storiesOf('Welcome', module).add('to Storybook', () => (<Welcome showApp={linkTo('Button')} />));

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span
        role="img"
        aria-label="emojis"
      >
        😀 😎 👍 💯
      </span>
    </Button>
  ));
