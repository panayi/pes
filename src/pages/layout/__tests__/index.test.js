import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../index';

it('should render correctly', () => {
  const wrapper = shallow(
    <Layout>
      <span>I am a child</span>
      <span>I am another child</span>
    </Layout>
  );
  expect(wrapper).toMatchSnapshot();
});
