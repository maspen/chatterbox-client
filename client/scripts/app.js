var app = {
  init: function() {
    this.server = 'http://parse.sfm8.hackreactor.com';
    this.friends = {};
    this.rooms = { 'lobby':[] }; // { roomName1:[], roomName2: []} 
    this.button = $('#send .submit').submit(function(event) {
      app.handleSubmit($('#send #message').val());
    });
    // need to toggle spinner 'off'
    $(".spinner").toggle();
    this.fetch();
  },
  // $('#send .submit').submit(function() {
  //     app.handleSubmit($('#send #message').val());
  //   }),
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server + '/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (message) {
        // on success, need to add to div #chats AND rooms
        console.log('chatterbox: Message sent');
      },
      error: function (message) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', message);
      }
    });
  },
  // ??? needs to be called when the page loads & populates the 'rooms' pull down
  fetch: function() {
    $.ajax({
      // http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages
      // sfm8
      url: this.server + '/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {

        console.log('chatterbox: Message sent received from GET', data);
console.log('chatterbox: Message sent received from GET', data.results);

        app.parseFetchedMessageArray(data.results);
        app.populatePage('lobby');

        return data.results;
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send GET');
        return null;
      }
    });
  },
  parseFetchedMessageArray: function(array) {
    // clear rooms object
    app.rooms = { 'lobby':[] };

    array.forEach(function(message){
      var messageDiv = app.constructMessageDivForMessage(message);

      if(message.roomname) {
        if(!app.rooms.hasOwnProperty(message.roomname)) {
          app.rooms[message.roomname] = [];
        }
        app.rooms[message.roomname].push(messageDiv);
      } else {
        app.rooms['lobby'].push(messageDiv);
      }
    });   
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  constructMessageDivForMessage: function(message) {
    // var msgTagDiv = $('<div>');
    // msgTagDiv.addClass('username');
    // msgTagDiv.attr('data-username', `${message.username}`);
    // if(message.roomname) {
    //   msgTagDiv.attr('data-roomname', `${message.roomname}`);
    // } else {
    //   msgTagDiv.attr('data-roomname', 'lobby');
    // }
    // msgTagDiv.html('<strong>'+ message.username + '</strong></br>'+ message.text);

    // msgTagDiv.on('click', function() {
    //   app.handleUsernameClick($(this));
    // });
    var $messageContainer = $('<div>').addClass('message');
    var $usernameTag = $('<div>').addClass('username').text(message.username);
    var $messageTag = $('<div>').addClass('message-text').text(message.text);
    $messageContainer.append($usernameTag);
    $messageContainer.append($messageTag);
    // $messageContainer.attr('data-room', `${message.roomname}`)

    $messageContainer.on('click', function() {
      app.handleUsernameClick($(this));
    });

    return $messageContainer;
  },
  renderMessage: function(messageDiv) {
    $('#chats').append(messageDiv);

  // Check the roomname and see if it's a property in this.rooms
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
    //    
    // 2. when response comes back as 'ok', add message text
    //    and author to div id="chats"
    // 3. toggle spinner 'off'
    $('.spinner').toggle();
    console.log(message);    
  },
  populatePage(roomName) {
    // populate Room selections
console.log(Object.keys(app.rooms));
    for(var key in app.rooms) {
      this.renderRoom(key);
    }

    app.rooms['lobby'].forEach(function(tag){
      app.renderMessage(tag);
    })
  }
};
