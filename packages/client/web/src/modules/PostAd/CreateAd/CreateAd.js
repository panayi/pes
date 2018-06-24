import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import {
  actions as createAdActions,
  selectors as createAdSelectors,
} from '@pesposa/client-core/src/store/postAd/createAd';
import CreateAdForm from './Form/Form';
import CreateAdFailure from './Failure/Failure';
import CreateAdSuccess from './Success/Success';

// type Props = {
//   isCreateAdCompleted: boolean,
//   createAdReset: Function,
// };

class CreateAdContent extends Component {
  componentDidMount() {
    const { createAdReset } = this.props;
    createAdReset();
  }

  render() {
    const {
      isCreateAdFailed,
      isCreateAdCompleted,
      isCreateAdPending,
      ...rest
    } = this.props;

    if (isCreateAdFailed) {
      return <CreateAdFailure {...rest} />;
    }

    if (isCreateAdCompleted) {
      const { createAdReset } = rest;
      return <CreateAdSuccess {...rest} onPostAnotherClick={createAdReset} />;
    }

    return <CreateAdForm isSaving={isCreateAdPending} {...rest} />;
  }
}

const mapDataToProps = {
  ad: models.draft,
};

const mapStateToProps = createStructuredSelector({
  isCreateAdCompleted: createAdSelectors.isCreateAdCompletedSelector,
  isCreateAdFailed: createAdSelectors.isCreateAdFailedSelector,
  isCreateAdPending: createAdSelectors.isCreateAdPendingSelector,
  error: createAdSelectors.createAdErrorSelector,
});

const mapDispatchToProps = {
  createAdReset: createAdActions.createAdReset,
};

export default connectData(mapDataToProps, mapStateToProps, mapDispatchToProps)(
  CreateAdContent,
);
