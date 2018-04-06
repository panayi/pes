import reducer from '../reducer';
import * as types from '../types';

describe('filterCollection', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({ query: {} });
    });

    it('should handle SET_QUERY', () => {
      expect(
        reducer(
          {},
          {
            type: types.SET_QUERY,
            payload: {
              id: 'foo',
              value: 'bar',
            },
          },
        ),
      ).toEqual({ query: { foo: 'bar' } });
    });
  });
});
