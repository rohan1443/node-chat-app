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
  'from' : 'Admin',
  'text' : 'Welcome to the chat app',
  'createdAt': new Date().getTime()
})  

socket.broadcast.emit('newMessage', {
  'from': 'Admin',
  'text': 'New user joined',
  'createdAt': new Date().getTime()
})

  socket.on('createMessage', (message) => {
    console.log('createMessage ', message)
    io.emit('newMessage', {
      'from': message.from,
      'text': message.text,
      'createdAt': new Date().getTime()
    })

    // socket.broadcast.emit('newMessage', {
    //   'from': message.from,
    //   'text': message.text,
    //   'createdAt': new Date().getTime()
    // })
  })

  socket.on('disconnect', function () {
    console.log('User was disconnected')
  })
})

server.listen(port, function () {
  console.log(`Server started on port ${port}`)
})