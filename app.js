let users = [];
const getUser = (chatName) => {
  return users.find((user) => {
    return user === chatName;
  });
};
const handleJoin = (socket, clientData)=>{
    socket.name = clientData.chatName;
    socket.room = clientData.roomName;
    if (getUser(clientData.chatName) === clientData.chatName) {
        socket.emit(
          "nameexists",
          "chatname already in use, please use a different chatname"
        );
      } else {
        users.push(clientData.chatName);
    // use the room property to create a room
    socket.join(clientData.roomName);
    console.log(`${socket.name} has joined ${clientData.roomName}`);
    // send message to joining client
    socket.emit(
    "welcome",{
    text:`Welcome ${socket.name} to the ${clientData.roomName} room`,
    users:users
    });
    socket
    .to(clientData.roomName)
    .emit("someonejoined", {text:`${socket.name} has joined room ${clientData.roomName}`});
      }
   
};
const handleDisconnect = (socket)=>{
    // use the room property to create a room
    users.filter(user=>user!=socket.name );
    console.log(`${socket.name} has left ${socket.room}`);
    // send message to joining client
    socket.to(socket.room).emit(
    "someoneleft",{
    text:`${socket.name} has left ${socket.room}`,
    users:users
    });
   
};
module.exports = { handleJoin, handleDisconnect };