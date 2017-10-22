/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf, action, linkTo } from '@storybook/react';
import Button from './Button';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="emojis">😀 😎 👍 💯</span>
    </Button>
  ));
