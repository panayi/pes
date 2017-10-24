import React from 'react';
import { logout } from '../logout';

describe('logout', () => {
  it('should render correctly', () => {
    const firebase = {
      logout: noop,
    };
    const Button = logout(() => (
      <button>
        Log out
      </button>
    ));
    const wrapper = mount(
      <Button firebase={firebase} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call firebase.logout on click', () => {
    const mockLogout = jest.fn();
    const firebase = {
      logout: mockLogout,
    };
    const LogoutButton = 'button';
    const Hoc = logout(LogoutButton);
    const mockOnLogout = jest.fn();
    const wrapper = mount(
      <Hoc
        firebase={firebase}
        onLogout={mockOnLogout}
      />,
    );

    expect(mockLogout.mock.calls.length).toBe(0);
    expect(mockOnLogout.mock.calls.length).toBe(0);

    wrapper.find(LogoutButton).simulate('click');

    expect(mockLogout.mock.calls.length).toBe(1);
    expect(mockOnLogout.mock.calls.length).toBe(1);
  });
});
