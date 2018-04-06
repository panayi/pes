import React from 'react';
import generateClassName from '@pesposa/core/src/utils/generateClassName';
import Recaptcha from '../Recaptcha';

describe('[Component] Recaptcha', () => {
  const defaultProps = {
    firebase: {
      auth: {
        RecaptchaVerifier: {},
      },
    },
  };

  it('should render correctly', () => {
    generateClassName.default = jest.fn();
    generateClassName.default.mockReturnValueOnce('myRecaptchaId');
    const wrapper = shallow(<Recaptcha {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
    generateClassName.default.mockClear();
  });

  it('should have a unique RECAPTCHA_ID', () => {
    generateClassName.default = jest.fn();
    generateClassName.default
      .mockReturnValueOnce('first')
      .mockReturnValueOnce('second');

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
