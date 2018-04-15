const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const swaggerTools = require('swagger-tools');

const { db } = require('./db');
const models = require('./models');
const swaggerApi = require('./../api/swagger-api');
const controllers = require('./handlers');
const createReqLocals = require('./middleware/create-req-locals');
const swaggerOperationController = require('./middleware/swagger-operation-controller');
const sendControllerResponse = require('./middleware/send-controller-response');
const errorHandler = require('./middleware/error-handler');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const { generateMessage, generateLocationMessage } = require('./chat/message');
const { isRealString } = require('./chat/validation');
const { Users } = require('./chat/users');
const users = new Users();

app.use(cors());
app.use('/v1/docs/db/:password', (req, res, next) => {
   const { password } = req.params;
   console.log(password );
   if (password == '1029') {
      next();
   } else {
      return res.status(200).send({ error: 'Not authorized' });
   }
}, express.static('docs/db'));
app.use(bodyParser.json());
app.use(createReqLocals);

app.locals.db = db;
app.locals.models = models;

swaggerTools.initializeMiddleware(swaggerApi, middleware => {
   app.use(middleware.swaggerMetadata());
   app.use(middleware.swaggerValidator());
   app.use(middleware.swaggerUi());
   app.use(swaggerOperationController({ controllers }));
   app.use(sendControllerResponse);
   app.use(errorHandler);
});

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
         socket.broadcast.to(user.room).emit('newMessageLeft', generateMessage(user.name, message.text, user.color));
         socket.emit('newMessage', generateMessage(user.name, message.text, user.color));
      }
      callback();
   });

   socket.on('createLocationMessage', (coords) => {
      const user = users.getUser(socket.id);

      if (user) {
         io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      }
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

module.exports = { app, server };