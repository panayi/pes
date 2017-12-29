/* @flow */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connectData } from 'lib/connectData';
import { models } from 'store/data';
import { selectors, actions } from 'store/ad';
import { uidSelector } from 'store/auth/selectors';
import { factory as modalFactory } from 'store/modals';
import CreateAdForm from './Form';
import CreateAdSuccess from './Success';

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
  ad: models.pendingAds.one(uidSelector),
};

const mapStateToProps = createStructuredSelector({
  isCreateAdCompleted: selectors.isCreateAdCompletedSelector,
});

const mapDispatchToProps = {
  createAdReset: actions.createAdReset,
};

const ConnectedCreateAdConnect = connectData(
  mapDataToProps,
  mapStateToProps,
  mapDispatchToProps,
)(CreateAdContent);

export default modalFactory({
  content: ConnectedCreateAdConnect,
});
