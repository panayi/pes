import React from 'react';
import { PropTypes } from 'prop-types';
import { mount } from 'enzyme';
import { getContext } from 'recompose';
import FilterCollection from '../index';

describe('FilterCollection', () => {
  const MyComponent = () => null;
  const Hoc = getContext({
    filterCollectionId: PropTypes.string.isRequired,
  })(MyComponent);

  it('should set id to context', () => {
    const wrapper = mount(
      <FilterCollection id="myId">
        <Hoc />
      </FilterCollection>,
    );

    expect(wrapper.find(MyComponent).prop('filterCollectionId')).toBe('myId');
  });
});
