import React from 'react';
import { mount } from 'enzyme';
import * as authSelectors from 'store/auth/selectors';
import needsAdmin from '../index';

describe('[HOC] needsAdmin', () => {
  authSelectors.isAdminSelector = jest.fn();
  authSelectors.isAuthenticatingSelector = jest.fn();

  const location = {
    pathname: '/some-admin-protected-url',
    search: '',
    hash: '',
  };

  const MyComponent = () => <div>i am an admin</div>;
  const Hoc = needsAdmin({
    redirectPath: '/you-cant-see-admin',
  })(MyComponent);
  const { component, store } = withMockStore(<Hoc location={location} />);

  it('should render wrappedComponent correctly', () => {
    authSelectors.isAdminSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrappedComponent when isAdminSelector = true', () => {
    authSelectors.isAdminSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(true);
  });

  it('should not render wrappedComponent and redirect, when isAdminSelector = false', () => {
    authSelectors.isAdminSelector.mockReturnValueOnce(false);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
    expect(store.getActions()).toMatchSnapshot();
  });
});
