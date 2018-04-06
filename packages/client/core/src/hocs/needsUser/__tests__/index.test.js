import React from 'react';
import { mount } from 'enzyme';
import * as authSelectors from '../../../store/firebase/auth/selectors';
import needsUser from '../index';

describe('[HOC] needsUser', () => {
  authSelectors.isAuthenticatedSelector = jest.fn();
  authSelectors.isAuthenticatingSelector = jest.fn();

  const location = {
    pathname: '/some-user-protected-url',
    search: '',
    hash: '',
  };

  const SecretComponent = () => <div>i am a user</div>;
  const FailureComponent = () => <div>unauthorized</div>;
  const Hoc = needsUser({
    FailureComponent,
  })(SecretComponent);
  const { component } = withMockStore(<Hoc location={location} />);

  it('should render wrappedComponent correctly', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrappedComponent when isAuthenticatedSelector = true', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(SecretComponent).exists()).toBe(true);
  });

  it('should render failureComponent, when isAuthenticatedSelector = false', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(false);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(SecretComponent).exists()).toBe(false);
    expect(wrapper.find(FailureComponent).exists()).toBe(true);
  });
});
