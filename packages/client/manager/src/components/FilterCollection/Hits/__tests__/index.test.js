import React from 'react';
import { PropTypes } from 'prop-types';
import { BaseHits } from '../index';

describe('FilterCollection', () => {
  describe('BaseHits', () => {
    const defaultProps = {
      hits: [],
      hitComponent: noop,
      itemHeight: 1,
      query: '',
    };

    it('should render hits', () => {
      const hits = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];
      const HitComponent = ({ hit }) => <span>{hit.name}</span>;
      HitComponent.propTypes = {
        hit: PropTypes.shape({}).isRequired,
      };
      const wrapper = mount(
        <BaseHits
          {...defaultProps}
          hits={hits}
          hitComponent={HitComponent}
          itemHeight={20}
          width={100}
          height={100}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render <Nothing /> when hits is empty and query is empty', () => {
      const wrapper = mount(
        <BaseHits {...defaultProps} width={100} height={100} />,
      );
      expect(wrapper.type()).toBe(null);
    });

    it('should render noHits when hits is empty and query is non empty', () => {
      const noResults = () => <span>No Results Found</span>;
      const wrapper = mount(
        <BaseHits
          {...defaultProps}
          noHitsComponent={noResults}
          query="abc"
          width={100}
          height={100}
        />,
      );
      expect(
        wrapper.containsMatchingElement(<span>No Results Found</span>),
      ).toBe(true);
    });
  });
});
