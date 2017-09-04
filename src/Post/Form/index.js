/* @flow */
import React from 'react';
import { Flex, Button, Input, Label } from 'rebass';
import { Control, Form } from 'react-redux-form';

export const initialState = {
  title: '',
  body: '',
};

type Props = {
  onSubmit: Function,
};

export default (props: Props) => (
  <Form
    model="forms.post"
    onSubmit={props.onSubmit}
  >
    <Flex column>
      <Label htmlFor="forms.post.title">
        Title
      </Label>
      <Input
        is={Control.text}
        model="forms.post.title"
        id="forms.post.title"
      />
      <Label htmlFor="forms.post.title">
        Description:
      </Label>
      <Input
        is={Control.text}
        model="forms.post.body"
        id="forms.post.body"
      />
    </Flex>
    <Button type="submit">
      Post
    </Button>
  </Form>
);
