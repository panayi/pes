import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { renameProp } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import { blueGrey } from '@material-ui/core/colors';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import AdForm from '@pesposa/client-core/src/modules/AdForm/AdForm';
import Panel from 'components/Panel/Panel';
import SubmissionForm from '../SubmissionForm/SubmissionForm';

const styles = theme => ({
  panelRoot: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  adFormRoot: {
    height: '100% !important',
  },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flex: 1,
  },
  adForm: {
    flex: 1,
    padding: theme.spacing.unit * 2,
  },
  sidebar: {
    width: 400,
    padding: theme.spacing.unit * 2,
    background: lighten(blueGrey['100'], 0.5),
  },
});

class BaseSubmissionTask extends React.Component {
  static defaultProps = {
    onChange: noop,
    component: 'div',
    classesFromProps: {},
    renderHeader: noop,
  };

  validate = (adFormValues, submissionFormValues) => {
    this.validateAdForm(adFormValues);
    this.validateSubmissionForm(submissionFormValues);
  };

  renderSubmissionForm = ({
    renderForm: renderAdForm,
    validateForm: validateAdForm,
    values: adFormValues,
    dirty: adFormDirty,
  }) => ({
    renderForm: renderSubmissionForm,
    validateForm: validateSubmissionForm,
    values: submissionFormValues,
    dirty: submissionFormDirty,
  }) => {
    const {
      children,
      component: ContentComponent,
      classesFromProps,
      renderHeader,
      classes,
    } = this.props;
    this.validateAdForm = validateAdForm;
    this.validateSubmissionForm = validateSubmissionForm;
    const formProps = {
      submission: R.merge(adFormValues, submissionFormValues),
      validate: () => this.validate(adFormValues, submissionFormValues),
      dirty: adFormDirty || submissionFormDirty,
      uploadImages: this.uploadImages,
    };

    return (
      <Panel
        classes={{
          root: classes.panelRoot,
          header: classes.header,
        }}
        header={renderHeader(formProps)}
      >
        <div className={classes.root}>
          <ContentComponent
            className={classNames(classes.content, classesFromProps.content)}
          >
            <div
              className={classNames(classes.adForm, classesFromProps.adForm)}
            >
              {renderAdForm({
                children: ({ uploadImages }) => {
                  this.uploadImages = uploadImages;
                },
              })}
            </div>
            <div
              className={classNames(classes.sidebar, classesFromProps.sidebar)}
            >
              {renderSubmissionForm()}
            </div>
          </ContentComponent>
          {children(formProps)}
        </div>
      </Panel>
    );
  };

  renderAdForm = adFormProps => {
    const { submissionTask } = this.props;
    const submission = R.prop('submission', submissionTask);

    return (
      <SubmissionForm submission={submission}>
        {this.renderSubmissionForm(adFormProps)}
      </SubmissionForm>
    );
  };

  render() {
    const {
      submissionTask,
      submissionId,
      imageFilesPath,
      isLoaded,
      classes,
    } = this.props;
    const submission = R.prop('submission', submissionTask);

    return (
      <AdForm
        className={classes.adFormRoot}
        adId={submissionId}
        ad={submission}
        filesPath={imageFilesPath}
        isAdLoaded={isLoaded}
        enableReinitialize
      >
        {this.renderAdForm}
      </AdForm>
    );
  }
}

export default R.compose(
  withRouter,
  renameProp('classes', 'classesFromProps'),
  withStyles(styles),
)(BaseSubmissionTask);
