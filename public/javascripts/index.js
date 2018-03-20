
$(function () {
    var socket = io();
    $('form').submit(function(){
        var name = $("#name").val();
        var text = $("#m").val();
        console.log(name, msg);
        var msg = {name: name, text:text}
        socket.emit('chat message', msg);
        $('#messages').append($('<li class="my">').text(text));
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
       var audio = new Audio('/sound/bogle.mp3');
       audio.playbackRate = 2.5;
       audio.play();
       $('#messages').append($('<li>').text(msg));
    });
    socket.on('sys message', function(msg){
        console.log(msg);
       $('#messages').append($('<li class="sys">').text(msg));

    });
});