import * as actions from '../actions';

describe('filterCollection', () => {
  describe('actions', () => {
    describe('setQuery', () => {
      it('should create SET_QUERY action with correct payload', () => {
        expect(actions.setQuery('foo', 'bar')).toMatchSnapshot();
      });
    });
  });
});
