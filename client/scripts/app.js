var app = {
  init: function() {
    this.server = 'http://parse.sfm8.hackreactor.com/';
    this.friends = {};
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (message) {
        console.log('chatterbox: Message sent');
      },
      error: function (message) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', message);
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: this.server,
      type: 'GET',
      //data: JSON.stringify(message),
      contentType: 'application/json',
      data: {
        format: 'json'
      },
      success: function (data) {
        console.log('chatterbox: Message sent received from GET', data);
        return data;
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send GET');
        return null;
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
          // username: 'Mel Brooks',
          // text: 'I didn\'t get a harumph outa that guy.!',
          // roomname: 'lobby'
    // var messageTag = $('<div class=\"' + message.username + '\">' + message.text + '</div>');
    // messageTag.on( "click", this.handleUsernameClick );
// debugger;    
    // $('#chats').append($.parseHTML('<div class=\"' + message.username + '\">' + message.text + '</div>'))
    //   .on( "click", this.handleUsernameClick );

    // $('#chats').append(messageTag);
    // var messageTag = '<div class=\"' + message.username + '\">' + message.text + '</div>';

    // $('#chats').append(messageTag);
    // $('.' + message.username).on('click', app.handleUsernameClick);
// debugger;
    var msgTagDiv = $('<div>');
    msgTagDiv.addClass(message.username);
    msgTagDiv.html(message.text);
    msgTagDiv.click(function(){
      this.handleUsernameClick();
    });
    
    $('#chats').append(msgTagDiv);
    
  },
  renderRoom: function(room) {
    $('#roomSelect').append('<option value=\"' + room + '\">' + room + '</option>');
  },
  handleUsernameClick: function() {
    
  },
  handleSubmit: function() {

  }
};
