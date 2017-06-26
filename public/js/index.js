var socket = io();

socket.on('connect', function () {
  console.log('connected to the server')

  // socket.emit('createMessage', {
  //   'from': 'Rohan',
  //   'text': 'Hi all...wats up!!'
  // })
})

socket.on('disconnect', function () {
  console.log('disconnected from the server')
})

socket.on('newMessage', function (message) {
  console.log('new Message', message)
})


