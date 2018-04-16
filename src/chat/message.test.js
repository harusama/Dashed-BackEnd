const { generateMessage } = require('./message');

describe('generateMessage', () => {
   test('generates correct message object', () => {
      const from = 'John';
      const text = 'Hello world!';
      const message = generateMessage(from, text);

      expect(typeof message.createdAt).toBe('number');
      expect(message).toMatchObject({ from, text });
   });
});