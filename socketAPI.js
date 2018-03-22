var socket_io = require('socket.io');
var io = socket_io();
var socketAPI = {};

socketAPI.io = io;

var userNo = 0;

io.on('connection', function(socket){
    
    socket.on('chat message', function(msg){
        
        
        socket.name=msg.name;
        var name = msg.name.replace('>','&gt').replace('<','&lt');
        var text = msg.text.replace('>','&gt').replace('<','&lt');

        console.log(name, text);
        
        socket.broadcast.emit('chat message', {name:name, text:text});
      });
    socket.on('disconnect', function(){
        console.log(socket.name);
        if(socket.name){
            userNo--;
            io.emit('sys message', {msg: socket.name + ' 님이 퇴장하셨습니다.', userNo:userNo});
        }
      });
    socket.on('login',(name)=>{
        userNo++;
        socket.name = name;
        io.emit('sys message',{msg: name+' 님이 입장하셨습니다.',userNo:userNo});
    });
    socket.on('change nick',(obj)=>{
        io.emit('sys message', {msg:obj.origin+' 님의 닉네임이 '+obj.post+'으로 변경 되었습니다.', userNo:userNo});

    });
});

socketAPI.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}


module.exports = socketAPI;