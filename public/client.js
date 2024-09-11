  
  
$(document).ready(function () {
  let socket = io();
  let currentUserId = $('#welcome').data('userid'); // Assuming user ID is passed in the Pug template

  // Handle user connection and disconnection
  socket.on('user', data => {
    $('#num-users').text(data.currentUsers + ' users online');
    let message =
      data.username +
      (data.connected ? ' has joined the chat.' : ' has left the chat.');
    console.log("User status update:", message);
    $('#messages').append($('<li>').html('<b>' + message + '</b>'));
  });

  // Send and display chat messages
  socket.on('chat message', data => {
    console.log("Received message:", data);

    // Determine message class based on whether the message is from the current user
    const messageClass = data.userId === currentUserId ? 'leftMessage' : 'rightMessage';

    // Append the message with the appropriate class
    $('#messages').append(
      $('<li>').addClass(messageClass).text(`${data.username}: ${data.message}`)
    );
  });

  // Form submission to send a new message
  $('form').submit(function (event) {
    event.preventDefault(); // Prevent default form submission
    let messageToSend = $('#m').val(); // Capture the message from the input field with id 'm'

    if (messageToSend.trim()) { // Ensure the message is not empty
      socket.emit('chat message', messageToSend);
      console.log('Message sent:', messageToSend);
    }
    
    $('#m').val(''); // Clear the input field
    return false;
  });
});
