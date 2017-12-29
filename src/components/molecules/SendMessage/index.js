/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control, actions } from 'react-redux-form';
import { TextField, Button } from 'material-ui';
import { actions as chatActions } from 'store/chat';

const FORM_MODEL = 'newMessage';

type Props = {
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

const mapDispatchToProps = {
  createMessage: chatActions.createMessage,
};

export default connect(null, mapDispatchToProps)(SendMessage);
