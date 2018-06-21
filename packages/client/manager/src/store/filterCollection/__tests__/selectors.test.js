import * as selectors from '../selectors';

describe('filterCollection', () => {
  describe('selectors', () => {
    describe('hitsSelector', () => {
      const getState = (queryValue = 'foo') => ({
        filterCollection: {
          query: {
            myId: queryValue,
          },
        },
      });
      const searchableAttributes = ['name'];
      const collection = [
        { id: 1, name: 'John' },
        { id: 2, name: 'George' },
        { id: 3, name: 'Christina' },
        { id: 4, name: 'Chris' },
      ];

      it('returns an empty array when searchableAttributes is nil or empty', () => {
        expect(
          selectors.hitsSelector(getState(), {
            searchableAttributes: null,
            collection,
            id: 'myId',
          }),
        ).toEqual([]);
        expect(
          selectors.hitsSelector(getState(), {
            searchableAttributes: [],
            collection,
            id: 'myId',
          }),
        ).toEqual([]);
      });

      it('returns an empty array when collection is nil or empty', () => {
        expect(
          selectors.hitsSelector(getState(), {
            searchableAttributes,
            collection: null,
            id: 'myId',
          }),
        ).toEqual([]);
        expect(
          selectors.hitsSelector(getState(), {
            searchableAttributes,
            collection: [],
            id: 'myId',
          }),
        ).toEqual([]);
      });

      it('returns collection when query is empty', () => {
        expect(
          selectors.hitsSelector(getState(null), {
            searchableAttributes,
            collection,
            id: 'myId',
          }),
        ).toEqual(collection);
        expect(
          selectors.hitsSelector(getState(''), {
            searchableAttributes,
            collection,
            id: 'myId',
          }),
        ).toEqual(collection);
      });

      it('returns items that match query', () => {
        expect(
          selectors.hitsSelector(getState('Chris'), {
            searchableAttributes,
            collection,
            id: 'myId',
          }),
        ).toMatchSnapshot();
      });
    });
  });
});
