import React from 'react';
import { PropTypes } from 'prop-types';
import { mount } from 'enzyme';
import { withContext } from 'recompose';
import withFilterCollectionId from '../index';

describe('withFilterCollectionId', () => {
  const Wrapper = withContext(
    {
      filterCollectionId: PropTypes.string.isRequired,
    },
    ({ myId }) => ({
      filterCollectionId: myId,
    }),
  )(({ children }) => children);
  const MyComponent = () => null;
  const Hoc = withFilterCollectionId(MyComponent);

  it('should get filterCollectionId from context', () => {
    const wrapper = mount(
      <Wrapper myId="myAwesomeId">
        <Hoc />
      </Wrapper>,
    );

    expect(wrapper.find(MyComponent).prop('id')).toBe('myAwesomeId');
  });
});
