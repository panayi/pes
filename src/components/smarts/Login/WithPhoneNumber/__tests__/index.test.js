import React from 'react';
import { shallow, mount } from 'enzyme';
import { WithPhoneNumber } from '../index';
import Recaptcha from 'components/atoms/Recaptcha';

jest.mock('react-redux-form', () =>  ({
  Field: (props) => (<div {...props} />),
  Form: (props) => (<form {...props} />),
  Errors: (props) => null,
  Control: {
    text: (props) => (<input {...props} />)
  },
}));

describe('WithPhoneNumber', () => {
  const defaultProps = {
    resetAll: noop,
  };

  beforeAll(() => {
    WithPhoneNumber.BUTTON_ID = 'mockButtonId';
  });

  it('should render correctly when showPhoneNumberForm is true', () => {
    const wrapper = shallow(<WithPhoneNumber {...defaultProps} showPhoneNumberForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when showCodeForm is true', () => {
    const wrapper = shallow(<WithPhoneNumber {...defaultProps} showCodeForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when showError is true', () => {
    const error = {
      message: 'something went wrong',
    };
    const wrapper = shallow(<WithPhoneNumber {...defaultProps} showError error={error} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when showLoading is true', () => {
    const wrapper = shallow(<WithPhoneNumber {...defaultProps} showLoading />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when showTryAgain is true', () => {
    const wrapper = shallow(<WithPhoneNumber {...defaultProps} showTryAgain />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should always render recaptcha', () => {
    const wrapper = shallow(<WithPhoneNumber {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should get recaptcha instance', () => {
    const mockFirebase = {
      auth: {
        RecaptchaVerifier: Object,
      }
    }
    const wrapper = mount(<WithPhoneNumber {...defaultProps} firebase={mockFirebase} />);
    expect(wrapper.instance().recaptcha instanceof Recaptcha).toBe(true);
  });

  it('should resetAll on mount', () => {
    const mockResetAll = jest.fn();
    expect(mockResetAll.mock.calls.length).toBe(0);
    const wrapper = shallow(<WithPhoneNumber {...defaultProps} resetAll={mockResetAll} />);
    expect(mockResetAll.mock.calls.length).toBe(1);
  });

  describe('form submit', () => {
    it('should call submitPhoneNumberForm on phone number form submit', () => {
      const mockSubmit = jest.fn();

      expect(mockSubmit.mock.calls.length).toBe(0);
      const mockFirebase = {
        auth: {
          RecaptchaVerifier: Object,
        },
      };
      const wrapper = mount(
        <WithPhoneNumber
          {...defaultProps}
          firebase={mockFirebase}
          showPhoneNumberForm
          submitPhoneNumberForm={mockSubmit}
        />
      );
      wrapper.find('form').simulate('submit');
      expect(mockSubmit.mock.calls.length).toBe(1);
      expect(mockSubmit.mock.calls[0][1] instanceof Recaptcha).toBe(true);
    });

    it('should call submitCodeForm on code form submit', () => {
      const mockSubmit = jest.fn();

      expect(mockSubmit.mock.calls.length).toBe(0);
      const mockFirebase = {
        auth: {
          RecaptchaVerifier: Object,
        },
      };
      const wrapper = mount(
        <WithPhoneNumber
          {...defaultProps}
          firebase={mockFirebase}
          showCodeForm
          submitCodeForm={mockSubmit}
        />
      );
      wrapper.find('form').simulate('submit');
      expect(mockSubmit.mock.calls.length).toBe(1);
    });
  });
});
