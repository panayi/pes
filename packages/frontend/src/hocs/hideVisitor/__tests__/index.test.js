import React from 'react';
import * as authSelectors from 'store/firebase/auth/selectors';
import hideVisitor from '../index';

describe('[HOC] hideVisitor', () => {
  const MyComponent = () => <div>hello world</div>;
  authSelectors.isAuthenticatedSelector = jest.fn();
  const Hoc = hideVisitor(MyComponent);
  const { component } = withMockStore(<Hoc />);

  it('should render wrappedComponent correctly', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    const wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrappedComponent when isAuthenticatedSelector = true', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(true);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(true);
  });

  it('should not render wrappedComponent when isAuthenticatedSelector = false', () => {
    authSelectors.isAuthenticatedSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
  });
});
