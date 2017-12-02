import React from 'react';
import PropTypes from 'prop-types';
import { withContext } from 'recompose';
import LoginWithFacebook from '../index';

describe('Login', () => {
  describe('LoginWithFacebook', () => {
    const setup = () => {
      const mockLogin = jest.fn();
      const MockLogin = withContext({
        login: PropTypes.func,
      }, () => ({
        login: mockLogin,
      }))(({ children }) => children);

      const Wrapper = () => (
        <MockLogin >
          <LoginWithFacebook />
        </MockLogin>
      );

      const { component } = withMockStore(<Wrapper />);

      return {
        component,
        mockLogin,
      };
    };

    it('should render correctly', () => {
      const { component } = setup();
      const wrapper = mount(component);
      expect(wrapper).toMatchSnapshot();
    });

    it('should call login on click', () => {
      // const mockLogin = jest.fn();
      // mockLogin.mockReturnValueOnce(Promise.resolve());
      const { component, mockLogin } = setup();
      const wrapper = mount(component);

      expect(mockLogin.mock.calls.length).toBe(0);

      wrapper.simulate('click');

      expect(mockLogin.mock.calls.length).toBe(1);
      expect(mockLogin.mock.calls[0][0]).toHaveProperty('provider', 'facebook');
    });

    xit('should call onSuccess on login success', (done) => {
      const mockOnSuccess = jest.fn();
      const wrapper = shallow(
        <LoginWithFacebook
          login={() => Promise.resolve('success 👍')}
          onSuccess={mockOnSuccess}
          onError={noop}
        />,
      );

      expect(mockOnSuccess.mock.calls.length).toBe(0);
      wrapper.simulate('click');

      setImmediate(() => {
        expect(mockOnSuccess.mock.calls.length).toBe(1);
        expect(mockOnSuccess.mock.calls[0][0]).toBe('success 👍');
        done();
      });
    });

    xit('should call onError on login error', (done) => {
      const mockOnError = jest.fn();
      const wrapper = shallow(
        <LoginWithFacebook
          login={() => Promise.reject('error 😭')}
          onSuccess={noop}
          onError={mockOnError}
        />,
      );

      expect(mockOnError.mock.calls.length).toBe(0);
      wrapper.simulate('click');

      setImmediate(() => {
        expect(mockOnError.mock.calls.length).toBe(1);
        expect(mockOnError.mock.calls[0][0]).toBe('error 😭');
        done();
      });
    });
  });
});
