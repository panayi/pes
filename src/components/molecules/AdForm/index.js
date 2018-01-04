/* @flow */
import React from 'react';
import * as R from 'ramda';
import { isLoaded } from 'react-redux-firebase';
import { withProps, lifecycle, branch } from 'recompose';
import {
  FormGroup,
  FormControl,
  TextField,
  Button,
  withStyles,
} from 'material-ui';
import { Control, Form } from 'react-redux-form';
import { connectData } from 'lib/connectData';
import { models } from 'store/data';
import { models as formModels } from 'store/forms';
import { actions as postAdActions } from 'store/postAd';
import noop from 'utils/noop';
import Spinner from 'components/atoms/Spinner';
import EditAdImages from 'components/molecules/EditAdImages';

type Props = {
  onChange: ?Function,
  onSubmit: Function,
  submitButtonLabel: string,
  images: Array<Object>,
  filesPath: string,
  categories: Array<Category>,
  adIsLoaded: Boolean,
  classes: Object,
  renderContent: Function,
  renderActions: Function,
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

const AdForm = (props: Props) => {
  const {
    filesPath,
    onChange,
    onSubmit,
    submitButtonLabel,
    images,
    categories,
    adIsLoaded,
    classes,
    renderContent,
    renderActions,
  } = props;

  return (
    <Form
      model={formModels.postAd.path}
      onChange={onChange}
      onSubmit={onSubmit}
    >
      {renderContent(
        <div className={classes.root}>
          {!adIsLoaded && <Spinner centered overlay />}
          <EditAdImages images={images} adImagesDbPath={filesPath} />
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
                {R.map(
                  category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ),
                  R.values(categories),
                )}
              </Control.select>
            </FormControl>
          </FormGroup>
        </div>,
      )}
      {renderActions(
        <Control.button
          component={Button}
          type="submit"
          model={formModels.postAd.key}
        >
          {submitButtonLabel}
        </Control.button>,
      )}
    </Form>
  );
};

AdForm.defaultProps = {
  onChange: noop,
};

const mapDispatchToProps = {
  initializeForm: postAdActions.initializeForm,
};

export default R.compose(
  withStyles(styles),
  connectData({ categories: models.categories.all }, null, mapDispatchToProps),
  withProps(({ ad }) => ({
    adIsLoaded: isLoaded(ad),
  })),
  branch(
    R.prop('adIsLoaded'),
    lifecycle({
      componentWillMount() {
        this.props.initializeForm(this.props.ad);
      },
    }),
  ),
  withProps(({ ad }) => ({
    images: R.compose(R.values, R.propOr({}, 'images'))(ad),
  })),
)(AdForm);
