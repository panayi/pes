import React, { Component } from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import withStyles from '@material-ui/core/styles/withStyles';
import EditImages from '@pesposa/client-core/src/components/EditImages/EditImages';
import Form from './Form/Form';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100% !important',
  },
  editImages: {
    padding: [
      theme.spacing.unit * 2,
      theme.spacing.unit * 2,
      0,
      theme.spacing.unit * 2,
    ],
  },
});

const getDbPath = sourceId => `/sources/${sourceId}/images`;

class SourceForm extends Component {
  static getValidationSchema() {
    return yup.object().shape({
      name: yup.string().required(),
      url: yup.string().url(),
    });
  }

  getInitialValues() {
    return R.compose(
      R.merge({
        name: '',
        url: '',
      }),
      R.pick(['name', 'url']),
      R.defaultTo({}),
      R.prop('source'),
    )(this.props);
  }

  handleSubmit = async (...args) => {
    const { dbPath, isNew, basePath, history, onSubmit } = this.props;

    const sourceId = await onSubmit(...args);

    if (!dbPath) {
      await this.uploadImages(getDbPath(sourceId));
    }

    if (isNew) {
      history.push(`${basePath}/${sourceId}`);
    }
  };

  render() {
    const { dbPath, source, buttonLabel, classes } = this.props;
    const images = source ? R.prop('images', source) : [];

    return (
      <Formik
        initialValues={this.getInitialValues()}
        enableReinitialize
        onSubmit={this.handleSubmit}
        validationSchema={SourceForm.getValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {formikProps => (
          <div className={classes.root}>
            <div className={classes.editImages}>
              <EditImages images={images} dbPath={dbPath} maxImages={2}>
                {({ uploadImages }) => {
                  this.uploadImages = uploadImages;
                }}
              </EditImages>
            </div>
            <Form source={source} buttonLabel={buttonLabel} {...formikProps} />
          </div>
        )}
      </Formik>
    );
  }
}

export default R.compose(
  withProps(({ source }) => ({
    dbPath: source ? getDbPath(source.id) : null,
    isNew: !source,
  })),
  withRouter,
  withStyles(styles),
)(SourceForm);
