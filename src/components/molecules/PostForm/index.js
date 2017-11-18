/* @flow */
import React from 'react';
import * as R from 'ramda';
import { isLoaded } from 'react-redux-firebase';
import { withProps, branch, renderComponent, lifecycle } from 'recompose';
import { FormGroup, FormControl, TextField, withStyles } from 'material-ui';
import { Control, Form } from 'react-redux-form';
import { actions, constants } from 'store/post';
import { modelConnections, connectData } from 'services/connectData';
import noop from 'utils/noop';
import Spinner from 'components/atoms/Spinner';
import EditPostImages from 'components/molecules/EditPostImages';

type Props = {
  onChange: ?Function,
  images: Array<Object>,
  filesPath: String,
  categories: Array<Category>,
  classes: Object,
};

const styles = theme => ({
  selectWrap: {
    marginTop: theme.spacing.unit * 2,
  },
});

const Select = withProps({ select: true })(TextField);

const Loading = withProps({ centered: true })(Spinner);

const PostForm = (props: Props) => {
  const { filesPath, onChange, classes, images, categories } = props;

  return (
    <div>
      <EditPostImages
        images={images}
        postImagesDbPath={filesPath}
      />
      <Form
        className={classes.form}
        model={constants.POST_FORM_MODEL_PATH}
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
              ), R.values(categories))}
            </Control.select>
          </FormControl>
        </FormGroup>
      </Form>
    </div>
  );
};

PostForm.defaultProps = {
  onChange: noop,
};

const mapDispatchToProps = {
  initializeForm: actions.initializeForm,
};

export default R.compose(
  withStyles(styles),
  connectData({ categories: modelConnections.categories.all }, null, mapDispatchToProps),
  branch(
    R.compose(
      R.not,
      isLoaded,
      R.prop('post'),
    ),
    renderComponent(Loading),
  ),
  lifecycle({
    componentWillMount() {
      this.props.initializeForm(this.props.post);
    },
  }),
  withProps(({ post }) => ({
    images: R.compose(
      R.values,
      R.propOr({}, 'images'),
      R.defaultTo({}),
    )(post),
  })),
)(PostForm);
