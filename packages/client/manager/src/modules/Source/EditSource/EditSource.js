import React from 'react';
import { connect } from 'react-redux';
import Spinner from '@pesposa/client-core/src/components/Spinner/Spinner';
import { actions as sourcesActions } from 'store/sources';
import SourceForm from '../SourceForm/SourceForm';

class EditSource extends React.Component {
  handleSubmit = source => {
    const { sourceId, updateSource } = this.props;
    updateSource(sourceId, source);
  };

  render() {
    const { source } = this.props;
    return source ? (
      <SourceForm
        source={source}
        onSubmit={this.handleSubmit}
        buttonLabel="Save"
      />
    ) : (
      <Spinner centered />
    );
  }
}

const mapDispatchToProps = {
  updateSource: sourcesActions.update,
};

export default connect(null, mapDispatchToProps)(EditSource);
