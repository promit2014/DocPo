var socketIO = require("socket.io");
var connectedSockets = {};
var msgArr = [];

var addSocket = function(serverInstance){

	var io = socketIO.listen(serverInstance);

	io.sockets.on('connection',function(socket){

		socket.on('User-Loggedin',function(data){
			console.log("user logged In : "+data+" with socket id : "+socket.id);
			connectedSockets[socket.id] = {"user":data , "socket":socket} ;
		});

		socket.on('User-Loggedout',function(data){
			console.log("user logged Out :-------------> "+data);
			if(connectedSockets[socket.id] != undefined){
				io.sockets.emit('userDisconnect',connectedSockets[socket.id].user);
			}
			delete connectedSockets[socket.id];
		});

		socket.on('disconnect',function(){
			console.log("user disconnected : "+socket.id);
			if(connectedSockets[socket.id] != undefined){
				io.sockets.emit('userDisconnect',connectedSockets[socket.id].user);
			}
			delete connectedSockets[socket.id];
		});

		socket.on('all-Users',function(){
			io.sockets.emit('userList',Object.keys(connectedSockets).map(function(key) {
				return connectedSockets[key].user;
			}));
		});

		socket.on('newMessage',function(newMsg){
			msgArr.push(newMsg);
			console.log("msgArr ---------> ",msgArr);
			io.sockets.emit('MessageList',msgArr);
		});

		socket.on('getMessages',function(newMsg){
			io.sockets.emit('MessageList',msgArr);
		});

	});
};

module.exports = {
	addSocket:addSocket
}
