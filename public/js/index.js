var socket = io();

socket.on('connect', function () {
  console.log('connected to the server')

  // socket.emit('createMessage', {
  //   'from': 'Rohan',
  //   'text': 'Hi all...wats up!!'
  // }, function(data) {
  //   console.log('Got It', data)
  // })
})

socket.on('disconnect', function () {
  console.log('disconnected from the server')
})

socket.on('newMessage', function (message) {
  console.log('new Message', message)

  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}` )

  jQuery('#messages').append(li)
})

$('#message-form').on('submit', function(e) {
  e.preventDefault()

  socket.emit('createMessage', {
  'from': 'User',
  'text': jQuery('input[name=message]').val()   
  }, function(ackServer) {
    console.log(ackServer)
  })
})


