/* @flow */
import React from 'react';
import R from 'ramda';
import { Flex, Button, Input, Label } from 'rebass';
import { Control, Form } from 'react-redux-form';
import UploadFile from '../../lib/components/UploadFile';
import { jpeg, png, gif } from '../../lib/helpers/filetypes';
import noop from '../../lib/helpers/noop';
import withCategories from '../../Categories/withCategoriesHoc';

export const INITIAL_STATE = {
  title: '',
  body: '',
  category: '',
};

export const MODEL_KEY = 'post';
export const MODEL_PATH = `forms.${MODEL_KEY}`;

type Props = {
  onSubmit: Function,
  onChange: ?Function,
  filesPath: string,
  categories: Array<Category>,
};

const PostForm = (props: Props) => (
  <Form
    model={MODEL_PATH}
    onSubmit={props.onSubmit}
    onChange={props.onChange}
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
      {
        props.filesPath &&
        <UploadFile
          filesPath={props.filesPath}
          acceptedTypes={[jpeg, png, gif]}
        />
      }
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
  onChange: noop,
};

export default withCategories(PostForm);
