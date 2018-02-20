/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { isLoaded } from 'react-redux-firebase';
import { Formik } from 'formik';
import yup from 'yup';
import { withProps } from 'recompose';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
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
  renderContent: Function,
  renderActions: Function,
};

const styles = theme => ({
  root: {
    width: 530,
    minHeight: 440,
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

  render() {
    const {
      adIsLoaded,
      filesPath,
      onChange,
      onSubmit,
      submitButtonLabel,
      images,
      categories,
      classes,
      renderContent,
      renderActions,
    } = this.props;

    if (!adIsLoaded) {
      return (
        <div className={classes.root}>
          {renderContent(<Spinner centered />)}
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Formik
          initialValues={getInitialValues(this.props)}
          onSubmit={onSubmit}
          validationSchema={this.getValidationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {formikProps => (
            <form onSubmit={formikProps.handleSubmit}>
              {renderContent(
                <div>
                  <div className={classes.editImages}>
                    <EditAdImages images={images} adImagesDbPath={filesPath} />
                  </div>
                  <Form
                    {...formikProps}
                    onChange={onChange}
                    categories={categories}
                  />
                </div>,
              )}
              {renderActions(
                <Button type="submit">{submitButtonLabel}</Button>,
              )}
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default R.compose(
  connectData({ categories: models.categories.all }),
  withProps(({ ad, onSubmit }) => ({
    adIsLoaded: isLoaded(ad),
    images: R.compose(R.values, R.propOr({}, 'images'))(ad),
    onSubmit: values =>
      onSubmit({
        ...values,
        images: ad.images || null,
      }),
  })),
  withStyles(styles),
)(AdForm);
