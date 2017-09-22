import React from 'react';
import { shallow } from 'enzyme';
import FullHeight from '../index';

describe('[Component] FullHeight', () => {
  it('should render as a div', () => {
    const wrapper = shallow(<FullHeight />);
    expect(wrapper).toHaveTagName('div');
  });
});
