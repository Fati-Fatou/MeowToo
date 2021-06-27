const assert = require('assert');

// eslint-disable-next-line no-undef
describe('Array', () => {
  // eslint-disable-next-line no-undef
  describe('#indexOf()', () => {
    // eslint-disable-next-line no-undef
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
