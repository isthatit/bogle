
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
    document.cookie = "username="+username+";";
}
var username = {
    name : getUserName(),
    getName : function(){
        $("#nickName").val(this.name);
        return this.name;
    },
    setName : function(tmpName){
        this.name = tmpName;
        $("#nickName").val(this.name);
        setUserName(this.name);
    }
}

function socketSetting(socket){
    socket.emit('login', username.getName());
    $('form').submit(function(){
        
        var text = $("#msg").val();
        var name = username.getName();
        var msg = {name: name, text:text}
        socket.emit('chat message', msg);
        $('#messages').append($('<div class="msg">').text(text));
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
       $('#messages').append($('<div class="othermsg"> ').text(msg)); //+msg+'</span>'));
       $("#messageArea").scrollTop($("#messageArea")[0].scrollHeight);
    });
    socket.on('sys message', function(msg){
        console.log(msg);
       $('#messages').append($('<div class="sys">').text(msg));
       $("#messageArea").scrollTop($("#messageArea")[0].scrollHeight);

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