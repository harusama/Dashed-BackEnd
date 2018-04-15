const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
   test('generates correct message object', () => {
      const from = 'John';
      const text = 'Hello world!';
      const message = generateMessage(from, text);

      expect(typeof message.createdAt).toBe('number');
      expect(message).toMatchObject({ from, text });
   });
});

describe('generateLocationMessage', () => {
   test('generates correct location message object', () => {
      const from = 'John';
      const latitude = 15;
      const longitude = 29;
      const url = `https://www.google.com/maps?q=15,29`;
      const message = generateLocationMessage (from, latitude, longitude);

      expect(typeof message.createdAt).toBe('number');
      expect(message).toMatchObject({ from, url });
   });
});