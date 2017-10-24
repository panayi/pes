import React from 'react';
import { mount } from 'enzyme';
import * as authSelectors from 'store/auth/selectors';
import needsVisitor from '../index';

describe('[HOC] needsVisitor', () => {
  authSelectors.isNotAuthenticatedSelector = jest.fn();
  authSelectors.isAuthenticatingSelector = jest.fn();
  
  const location = {
    pathname: '/some-visitor-specific-url',
    search: '',
    hash: '',
  };

  const MyComponent = () => <div>i am a visitor</div>;
  const Hoc = needsVisitor({
    redirectPath: '/you-cant-see-visitor-page',
  })(MyComponent);
  const { component, store } = withMockStore(<Hoc location={location} />);
  
  it('should render wrappedComponent correctly', () => {
    authSelectors.isNotAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrappedComponent when isNotAuthenticatedSelector = true', () => {
    authSelectors.isNotAuthenticatedSelector.mockReturnValueOnce(true);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(true);
  });
  
  it('should not render wrappedComponent and redirect, when isNotAuthenticatedSelector = false', () => {
    authSelectors.isNotAuthenticatedSelector.mockReturnValueOnce(false);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should render Loader when isAuthenticatingSelector = true', () => {
    authSelectors.isNotAuthenticatedSelector.mockReturnValueOnce(false);
    authSelectors.isAuthenticatingSelector.mockReturnValueOnce(true);
    const wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  });

  xit('should get redirectPath from wrappedComponent props');
});
