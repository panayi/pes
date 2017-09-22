import React from 'react';
import { shallow } from 'enzyme';
import FullHeight from '../index';

describe('[Component] FullHeight', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <FullHeight>
        <header>I am a header</header>
        <article>I am an article</article>
      </FullHeight>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
