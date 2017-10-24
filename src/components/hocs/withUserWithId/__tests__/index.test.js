import React from 'react';
import { mount } from 'enzyme';
import * as authSelectors from 'store/auth/selectors';
import withUserWithId from '../index';

describe('[HOC] withUserWithId', () => {
  authSelectors.isAuthenticatedSelector = jest.fn();
  authSelectors.isAuthenticatingSelector = jest.fn();
  authSelectors.isUserSelector = jest.fn();
  authSelectors.isUserSelector.mockImplementation(R.identity);

  const MyComponent = () => <div>i am this user</div>;
  const createComponent = (userSelector) => {
    const Hoc = withUserWithId(userSelector)(MyComponent);
    return withMockStore(<Hoc />);
  };

  it('should render wrappedComponent correctly', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const { component } = createComponent(R.T);
    const wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrappedComponent when isAuthenticatedSelector = true and isUserSelector = true', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const { component } = createComponent(R.T);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(true);
  });

  it('should not render wrappedComponent when isAuthenticatedSelector = false', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(false);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const { component } = createComponent(R.T);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
  });

  it('should not render wrappedComponent when isUserSelector = false', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const { component } = createComponent(R.F);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
  });
});
