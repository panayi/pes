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
    const { isCreateAdCompleted, ...rest } = this.props;

    return isCreateAdCompleted ? (
      <CreateAdSuccess {...rest} />
    ) : (
      <CreateAdForm {...rest} />
    );
  }
}

const mapDataToProps = {
  ad: models.draftAd,
};

const mapStateToProps = createStructuredSelector({
  isCreateAdCompleted: postAdSelectors.isCreateAdCompletedSelector,
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
