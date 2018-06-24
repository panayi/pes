import React from 'react';
import { connect } from 'react-redux';
import { actions as sourcesActions } from 'store/sources';
import SourceForm from '../SourceForm/SourceForm';

class CreateSource extends React.Component {
  handleSubmit = source => {
    const { createSource } = this.props;
    return createSource(source);
  };

  render() {
    const { basePath } = this.props;

    return (
      <SourceForm
        onSubmit={this.handleSubmit}
        buttonLabel="Create Source"
        basePath={basePath}
      />
    );
  }
}

const mapDispatchToProps = {
  createSource: sourcesActions.create,
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateSource);
