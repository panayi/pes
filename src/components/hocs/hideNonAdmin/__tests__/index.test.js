import React from 'react';
import * as authSelectors from 'store/auth/selectors';
import hideNonAdmin from '../index';

describe('[HOC] hideNonAdmin', () => {
  const MyComponent = () => <div>hello world</div>;
  authSelectors.isAdminSelector = jest.fn();
  const Hoc = hideNonAdmin(MyComponent);
  const { component } = withMockStore(<Hoc />);

  it('should render wrappedComponent correctly', () => {
    authSelectors.isAdminSelector.mockReturnValueOnce(true);
    const wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrappedComponent when isAdminSelector = true', () => {
    authSelectors.isAdminSelector.mockReturnValueOnce(true);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(true);
  });

  it('should not render wrappedComponent when isAdminSelector = false', () => {
    authSelectors.isAdminSelector.mockReturnValueOnce(false);
    const wrapper = mount(component);
    expect(wrapper.find(MyComponent).exists()).toBe(false);
  });
});
