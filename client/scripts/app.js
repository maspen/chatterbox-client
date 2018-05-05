var app = {
  init: function() {
    console.log('init() called');
    this.server = 'http://parse.sfm8.hackreactor.com/';
    this.friends = {};
//<input type="text" name="message" id="message"/>
//<input type="submit" name="submit" class="submit"/>
    // this.submitTrigger = $('#send .submit').on('submit', function() {
    //   app.handleSubmit($('#message').val());
// debugger;
// this.submitTrigger = 
    // $('#send .submit').on('submit', function() {
    //   app.handleSubmit($('#send #message').val());
    // });
    this.button = $('#send .submit').submit(function(event) {
      app.handleSubmit($('#send #message').val());
    });
    // need to toggle spinner 'off'
    $( "#spinner" ).toggle();
  },
  // $('#send .submit').submit(function() {
  //     app.handleSubmit($('#send #message').val());
  //   }),
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
    var msgTagDiv = $('<div>');
    msgTagDiv.addClass('username');
    msgTagDiv.attr('data-username', `${message.username}`);
    msgTagDiv.html(message.text);

    msgTagDiv.on('click', function() {
      app.handleUsernameClick($(this));
    });
    
    $('#chats').append(msgTagDiv);
  },
  renderRoom: function(room) {
    $('#roomSelect').append('<option value=\"' + room + '\">' + room + '</option>');
  },
  handleUsernameClick: function(domObject) {
    // what else should happen when an user is clicked?
    var userName = domObject.attr('data-username');
    this.friends[userName] = userName;
  },
  handleSubmit: function(message) {
    // 0. toggle class="spinner" to 'on' - when page loads
    //    its toggled 'off'
    $('.spinner').toggle();
    // 1. need to contact the server and send the message
    // 2. when response comes back as 'ok', add message text
    //    and author to div id="chats"
    // 3. toggle spinner 'off'
    $('.spinner').toggle();
    console.log(message);    
  }
};
