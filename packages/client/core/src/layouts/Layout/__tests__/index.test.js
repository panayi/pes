import React from 'react';
import Layout from '../Layout';

it('should render correctly', () => {
  const wrapper = shallow(
    <Layout>
      <span>I am a child</span>
      <span>I am another child</span>
    </Layout>,
  );
  expect(wrapper).toMatchSnapshot();
});
