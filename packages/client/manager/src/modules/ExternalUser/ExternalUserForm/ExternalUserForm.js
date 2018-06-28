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

const getDbPath = externalUserId => `/externalUsers/${externalUserId}/avatar`;

class ExternalUserForm extends Component {
  static getValidationSchema() {
    return yup.object().shape({
      profile: yup.object().shape({
        name: yup.string(),
        phone: yup.string(),
      }),
      email: yup.string().email(),
      url: yup.string().url(),
      location: yup.string(),
    });
  }

  getInitialValues() {
    return R.compose(
      R.mergeDeepRight({
        profile: {
          name: '',
          phone: '',
        },
        email: '',
        url: '',
        location: null,
      }),
      R.pick(['profile', 'email', 'url', 'location']),
      R.defaultTo({}),
      R.prop('externalUser'),
    )(this.props);
  }

  handleSubmit = async (...args) => {
    const { isNew, history, onSubmit } = this.props;

    const externalUserId = await onSubmit(...args);

    if (isNew) {
      await this.uploadImages(getDbPath(externalUserId));
      history.push(`/data/external-users/${externalUserId}`);
    }
  };

  render() {
    const { dbPath, externalUser, buttonLabel, classes } = this.props;
    const images = R.propOr({}, 'avatar', externalUser);

    return (
      <Formik
        initialValues={this.getInitialValues()}
        enableReinitialize
        onSubmit={this.handleSubmit}
        validationSchema={ExternalUserForm.getValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {formikProps => (
          <div className={classes.root}>
            <div className={classes.editImages}>
              <EditImages images={images} dbPath={dbPath} maxImages={1}>
                {({ uploadImages }) => {
                  this.uploadImages = uploadImages;
                }}
              </EditImages>
            </div>
            <Form
              externalUser={externalUser}
              buttonLabel={buttonLabel}
              {...formikProps}
            />
          </div>
        )}
      </Formik>
    );
  }
}

export default R.compose(
  withProps(({ externalUser }) => ({
    dbPath: externalUser ? getDbPath(externalUser.id) : null,
    isNew: !externalUser,
  })),
  withRouter,
  withStyles(styles),
)(ExternalUserForm);
