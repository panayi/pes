/* @flow */
import React from 'react';
import * as R from 'ramda';
import { FormGroup, Button, Input, InputLabel } from 'material-ui';
import { Control, Form } from 'react-redux-form';
import UploadFile from 'components/smarts/UploadFile';
import { modelConnections, connectData } from 'services/firebase/index';
import noop from 'utils/noop';

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
      <InputLabel htmlFor="title">
        Title
      </InputLabel>
      <Control.text
        model=".title"
        id="title"
        component={Input}
      />
      <InputLabel htmlFor="body">
        Description:
      </InputLabel>
      <Control.text
        model=".body"
        id="body"
        component={Input}
      />
      <InputLabel htmlFor="price">
        Price:
      </InputLabel>
      <Control.text
        model=".price"
        id="price"
        component={Input}
      />
      {
        props.filesPath &&
          <Control.custom
            component={UploadFile.Image}
            filesPath={props.filesPath}
            model=".images"
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
      <InputLabel htmlFor="category">
        Category:
      </InputLabel>
      <Control.select
        model=".category"
        id="category"
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
