/* @flow */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import {
  actions as postAdActions,
  selectors as postAdSelectors,
} from 'store/postAd';
import CreateAdForm from './Form/Form';
import CreateAdFailure from './Failure/Failure';
import CreateAdSuccess from './Success/Success';

type Props = {
  isCreateAdCompleted: boolean,
  createAdReset: Function,
};

class CreateAdContent extends Component<Props> {
  componentWillMount() {
    this.props.createAdReset();
  }

  render() {
    const { isCreateAdFailed, isCreateAdCompleted, ...rest } = this.props;

    if (isCreateAdFailed) {
      return <CreateAdFailure {...rest} />;
    }

    if (isCreateAdCompleted) {
      return (
        <CreateAdSuccess
          {...rest}
          onPostAnotherClick={this.props.createAdReset}
        />
      );
    }

    return <CreateAdForm {...rest} />;
  }
}

const mapDataToProps = {
  ad: models.draftAd,
};

const mapStateToProps = createStructuredSelector({
  isCreateAdCompleted: postAdSelectors.isCreateAdCompletedSelector,
  isCreateAdFailed: postAdSelectors.isCreateAdFailedSelector,
  error: postAdSelectors.createAdErrorSelector,
});

const mapDispatchToProps = {
  createAdReset: postAdActions.createAdReset,
};

const ConnectedCreateAdConnect = connectData(
  mapDataToProps,
  mapStateToProps,
  mapDispatchToProps,
)(CreateAdContent);

export default ConnectedCreateAdConnect;
