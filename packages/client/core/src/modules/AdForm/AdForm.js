import React, { Component } from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import classNames from 'classnames';
import { isLoaded as dataIsLoaded } from 'react-redux-firebase';
import { Formik } from 'formik';
import * as yup from 'yup';
import { withProps } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import * as adsConfig from '@pesposa/core/src/config/ads';
import { connectData } from '../../lib/connectData';
import { models } from '../../store/firebase/data';
import Nothing from '../../components/Nothing/Nothing';
import EditImages from '../../components/EditImages/EditImages';
import Form from './Form/Form';

const DEFAULT_VALUES = {
  title: '',
  price: null,
  body: '',
  category: '',
  images: null,
};

const getInitialValues = R.compose(
  R.merge(DEFAULT_VALUES),
  R.pick(R.keys(DEFAULT_VALUES)),
  R.defaultTo({}),
  R.prop('ad'),
);

// type Props = {
//   ad: ?Ad,
//   adIsLoaded: boolean,
//   onChange: ?Function,
//   onSubmit: Function,
//   submitButtonLabel: string,
//   images: Array<Object>,
//   filesPath: string,
//   categories: Array<Category>,
//   initialize: boolean,
//   classes: Object,
//   DialogTitle: React$Component<*>,
//   DialogContent: React$Component<*>,
//   DialogActions: React$Component<*>,
//   submitted: boolean,
//   setSubmitted: Function,
// };

const styles = theme => ({
  root: {
    all: 'inherit',
    boxShadow: 'none',
    margin: 0,
  },
  editImages: {
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down(theme.map.tablet)]: {
      marginBottom: 0,
    },
  },
});

class AdForm extends Component {
  static defaultProps = {
    categories: [],
    children: null,
    onChange: noop,
    DialogTitle: Nothing,
    DialogContent: 'div',
    DialogActions: 'div',
  };

  static getValidationSchema() {
    return yup.object().shape({
      title: yup
        .string()
        .required('Title is required')
        .max(
          adsConfig.TITLE_MAX_LENGTH,
          `Title should be less than ${adsConfig.TITLE_MAX_LENGTH} characters`,
        ),
      body: yup
        .string()
        .required('Description is required')
        .max(
          adsConfig.BODY_MAX_LENGTH,
          `Description should be less than ${
            adsConfig.BODY_MAX_LENGTH
          } characters`,
        ),
      price: yup
        .number()
        .typeError('Price should be a number')
        .required('Price is required')
        .positive('Price should be positive')
        .max(
          adsConfig.PRICE_MAX,
          'Price should be smaller than 1 billion (999,999,999.00)',
        ),
      category: yup.string().required('Category is required'),
      images: yup.mixed().required('At least 1 image is required'),
    });
  }

  componentDidUpdate(prevProps) {
    if (
      propsChanged(['images'], prevProps, this.props) &&
      this.setImagesFieldValue
    ) {
      this.setImagesFieldValue(this.props.images);
    }
  }

  renderForm = (formikProps, props = {}) => {
    const {
      adId,
      categories,
      images,
      filesPath,
      onChange,
      classes,
    } = this.props;

    this.setImagesFieldValue = value =>
      formikProps.setFieldValue('images', value);
    const published = !!adId;

    return (
      <React.Fragment>
        <div className={classes.editImages}>
          <EditImages
            images={images}
            error={formikProps.errors.images}
            dbPath={filesPath}
            canDelete={imagesCount => !published || imagesCount > 1}
            maxImages={adsConfig.MAXIMUM_IMAGES_PER_AD}
          >
            {props.children}
          </EditImages>
        </div>
        <Form {...formikProps} onChange={onChange} categories={categories} />
      </React.Fragment>
    );
  };

  render() {
    const {
      isAdLoaded,
      enableReinitialize,
      onSubmit,
      className,
      children,
      classes,
    } = this.props;

    if (!isAdLoaded) {
      return children({
        renderForm: noop,
        isLoaded: false,
      });
    }

    return (
      <Formik
        initialValues={getInitialValues(this.props)}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
        validationSchema={AdForm.getValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {formikProps => (
          <form
            className={classNames(classes.root, className)}
            onSubmit={formikProps.handleSubmit}
          >
            {children({
              ...formikProps,
              renderForm: props => this.renderForm(formikProps, props),
              handleSubmit: (...args) =>
                this.handleSubmit(formikProps, ...args),
              isLoaded: true,
            })}
          </form>
        )}
      </Formik>
    );
  }
}

const mapDataToProps = { categories: models.categories.all };

export default R.compose(
  connectData(mapDataToProps),
  withProps(({ ad, isAdLoaded, onSubmit, onChange }) => ({
    isAdLoaded: isAdLoaded || dataIsLoaded(ad),
    images: R.propOr({}, 'images', ad),
    onSubmit: values => {
      if (onSubmit) {
        onSubmit({
          ...values,
          images: ad.images || null,
        });
      }
    },
    onChange: values => {
      if (onChange) {
        onChange({
          ...values,
          images: (ad && ad.images) || null,
        });
      }
    },
  })),
  withStyles(styles),
)(AdForm);
