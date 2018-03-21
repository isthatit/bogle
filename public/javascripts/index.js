
function getUserName(){
    var cookie_str = document.cookie;
    var cookies = cookie_str.split(";");
    for(var i in cookies){
        
        cookies[i].trim();
        if(cookies[i].indexOf("username=")==0){
            return cookies[i].substring("username=".length, cookies[i].length);

        }
    }
    return null;
}

function setUserName(username){
    document.cookies = "username="+username+";";
    console.log('coockie.done');
}
var username = {
    name : getUserName(),
    getName : function(){
        return this.name;
    },
    setName : function(tmpName){
        this.name = tmpName;
        setUserName(this.name);
    }
}

function socketSetting(socket){
    $('form').submit(function(){
        
        var text = $("#msg").val();
        var name = username.getName();
        var msg = {name: name, text:text}
        socket.emit('chat message', msg);
        $('#messages').append($('<li class="my">').html('<span class="msg">'+text+'</span>'));
        $('#msg').val('');
        $("#sendBtn").attr("disabled", "true");
        $("#sendBtn").removeClass("btn-warning");
        $("#sendBtn").addClass("btn-light");
        $("#messageArea").scrollTop($("#messageArea")[0].scrollHeight);
        
        return false;
    });
    socket.on('chat message', function(msg){
       var audio = new Audio('/sound/bogle.mp3');
       audio.playbackRate = 2.5;
       audio.play();
       $('#messages').append($('<li>').html('<span class="othermsg">'+msg+'</span>'));
    });
    socket.on('sys message', function(msg){
        console.log(msg);
       $('#messages').append($('<li class="sys">').text(msg));

    });

}

$(function () {
   
   
    $("#msg").keyup(function(){
        var textLen = $(this).val().length;
        
        if(textLen > 0){
            $("#sendBtn").removeAttr("disabled");
            
            $("#sendBtn").removeClass("btn-light");
            $("#sendBtn").addClass("btn-warning");
        }else{
            $("#sendBtn").attr("disabled", "true");
            $("#sendBtn").removeClass("btn-warning");
            $("#sendBtn").addClass("btn-light");
        }

    });

    var socket;
    var name = username.getName();
    console.log('name', name);
    if(name == null){
        console.log('hello?');
        $('#myModal').modal();
        $("#input_username").keyup((event) => {
            if (event.keyCode === 13) {
                $("#setUsername").click();
            }
        });
        
        $("#setUsername").on("click",()=>{
            var tmpName = $("#input_username").val();
            if(tmpName.trim().length == 0){
                return false;
            }else{
                username.setName(tmpName);
                socket = io();
                socketSetting(socket);
                $("#myModal").modal('hide');
            }

        });


    }else{
        socket = io();
        socketSetting(socket);
    }
    
});