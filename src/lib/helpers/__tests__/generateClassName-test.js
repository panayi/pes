import generateClassName from '../generateClassName';

describe('generateClassName', () => {
  it('should return a string', () => {
    expect(typeof generateClassName()).toBe('string');
  });
});
