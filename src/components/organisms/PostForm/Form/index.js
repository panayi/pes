/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { FormGroup, FormControl, Button, TextField, withStyles } from 'material-ui';
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

const styles = theme => ({
  root: {
    width: 450,
  },
  selectWrap: {
    marginTop: theme.spacing.unit * 2,
  },
});

const Select = withProps({ select: true })(TextField);

const PostForm = (props: Props) => {
  const { dialogProps, filesPath, onSubmit, onChange, classes, images, categories } = props;

  return (
    <Modal
      {...dialogProps}
      classes={{
        paper: classes.root,
      }}
      actions={
        <Button onClick={onSubmit}>
          Post
        </Button>
      }
    >
      <EditPostImages
        images={images}
        postImagesDbPath={filesPath}
      />
      <Form
        className={classes.form}
        model={POST_FORM_MODEL_PATH}
        onChange={onChange}
      >
        <FormGroup>
          <Control.text
            model=".title"
            id="title"
            label="What are you selling?"
            component={TextField}
            fullWidth
          />
          <Control.text
            model=".body"
            id="body"
            label="Please write a short description"
            type="textarea"
            component={TextField}
          />
          <Control.text
            model=".price"
            id="price"
            label="Price"
            component={TextField}
          />
          <FormControl className={classes.selectWrap}>
            <Control.select
              model=".category"
              component={Select}
              SelectProps={{ native: true }}
            >
              <option value="">Select category</option>
              {R.map(category => (
                <option
                  key={category.name}
                  value={category.name}
                >
                  {category.name}
                </option>
              ), categories)}
            </Control.select>
          </FormControl>
        </FormGroup>
      </Form>
    </Modal>
  );
};

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
