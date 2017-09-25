import React from 'react';
import R from 'ramda';
import { mount } from 'enzyme';
import ConnectedLogin, { Login } from '../index';
import WithFacebook from '../WithFacebook';

describe('Login', () => {
  it('should render correctly', () => {
    const LoginComponent = () => (
      <div>
        I live within login component
      </div>
    );
    const login = noop;
    const wrapper = mount(
      <Login
        component={LoginComponent}
        firebase={{ login }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass correct props to LoginComponent', () => {
    const LoginComponent = R.always(<div />);
    const login = R.always('firebase.login');
    const authError = {
      foo: 'bar',
    };
    const wrapper = mount(
      <Login
        component={LoginComponent}
        firebase={{ login }}
        authError={authError}
      />
    );
    const loginComponent = wrapper.find(LoginComponent);
    expect(loginComponent.prop('login')).toBe(login);
    expect(loginComponent.prop('onSuccess')).toBe(wrapper.instance().handleSuccess);
    expect(loginComponent.prop('onError')).toBe(wrapper.instance().handleError);
    expect(loginComponent.prop('authError')).toBe(authError);
  });

  it('should call maybeMergeAnonymousProfile on success', () => {
    const LoginComponent = R.always(<div />);
    const login = noop;
    const mockMaybeMergeAnonymousProfile = jest.fn();
    const wrapper = mount(
      <Login
        component={LoginComponent}
        firebase={{ login }}
        maybeMergeAnonymousProfile={mockMaybeMergeAnonymousProfile}
      />
    );

    expect(mockMaybeMergeAnonymousProfile.mock.calls.length).toBe(0);
    wrapper.instance().handleSuccess();
    expect(mockMaybeMergeAnonymousProfile.mock.calls.length).toBe(1);
  });

  describe('connected', () => {
    it('should connect correct props', () => {
      const LoginComponent = R.always(<div />);
      const state = {
        firebase: {
          authError: {
            foo: 'bar',
          },
        },
      };
      const { component, store } = withMockStore(
        <ConnectedLogin component={LoginComponent} />,
        state,
      );
      const wrapper = mount(component);
      const wrappedComponent = wrapper.find(Login);

      expect(R.is(Object, wrappedComponent.prop('firebase'))).toBe(true);
      expect(wrappedComponent.prop('authError')).toEqual({ foo: 'bar' });
      expect(R.is(Function, wrappedComponent.prop('maybeMergeAnonymousProfile'))).toBe(true);
    });
  });
});
