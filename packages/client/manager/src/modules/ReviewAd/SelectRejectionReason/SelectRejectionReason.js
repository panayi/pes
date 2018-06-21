import React from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import translate from '@pesposa/client-core/src/hocs/translate';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import Button from '@pesposa/client-core/src/components/Button/Button';
import RejectButton from '../../../components/RejectButton/RejectButton';

class SelectRejectionReason extends React.Component {
  handleRejectClick = async () => {
    const { selectedReason, onReject, closeModal } = this.props;
    await onReject(selectedReason);
    closeModal();
  };

  render() {
    const {
      rejectionReasons,
      isUpdate,
      selectedReason,
      setSelectedReason,
      t,
      DialogTitle,
      DialogContent,
      DialogActions,
      closeModal,
    } = this.props;

    return (
      <React.Fragment>
        <DialogTitle
          title={`Why are you rejecting this ${isUpdate ? 'change' : 'ad'}?`}
        />
        <DialogContent>
          <FormControl component="fieldset" required>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              // className={classes.group}
              value={selectedReason}
              onChange={event => setSelectedReason(event.target.value)}
            >
              {R.map(
                rejectionReason => (
                  <FormControlLabel
                    key={rejectionReason.id}
                    value={rejectionReason.id}
                    control={<Radio color="primary" />}
                    label={t(rejectionReason.id)}
                  />
                ),
                rejectionReasons,
              )}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal()}>Cancel</Button>
          <RejectButton
            disabled={!selectedReason}
            onClick={this.handleRejectClick}
          >
            Reject
          </RejectButton>
        </DialogActions>
      </React.Fragment>
    );
  }
}

SelectRejectionReason.defaultProps = {
  rejectionReasons: [],
};

const mapDataToProps = {
  rejectionReasons: models.rejectionReasons.all,
};

export default R.compose(
  connectData(mapDataToProps),
  withState('selectedReason', 'setSelectedReason', null),
  translate('rejectionReasons'),
)(SelectRejectionReason);
