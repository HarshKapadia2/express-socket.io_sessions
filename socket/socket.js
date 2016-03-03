'use strict';
/**
*Module Dependencies
*/
//-----------------------------------------------------------------------------
var
  UserModel = require('../models/users'),
  io = require('socket.io')();
//=============================================================================
/**
*Module variables
*/
//-----------------------------------------------------------------------------
var userSockets = {};
//=============================================================================
/**
*Config socket connection
*/
//-----------------------------------------------------------------------------
io.on('connection', function (socket) {
  console.log('A client has connected');
  //store '_id' of connected user in order to access it easily
  var ID = socket.request.session.passport.user;
  //store actual socket of connected user in order to access it easily
  //from other modules e.g. from router
  userSockets[ID] = socket;
  UserModel.findOne({_id: ID}, function (err, user) {
    if(err) {
      console.error(err);
      throw(err);
    }
    var data = {
      firstName: user.firstName,
      lastName: user.lastName
    };
    return socket.emit('welcome', data);
  });
  //on disconnect
  socket.on('disconnect', function () {
    delete userSockets[ID];
    return console.log('The client has disconnected');
  });
});
//=============================================================================
/**
*Export module
*/
//-----------------------------------------------------------------------------
module.exports = {
  io: io,
  userSockets: userSockets
};
//=============================================================================
