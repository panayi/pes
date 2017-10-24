import React from 'react';
import * as authSelectors from 'store/auth/selectors';
import hideUser from '../index';

describe('[HOC] hideUser', () => {
  const MyComponent = () => <div>hello world</div>;
  authSelectors.isNotAuthenticatedSelector = jest.fn();
  const Hoc = hideUser(MyComponent);
  const { component } = withMockStore(<Hoc />);
  
  it('should render wrappedComponent correctly', () => {
    authSelectors.isNotAuthenticatedSelector.mockReturnValueOnce(true);
    const wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrappedComponent when isNotAuthenticatedSelector = true', () => {
    authSelectors.isNotAuthenticatedSelector.mockReturnValueOnce(true);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(true);
  });
  
  it('should not render wrappedComponent when isNotAuthenticatedSelector = false', () => {
    authSelectors.isNotAuthenticatedSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
  });
});
