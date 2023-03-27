const { Server } = require('socket.io');
const handlePeerConnection = require('./events/handlePeerConnection');
const handleJoinChat = require('./events/joinChatEvent');
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
      console.log(`El cliente se ha desconectado: ${socket.id}`);
    });
    
    handleMessageEvent(io, socket);
    handleChatCreation(io, socket);
    handleJoinChat(io, socket);
    handlePeerConnection(io, socket);
  });
};

module.exports = socket;