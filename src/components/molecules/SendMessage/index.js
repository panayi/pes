/* @flow */
import React, { Component } from 'react';
import { LocalForm, Control, actions } from 'react-redux-form';
import { TextField, Button } from 'material-ui';
import { connectData } from 'lib/connectData';
import propSelector from 'utils/propSelector';
import { models } from 'store/data';
import { actions as chatActions } from 'store/chat';

const FORM_MODEL = 'newMessage';

type Props = {
  adId: String, // eslint-disable-line react/no-unused-prop-types
  ad: Ad,
  createMessage: Function,
};

class SendMessage extends Component<Props> {
  formDispatch: null;

  handleSubmit = ({ body }) => {
    const { ad, createMessage } = this.props;
    createMessage(body, ad).then(() =>
      this.formDispatch(actions.reset(FORM_MODEL)),
    );
  };

  render() {
    return (
      <LocalForm
        model={FORM_MODEL}
        getDispatch={dispatch => {
          this.formDispatch = dispatch;
        }}
        onSubmit={this.handleSubmit}
        initialState={{ body: '' }}
      >
        <Control.text component={TextField} model=".body" />
        <Control.button type="submit" component={Button} model="newMessage">
          Send
        </Control.button>
      </LocalForm>
    );
  }
}

const mapDataToProps = {
  ad: models.ads.one(propSelector('adId')),
};

const mapDispatchToProps = {
  createMessage: chatActions.createMessage,
};

export default connectData(mapDataToProps, null, mapDispatchToProps)(
  SendMessage,
);
