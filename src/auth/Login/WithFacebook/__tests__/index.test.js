import React from 'react';
import { shallow } from 'enzyme';
import WithFacebook from '../index';

describe('Login', () => {
  describe('WithFacebook', () => {
    it('should render correctly', () => {
      const wrapper = shallow(
        <WithFacebook
          login={noop}
          onSuccess={noop}
          onError={noop}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should call login on click', () => {
      const mockLogin = jest.fn();
      mockLogin.mockReturnValueOnce(Promise.resolve());
      const wrapper = shallow(
        <WithFacebook
          login={mockLogin}
          onSuccess={noop}
          onError={noop}
        />
      );

      expect(mockLogin.mock.calls.length).toBe(0);

      wrapper.simulate('click');

      expect(mockLogin.mock.calls.length).toBe(1);
      expect(mockLogin.mock.calls[0][0]).toHaveProperty('provider', 'facebook');
    });

    it('should call onSuccess on login success', (done) => {
      const mockOnSuccess = jest.fn();
      const wrapper = shallow(
        <WithFacebook
          login={() => Promise.resolve('success 👍')}
          onSuccess={mockOnSuccess}
          onError={noop}
        />
      );

      expect(mockOnSuccess.mock.calls.length).toBe(0);
      wrapper.simulate('click');

      setImmediate(() => {
        expect(mockOnSuccess.mock.calls.length).toBe(1);
        expect(mockOnSuccess.mock.calls[0][0]).toBe('success 👍');
        done();
      });
    });

    it('should call onError on login error', (done) => {
      const mockOnError = jest.fn();
      const wrapper = shallow(
        <WithFacebook
          login={() => Promise.reject('error 😭')}
          onSuccess={noop}
          onError={mockOnError}
        />
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
