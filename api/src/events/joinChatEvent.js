const { Chat } = require("../db");

const handleJoinChat = (io, socket) => {
    socket.on('joinChat', (roomId) => {
        console.log(`El socket ${socket.id} se ha unido a la habitación ${roomId}`);
        socket.join(roomId);
      });
}

module.exports = handleJoinChat;