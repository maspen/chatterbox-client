var app = {
  init: function() {
    this.server = 'http://parse.sfm8.hackreactor.com';
    this.friends = {};
    this.rooms = {}; // { roomName1:[], roomName2: []} 
    this.button = $('#send .submit').submit(function(event) {
      app.handleSubmit($('#send #message').val());
    });
    // need to toggle spinner 'off'
    $(".spinner").toggle();
    this.fetchDataArray = this.fetch();
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
        // on success, need to add to div #chats
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
/*
  array with elements like:

      Object
      createdAt
      :
      "2017-12-08T20:55:12.526Z"
      objectId
      :
      "hEG6XDGsEE"
      text
      :
      "cat was here"
      updatedAt
      :
      "2017-12-08T20:55:12.526Z"
      username
      :
      "cat"
---------------
      createdAt: "2017-12-08T20:45:55.809Z"
      objectId: "dK4QKTX9zi"
      roomname: "peru"
      text:"yeyeyeyyeyeye012345678910111213"
      updatedAt:"2017-12-08T20:45:55.809Z"
      username:"cat the rat"

*/
        console.log('chatterbox: Message sent received from GET', data);
console.log('chatterbox: Message sent received from GET', data.results);
        return data.results;
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send GET');
        return null;
      }
    });
  },
  parseFetchedMessagArray: function(array) {
    array.forEach(function(message){
      var messageDiv = constructMessageDivForMessage(message);
      if(message.roomname) {
        rooms.roomname.push(div);
      } else {
        rooms['lobby'].push(div);
      }
    });   
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  constructMessageDivForMessage: function(message) {
    var msgTagDiv = $('<div>');
    msgTagDiv.addClass('username');
    msgTagDiv.attr('data-username', `${message.username}`);
    if(message.roomname) {
      msgTagDiv.attr('data-roomname', `${message.roomname}`);
    } else {
      msgTagDiv.attr('data-roomname', 'lobby');
    }
    msgTagDiv.html(message.text);

    msgTagDiv.on('click', function() {
      app.handleUsernameClick($(this));
    });
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
  }
};
