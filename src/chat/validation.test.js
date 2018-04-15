const { isRealString  } = require('./validation');

describe('isRealString', () => {
   test('rejects non-string values', () => {
      const res = isRealString(98);
      expect(res).toBe(false);
   });

   test('rejects string with only spaces', () => {
      const res = isRealString('    ');
      expect(res).toBe(false);
   });

   test('allows string with non-space characters', () => {
      const res = isRealString('  John  ');
      expect(res).toBe(true);
   });
});