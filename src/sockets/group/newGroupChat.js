import {pushSocketIdToArray,emitNotifyToArray,removeSocketIdFromArray} from '../../helpers/socketHelpers';


// io form socket.io

let newGroupChat = (io) =>{ 
  let clients = {};
  io.on('connection',(socket) =>{
    clients = pushSocketIdToArray(clients,socket.request.user._doc._id,socket.id);
    //console.log(socket.request.user.chatGroupIds[0]._doc);

    socket.request.user.chatGroupIds.forEach(function(group){
      clients = pushSocketIdToArray(clients,group._doc._id,socket.id);
    });

    socket.on("new-group-created",(data) =>{
      clients = pushSocketIdToArray(clients,data.groupChat._id,socket.id);

      let response = {
        groupChat: data.groupChat
      };

      data.groupChat.members.forEach(member =>{
        if(clients[member.userId] && member.userId != socket.request.user._doc._id){
          emitNotifyToArray(clients, member.userId , io, "response-new-group-created",response);
        }
      });
    });

    socket.on("member-received-group-chat", data =>{
      clients = pushSocketIdToArray(clients,data.groupChatId,socket.id);
    });

    socket.on("disconnect",() =>{
      clients = removeSocketIdFromArray(clients,socket.request.user._doc._id,socket);
      socket.request.user.chatGroupIds.forEach(function(group){
        clients = removeSocketIdFromArray(clients,group._doc._id,socket);
      });
    });

  });
};

module.exports = newGroupChat;