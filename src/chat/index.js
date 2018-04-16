const { generateMessage } = require('./message');
const { isRealString } = require('./validation');
const { Users } = require('./users');
const users = new Users();

module.exports = io => {
   io.on('connection', socket => {
      console.log('New fuck***ng user connected');

      socket.on('join', (params, callback) => {
         if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
         }

         socket.join(params.room);
         users.removeUser(socket.id);
         users.addUser(socket.id, params.name, params.room);

         io.to(params.room).emit('updateUserList', users.getUserList(params.room));
         socket.emit('newMessageCenter', generateMessage('Admin', 'Welcome to the chat app', '#000'));
         socket.broadcast.to(params.room).emit('newMessageCenter', generateMessage('Admin', `${params.name} has joined.`));
         callback();
      });

      socket.on('createMessage', (message, callback) => {
         const user = users.getUser(socket.id);

         if (user && isRealString(message.text)) {
            socket.broadcast.to(user.room).emit('newMessageRight', generateMessage(user.name, message.text, user.color));
            socket.emit('newMessageLeft', generateMessage(user.name, message.text, user.color));
         }
         callback();
      });

      socket.on('disconnect', () => {
         console.log('User was disconnected');
         const user = users.removeUser(socket.id);

         if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessageCenter', generateMessage('Admin', `${user.name} has left.`));
         }
      });
   });
};