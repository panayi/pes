/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { isLoaded } from 'react-redux-firebase';
import { Formik } from 'formik';
import yup from 'yup';
import { withProps, withState } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import EditAdImages from '../EditAdImages/EditAdImages';
import Form from './Form/Form';

const DEFAULT_VALUES = {
  title: '',
  price: '',
  body: '',
  category: '',
};

const getInitialValues = R.compose(
  R.merge(DEFAULT_VALUES),
  R.pick(R.keys(DEFAULT_VALUES)),
  R.defaultTo({}),
  R.prop('ad'),
);

type Props = {
  ad: ?Ad,
  adIsLoaded: boolean,
  onChange: ?Function,
  onSubmit: Function,
  submitButtonLabel: string,
  images: Array<Object>,
  filesPath: string,
  categories: Array<Category>,
  initialize: boolean,
  classes: Object,
  DialogTitle: React$Component<*>,
  DialogContent: React$Component<*>,
  DialogActions: React$Component<*>,
  submitted: boolean,
  setSubmitted: Function,
};

const styles = theme => ({
  root: {
    all: 'inherit',
    boxShadow: 'none',
    margin: 0,
  },
  content: {
    [theme.breakpoints.up(theme.map.tablet)]: {
      minWidth: 530,
      minHeight: 380,
    },
  },
  editImages: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class AdForm extends Component<Props> {
  static defaultProps = {
    categories: [],
    onChange: noop,
  };

  getValidationSchema = () =>
    yup.object().shape({
      title: yup.string().required('Title is required'),
      body: yup.string().required('Description is required'),
      price: yup
        .number()
        .typeError('Price should be a number')
        .required('Price is required')
        .positive('Price should be positive'),
      category: yup.string().required('Category is required'),
    });

  handleSubmit = (formikProps, ...rest) => {
    this.props.setSubmitted(true);
    formikProps.handleSubmit(...rest);
  };

  render() {
    const {
      adId,
      adIsLoaded,
      filesPath,
      onChange,
      onSubmit,
      title,
      submitButtonLabel,
      images,
      categories,
      classes,
      DialogTitle,
      DialogContent,
      DialogActions,
      submitted,
    } = this.props;

    if (!adIsLoaded) {
      return (
        <DialogContent className={classes.content}>
          <Spinner centered />
        </DialogContent>
      );
    }

    const isImagesError =
      submitted && R.isEmpty(images) && 'At least 1 image is required';

    return (
      <Formik
        initialValues={getInitialValues(this.props)}
        onSubmit={onSubmit}
        validationSchema={this.getValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {formikProps => (
          <form
            className={classes.root}
            onSubmit={(...args) => this.handleSubmit(formikProps, ...args)}
          >
            <DialogTitle closeButton title={title} />
            <DialogContent className={classes.content}>
              <div className={classes.editImages}>
                <EditAdImages
                  images={images}
                  error={isImagesError}
                  adImagesDbPath={filesPath}
                  published={!!adId}
                />
              </div>
              <Form
                {...formikProps}
                onChange={onChange}
                categories={categories}
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="raised"
                type="submit"
                size="large"
              >
                {submitButtonLabel}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    );
  }
}

export default R.compose(
  connectData({ categories: models.categories.all }),
  withState('submitted', 'setSubmitted', false),
  withProps(({ ad, onSubmit }) => ({
    adIsLoaded: isLoaded(ad),
    images: R.propOr({}, 'images')(ad),
    onSubmit: values =>
      onSubmit({
        ...values,
        images: ad.images || null,
      }),
  })),
  withStyles(styles),
)(AdForm);
