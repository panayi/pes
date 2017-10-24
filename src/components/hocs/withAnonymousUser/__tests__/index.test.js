import React from 'react';
import { withProps } from 'recompose';
import * as maybeSignInAnonymously from '../utils/maybeSignInAnonymously';
import { withAnonymousUser } from '../index';

describe('[HOC] withAnonymousUser', () => {
  const mockSignIn = jest.fn();
  const firebase = {
    auth: R.always({
      signInAnonymously: mockSignIn,
    }),
  };

  const MyComponent = () => <div>i need a user, even anonymous</div>;
  const Hoc = withAnonymousUser(MyComponent);

  beforeEach(() => {
    mockSignIn.mockClear();
  });
  
  describe('lifecycle', () => {
    const originalMaybeSignInAnonymously = maybeSignInAnonymously.default;

    beforeAll(() => {
      maybeSignInAnonymously.default = jest.fn();
    });

    afterAll(() => {
      maybeSignInAnonymously.default = originalMaybeSignInAnonymously;
    });

    it('should call maybeSignInAnonymously on mount and on props change', () => {
      expect(maybeSignInAnonymously.default.mock.calls.length).toBe(0);
      const wrapper = mount(<Hoc firebase={firebase} isAuthenticating isAuthenticated={false} />);
      expect(maybeSignInAnonymously.default.mock.calls.length).toBe(1);
      wrapper.setProps({ foo: 'bar' });
      expect(maybeSignInAnonymously.default.mock.calls.length).toBe(2);
      expect(maybeSignInAnonymously.default.mock.calls[1]).toEqual([{
        firebase,
        isAuthenticating: true,
        isAuthenticated: false,
        foo: 'bar',
      }]);
    });
  });

  describe('signInAnonymously', () => {
    it('should do nothing when isAuthenticating', () => {
      const wrapper = mount(<Hoc firebase={firebase} isAuthenticating isAuthenticated={false} />);
      expect(mockSignIn.mock.calls.length).toBe(0);
    });
    
    it('should do nothing when isAuthenticated', () => {
      const wrapper = mount(<Hoc firebase={firebase} isAuthenticating={false} isAuthenticated />);
      expect(mockSignIn.mock.calls.length).toBe(0);
    });

    it('should sign-in anonymously when both isAuthenticating and isAuthenticated are false', () => {
      const wrapper = mount(<Hoc firebase={firebase} isAuthenticating={false} isAuthenticated={false} />);
      expect(mockSignIn.mock.calls.length).toBe(1);
    });
  });
});
