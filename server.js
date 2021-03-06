/*ORIGINAL ARTICLE BY AUTHOR: 
https://medium.com/@nohkachi/the-importance-of-documentation-or-how-i-discovered-how-to-share-express-sessions-with-socket-io-d8d2b6bd42e5 */

'use strict';
/**
*Module dependencies
*/
//-----------------------------------------------------------------------------
var
  app = require('./app'),
  io = require('./socket/socket').io,
  http = require('http');
//=============================================================================
/**
*Create server instance
*/
//-----------------------------------------------------------------------------
var server = http.createServer(app);
//=============================================================================
/**
*Module variables
*/
//-----------------------------------------------------------------------------
var
  port = app.get('port'),
  env = app.get('env'),
  host = app.get('host');
//=============================================================================
/**
*Bind socket.io to server
*/
//-----------------------------------------------------------------------------
io.listen(server);
//=============================================================================
/**
*Bind server to port
*/
//-----------------------------------------------------------------------------
server.listen(port, function () {
  return console.log('Socialify server listening on %s at port %d in %s mode', host, port, env);
});
//=============================================================================
/**
*Conditionally export module
*/
//-----------------------------------------------------------------------------
if(require.main != module) {
  module.exports = server;
}
//=============================================================================
