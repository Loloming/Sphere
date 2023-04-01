const { Server } = require('socket.io');
const handleCall = require('./events/handleCall');
const handlePeerConnection = require('./events/handlePeerConnection');
const { handleJoinChat, users } = require('./events/joinChatEvent');
const handleMessageEvent = require('./events/messageEvent');
const handleChatCreation = require('./events/newChatEvent');

const socket = (server) => {
    const io = new Server(server, {
        cors: {
          origin: '*'
        }
      });

  io.on('connection', (socket) => {

    socket.on('disconnect', () => {
      let room;
      for (let key in users) {
        if (users[key].socketId === socket.id) {
          room = users[key].roomId
          delete users[key];
          break;
        }
      }
      socket.to(room).emit("usersRoom", users);
      console.log(`El cliente se ha desconectado: ${socket.id}`);
      console.log(users)
    });
    
    handleMessageEvent(io, socket);
    handleChatCreation(io, socket);
    handleJoinChat(io, socket);
    handlePeerConnection(io, socket);
    handleCall(io, socket);
  });
};

module.exports = socket;