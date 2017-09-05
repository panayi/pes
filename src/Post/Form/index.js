/* @flow */
import React from 'react';
import R from 'ramda';
import { Flex, Button, Input, Label } from 'rebass';
import { Control, Form } from 'react-redux-form';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import UploadFile from '../../lib/components/UploadFile';
import { jpeg, png, gif } from '../../lib/constants/filetypes';

export const initialState = {
  title: '',
  body: '',
  category: '',
};

type Props = {
  onSubmit: Function,
  filesPath: string,
  categories: Array<Category>,
};

const PostForm = (props: Props) => (
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
      <Label htmlFor="forms.post.category">
        Category:
      </Label>
      <Control.select
        model="forms.post.category"
        id="forms.posts.category"
      >
        {R.map(category => (
          <option
            key={category.name}
            value={category.name}
          >
            {category.name}
          </option>
        ), props.categories)}
      </Control.select>
    </Flex>
    <Button type="submit">
      Post
    </Button>
  </Form>
);

PostForm.defaultProps = {
  categories: [],
};

export default R.compose(
  firebaseConnect([
    'categories',
  ]),
  connect((state: Object): Object => ({
    categories: state.firebase.data.categories,
  })),
)(PostForm);
