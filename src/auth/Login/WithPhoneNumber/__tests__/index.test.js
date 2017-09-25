import React from 'react';
import { shallow } from 'enzyme';
import { WithPhoneNumber } from '../index';

describe('WithPhoneNumber', () => {
  beforeAll(() => {
    WithPhoneNumber.BUTTON_ID = 'mockButtonId';
  });

  it('should render correctly when showPhoneNumberForm is true', () => {
    const wrapper = shallow(<WithPhoneNumber showPhoneNumberForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when showCodeForm is true', () => {
    const wrapper = shallow(<WithPhoneNumber showCodeForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when showError is true', () => {
    const error = {
      message: 'something went wrong',
    };
    const wrapper = shallow(<WithPhoneNumber showError error={error} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when showLoading is true', () => {
    const wrapper = shallow(<WithPhoneNumber showLoading />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when showTryAgain is true', () => {
    const wrapper = shallow(<WithPhoneNumber showTryAgain />);
    expect(wrapper).toMatchSnapshot();
  });
});
