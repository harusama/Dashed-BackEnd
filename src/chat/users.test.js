const { Users } = require('./users');

describe('Users', () => {
   let users;

   beforeEach(() => {
      users = new Users();

      users.users = [{
         id: '1',
         name: 'Johny',
         room: 'Room 1'
      }, {
         id: '2',
         name: 'Jehn',
         room: 'Room 2'
      }, {
         id: '3',
         name: 'Julie',
         room: 'Room 1'
      }];
   });

   test('adds a new user', () => {
      const users = new Users();
      const user = {
         id: 123,
         name: 'John',
         room: 'Test'
      };

      const resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
   });

   test('removes a user', () => {
      const userId = '1';
      const user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
   });

   test('not remove a user', () => {
      const userId = '11';
      const user = users.removeUser(userId);

      expect(user).not.toBeDefined();
      expect(users.users.length).toBe(3);
   });

   test('finds a user', () => {
      const userId = '2';
      const user = users.getUser(userId);

      expect(user.id).toBe(userId);
   });

   test('not find a user', () => {
      const userId = '22';
      const user = users.getUser(userId);

      expect(user).not.toBeDefined();
   });

   test('returns names for Room 1', () => {
      const userList = users.getUserList('Room 1');
      expect(userList).toEqual(['Johny', 'Julie']);
   });

   test('returns names for Room 2', () => {
      const userList = users.getUserList('Room 2');
      expect(userList).toEqual(['Jehn']);
   });
});