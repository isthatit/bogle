var socket_io = require('socket.io');
var io = socket_io();
var socketAPI = {};

socketAPI.io = io;


io.on('connection', function(socket){
    console.log('A user connected');

    socket.on('chat message', function(msg){
        
        console.log(socket.id);
        socket.name=msg.name;
        var name = msg.name.replace('>','&gt').replace('<','&lt');
        var text = msg.text.replace('>','&gt').replace('<','&lt');

        console.log(name, text);
        
        
        

        socket.broadcast.emit('chat message', name+": "+text);
      });
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('sys message', socket.name + ' 님이 퇴장하셨습니다.');
      });
    socket.on('login',(name)=>{

        io.emit('sys message', name+' 님이 입장하셨습니다.');

    });
});

socketAPI.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}


module.exports = socketAPI;