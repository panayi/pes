/* @flow */
import React from 'react';
import * as R from 'ramda';
import { FormGroup, Button, Input, InputLabel } from 'material-ui';
import { Control, Form } from 'react-redux-form';
import UploadFile from '../../uploadFile';
import { modelConnections, connectData } from '../../firebase';
import noop from '../../lib/helpers/noop';

export const INITIAL_STATE = {
  title: '',
  price: null,
  body: '',
  category: '',
  images: [],
};

export const MODEL_KEY = 'post';
export const MODEL_PATH = `forms.${MODEL_KEY}`;

type Props = {
  onSubmit: Function,
  onChange: ?Function,
  filesPath: String,
  categories: Array<Category>,
};

const PostForm = (props: Props) => (
  <Form
    model={MODEL_PATH}
    onSubmit={props.onSubmit}
    onChange={props.onChange}
  >
    <FormGroup>
      <InputLabel htmlFor="forms.post.title">
        Title
      </InputLabel>
      <Input
        is={Control.text}
        model="forms.post.title"
        id="forms.post.title"
      />
      <InputLabel htmlFor="forms.post.body">
        Description:
      </InputLabel>
      <Input
        is={Control.text}
        model="forms.post.body"
        id="forms.post.body"
      />
      <InputLabel htmlFor="forms.post.price">
        Price:
      </InputLabel>
      <Input
        is={Control.text}
        model="forms.post.price"
        id="forms.post.price"
      />
      {
        props.filesPath &&
          <Control.custom
            component={UploadFile.Image}
            filesPath={props.filesPath}
            model="forms.post.images"
            mapProps={{
              onUpload: p => (newFiles) => {
                const { modelValue, onChange } = p;
                const existingFiles = modelValue || [];
                onChange([...newFiles, ...existingFiles]);
              },
              files: p => p.modelValue,
            }}
          />
      }
      <InputLabel htmlFor="forms.post.category">
        Category:
      </InputLabel>
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
    </FormGroup>
    <Button type="submit">
      Post
    </Button>
  </Form>
);

PostForm.defaultProps = {
  onChange: noop,
};

export default connectData({ categories: modelConnections.categories.all })(PostForm);
