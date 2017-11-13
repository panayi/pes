/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { FormGroup, FormControl, Button, Select, TextField, withStyles } from 'material-ui';
import { Control, Form } from 'react-redux-form';
import { POST_FORM_MODEL_PATH } from 'store/post/constants';
import { modelConnections, connectData } from 'services/connectData';
import noop from 'utils/noop';
import Modal from 'components/molecules/Modal';
import EditPostImages from 'components/organisms/EditPostImages';

type Props = {
  onSubmit: Function,
  onChange: ?Function,
  images: Array<Object>,
  filesPath: String,
  categories: Array<Category>,
  dialogProps: Object,
  classes: Object,
};

const styles = {
};

const PostForm = (props: Props) => (
  <Modal
    {...props.dialogProps}
    actions={
      <Button onClick={props.onSubmit}>
        Post
      </Button>
    }
  >
    <EditPostImages
      images={props.images}
      postImagesDbPath={props.filesPath}
    />
    <Form
      className={props.classes.form}
      model={POST_FORM_MODEL_PATH}
      onChange={props.onChange}
    >
      <FormGroup>
        <Control.text
          model=".title"
          id="title"
          label="Title"
          component={TextField}
          fullWidth
        />
        <Control.text
          model=".body"
          id="body"
          label="Description"
          type="textarea"
          component={TextField}
        />
        <Control.text
          model=".price"
          id="price"
          label="Price"
          component={TextField}
        />
        <FormControl>
          <Control.select
            model=".category"
            component={Select}
            native
          >
            <option value="">Select category</option>
            {R.map(category => (
              <option
                key={category.name}
                value={category.name}
              >
                {category.name}
              </option>
            ), props.categories)}
          </Control.select>
        </FormControl>
      </FormGroup>
    </Form>
  </Modal>
);

PostForm.defaultProps = {
  onChange: noop,
};

export default R.compose(
  withProps(({ post }) => ({
    images: R.compose(
      R.values,
      R.propOr({}, 'images'),
      R.defaultTo('post'),
    )(post),
  })),
  connectData({ categories: modelConnections.categories.all }),
  withStyles(styles),
)(PostForm);
