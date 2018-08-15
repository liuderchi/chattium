const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const socketIOAuth = require('socketio-auth');

const port = process.env.PORT || 3000;
const MESSAGES_LIMIT = 100;
const CONNECTION = 'connection';
const DISCONNECT = 'disconnect';
const NEW_MESSAGE = 'new message';
const USER_COUNT = 'user count';
const messages = [];
let numUsers = 0;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'client/build')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/messages', (req, res) => res.send(messages));

io.on(CONNECTION, socket => {
  console.log('connected');
  ++numUsers;
  io.emit(USER_COUNT, { numUsers });
  console.log('user count:', numUsers);

  socket.on(NEW_MESSAGE, message => {
    console.log(`${NEW_MESSAGE}: ${JSON.stringify(message)}`);
    const timestamp = new Date().getTime();

    messages.push({ ...message, timestamp });
    if (messages.length > MESSAGES_LIMIT) messages.shift();

    io.emit(NEW_MESSAGE, { ...message, timestamp });
  });

  socket.on(DISCONNECT, () => {
    console.log('disconnect');
    --numUsers;
    io.emit(USER_COUNT, { numUsers });
    console.log('user count:', numUsers);
  });
});

socketIOAuth(io, {
  authenticate: function(socket, data, callback) {
    let authResult = false;
    try {
      const { username, password } = data;
      console.warn(`auth data: ${username} ${password}`);
      authResult = username === 'Derek' && password === 'secret';
    } catch (e) {
      console.error(e);
      authResult = false;
    } finally {
      callback(null, authResult);
    }
  },
  timeout: 'none',
});

server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
