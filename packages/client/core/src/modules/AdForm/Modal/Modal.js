import React, { Component } from 'react';
import * as R from 'ramda';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../../../components/Button/Button';
import LoadingButton from '../../../components/LoadingButton/LoadingButton';
import Spinner from '../../../components/Spinner/Spinner';
import AdForm from '../AdForm';

const styles = theme => ({
  content: {
    [theme.breakpoints.up(theme.map.laptop)]: {
      minWidth: 530,
      minHeight: 380,
    },
  },
});

class AdFormModal extends Component {
  renderContent = ({ renderForm, isLoaded }) => {
    const {
      title,
      submitButtonLabel,
      isSaving,
      DialogTitle,
      DialogContent,
      DialogActions,
      classes,
    } = this.props;

    if (!isLoaded) {
      return (
        <DialogContent className={classes.content}>
          <Spinner centered />
        </DialogContent>
      );
    }

    const ButtonComponent = isSaving ? LoadingButton : Button;

    return (
      <React.Fragment>
        <DialogTitle closeButton title={title} />
        <DialogContent className={classes.content}>
          {renderForm()}
        </DialogContent>
        <DialogActions>
          <ButtonComponent
            color="primary"
            variant="raised"
            type="submit"
            size="large"
            fullWidth
          >
            {submitButtonLabel}
          </ButtonComponent>
        </DialogActions>
      </React.Fragment>
    );
  };

  render() {
    const {
      ad,
      onSubmit,
      onChange,
      filesPath,
      enableReinitialize,
    } = this.props;

    return (
      <AdForm
        ad={ad}
        onSubmit={onSubmit}
        onChange={onChange}
        filesPath={filesPath}
        enableReinitialize={enableReinitialize}
      >
        {this.renderContent}
      </AdForm>
    );
  }
}

export default R.compose(withStyles(styles))(AdFormModal);
