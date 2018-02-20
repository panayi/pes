import React from 'react';
import { LogoutButton } from '../LogoutButton';

describe('LogoutButton', () => {
  it('should render correctly', () => {
    const wrapper = mount(<LogoutButton />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call firebase.logout on click', () => {
    const mockLogout = jest.fn();
    const firebase = {
      logout: mockLogout,
    };
    const wrapper = mount(<LogoutButton firebase={firebase} />);

    expect(mockLogout.mock.calls.length).toBe(0);
    wrapper.find(LogoutButton).simulate('click');
    expect(mockLogout.mock.calls.length).toBe(1);
  });
});
