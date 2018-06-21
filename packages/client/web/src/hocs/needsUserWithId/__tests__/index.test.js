import React from 'react';
import { mount } from 'enzyme';
import * as authSelectors from '@pesposa/client-core/src/store/firebase/auth/selectors';
import needsUserWithId from '../index';

describe('[HOC] needsUserWithId', () => {
  authSelectors.isAuthenticatedSelector = jest.fn();
  authSelectors.isAuthenticatingSelector = jest.fn();
  authSelectors.isCurrentUserSelector = jest.fn();
  authSelectors.isCurrentUserSelector.mockImplementation(R.identity);

  const location = {
    pathname: '/some-user-specific-protected-url',
    search: '',
    hash: '',
  };

  const MyComponent = () => <div>i am this user</div>;
  const createComponent = userSelector => {
    const Hoc = needsUserWithId({
      redirectPath: '/you-cant-see-other-user-stuff',
      userSelector,
    })(MyComponent);
    return withMockStore(<Hoc location={location} />);
  };

  it('should render wrappedComponent correctly', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const { component } = createComponent(R.T);
    const wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrappedComponent when isAuthenticatedSelector = true and isCurrentUserSelector = true', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const { component } = createComponent(R.T);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(true);
  });

  it('should not render wrappedComponent and redirect, when isAuthenticatedSelector = false', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(false);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const { component, store } = createComponent(R.T);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should not render wrappedComponent and redirect, when isCurrentUserSelector = false', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const { component, store } = createComponent(R.F);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
    expect(store.getActions()).toMatchSnapshot();
  });
});
