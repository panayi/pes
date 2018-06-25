import React from 'react';
import { connect } from 'react-redux';
import Spinner from '@pesposa/client-core/src/components/Spinner/Spinner';
import { actions as externalUsersActions } from 'store/externalUsers';
import ExternalUserForm from '../ExternalUserForm/ExternalUserForm';

class EditExternalUser extends React.Component {
  handleSubmit = externalUser => {
    const { externalUserId, updateExternalUser } = this.props;
    updateExternalUser(externalUserId, externalUser);
  };

  render() {
    const { externalUser } = this.props;
    return externalUser ? (
      <ExternalUserForm
        externalUser={externalUser}
        onSubmit={this.handleSubmit}
        buttonLabel="Save"
      />
    ) : (
      <Spinner centered />
    );
  }
}

const mapDispatchToProps = {
  updateExternalUser: externalUsersActions.update,
};

export default connect(
  null,
  mapDispatchToProps,
)(EditExternalUser);
