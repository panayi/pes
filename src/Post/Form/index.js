/* @flow */
import React from 'react';
import { Flex, Button, Input, Label } from 'rebass';
import { Control, Form } from 'react-redux-form';
import UploadFile from '../../lib/components/UploadFile';
import { jpeg, png, gif } from '../../lib/constants/filetypes';

export const initialState = {
  title: '',
  body: '',
};

type Props = {
  onSubmit: Function,
  filesPath: string,
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
      <UploadFile
        filesPath={props.filesPath}
        acceptedTypes={[jpeg, png, gif]}
      />
    </Flex>
    <Button type="submit">
      Post
    </Button>
  </Form>
);
