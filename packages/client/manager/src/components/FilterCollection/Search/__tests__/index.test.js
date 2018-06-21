import React from 'react';
import { PropTypes } from 'prop-types';
import { withContext } from 'recompose';
import SearchInput from '../../SearchInput';
import Search from '../index';

describe('FilterCollection', () => {
  describe('Search', () => {
    const Wrapper = withContext(
      {
        filterCollectionId: PropTypes.string.isRequired,
      },
      ({ myId }) => ({
        filterCollectionId: myId,
      }),
    )(({ children }) => children);

    it('should render correctly', () => {
      const { component } = withMockStore(
        <Wrapper myId="myAwesomeId">
          <Search />
        </Wrapper>,
      );
      const wrapper = mount(component);
      expect(wrapper).toMatchSnapshot();
    });

    it('should get query from redux state', () => {
      const state = {
        filterCollection: {
          query: {
            myAwesomeId: 'myAwesomeQuery',
          },
        },
      };
      const { component } = withMockStore(
        <Wrapper myId="myAwesomeId">
          <Search />
        </Wrapper>,
        state,
      );
      const wrapper = mount(component);
      expect(wrapper.find(SearchInput).prop('value')).toEqual('myAwesomeQuery');
    });

    it('should handle onChange and call setQuery action', () => {
      const onChangeSpy = jest.fn();
      const { component, store } = withMockStore(
        <Wrapper myId="myAwesomeId">
          <Search onChange={onChangeSpy} />
        </Wrapper>,
      );
      const wrapper = mount(component);

      const event = { target: { name: 'query', value: 'myAwesomeQuery' } };
      wrapper.find('input').simulate('change', event);

      expect(onChangeSpy.mock.calls).toHaveLength(1);
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
