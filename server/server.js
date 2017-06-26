const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express();
const server = http.createServer(app);  //integrating express with the http server
const io = socketIO(server); //http://localhost:3000/socket.io/socket.io.js

app.use(express.static(publicPath))

//listening to an even on socket
io.on('connection', function (socket) {
  console.log('New User connected')

  socket.emit('newMessage', {
    'from': 'kaju@example.com',
    'text': 'lets plan out something',
    'createdAt': 1234
  })

socket.on('createMessage', (message) => {
  console.log('createMessage ', message)
})
  
  socket.on('disconnect', function () {
    console.log('User was disconnected')
  })
})

server.listen(port, function () {
  console.log(`Server started on port ${port}`)
})