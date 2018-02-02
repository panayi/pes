import React from 'react';
import * as generate from 'pesposa-utils/src/generateClassName';
import Recaptcha from '../index';

describe('[Component] Recaptcha', () => {
  const defaultProps = {
    firebase: {
      auth: {
        RecaptchaVerifier: Object,
      },
    },
  };

  it('should render correctly', () => {
    generate.default = jest.fn();
    generate.default.mockReturnValueOnce('myRecaptchaId');
    const wrapper = shallow(<Recaptcha {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
    generate.default.mockClear();
  });

  it('should have a unique RECAPTCHA_ID', () => {
    generate.default = jest.fn();
    generate.default.mockReturnValueOnce('first').mockReturnValueOnce('second');

    const wrapper = shallow(<Recaptcha {...defaultProps} />);
    const wrapper2 = shallow(<Recaptcha {...defaultProps} />);

    expect(wrapper.instance().RECAPTCHA_ID).toBe('first');
    expect(wrapper2.instance().RECAPTCHA_ID).toBe('second');
  });

  describe('reset', () => {
    class RecaptchaVerifier {
      render = () => Promise.resolve('myWidgetId');
    }
    const props = {
      firebase: {
        auth: {
          RecaptchaVerifier,
        },
      },
    };

    it('should reset grecaptcha', () => {
      const mockReset = jest.fn();
      window.grecaptcha = {
        reset: mockReset,
      };

      const wrapper = shallow(<Recaptcha {...props} />);

      return wrapper
        .instance()
        .reset()
        .then(() => {
          expect(mockReset.mock.calls).toEqual([['myWidgetId']]);
        });
    });
  });
});
