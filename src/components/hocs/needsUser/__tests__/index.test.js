import React from 'react';
import { mount } from 'enzyme';
import * as authSelectors from 'store/auth/selectors';
import needsUser from '../index';

describe('[HOC] needsUser', () => {
  authSelectors.isAuthenticatedSelector = jest.fn();
  authSelectors.isAuthenticatingSelector = jest.fn();

  const location = {
    pathname: '/some-user-protected-url',
    search: '',
    hash: '',
  };

  const MyComponent = () => <div>i am a user</div>;
  const Hoc = needsUser({
    redirectPath: '/you-cant-see-user',
  })(MyComponent);
  const { component, store } = withMockStore(<Hoc location={location} />);

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
    expect(wrapper.find(MyComponent).exists()).toBe(true);
  });

  it('should not render wrappedComponent and redirect, when isAuthenticatedSelector = false', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(false);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
    expect(store.getActions()).toMatchSnapshot();
  });
});
