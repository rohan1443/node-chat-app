const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express();
const server = http.createServer(app);  //integrating express with the http server
const io = socketIO(server); //http://localhost:3000/socket.io/socket.io.js

app.use(express.static(publicPath))

//listening to an even on socket
io.on('connection', function (socket) {
  console.log('New User connected')

socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'))  

socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined the chat group'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage ', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('this is form server')
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