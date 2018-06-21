import React from 'react';
import { connect } from 'react-redux';
import { actions as externalUsersActions } from 'store/externalUsers';
import ExternalUserForm from '../ExternalUserForm/ExternalUserForm';

class CreateExternalUser extends React.Component {
  handleSubmit = externalUser => this.props.createExternalUser(externalUser);

  render() {
    return (
      <ExternalUserForm
        onSubmit={this.handleSubmit}
        buttonLabel="Create Seller"
      />
    );
  }
}

const mapDispatchToProps = {
  createExternalUser: externalUsersActions.create,
};

export default connect(null, mapDispatchToProps)(CreateExternalUser);
