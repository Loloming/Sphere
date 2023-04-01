const { Chat } = require("../db");

const users = {};

const handleJoinChat = (io, socket) => {
  socket.on("joinChat", ({ roomId, peerId, user }) => {
    console.log(`El socket ${socket.id} se ha unido a la habitación ${roomId}`);
    if (peerId) {
      users[user] = { roomId, peerId };
    }
    socket.emit("usersRoom", users);
    socket.to(roomId).emit("usersRoom", users);
    socket.join(roomId);
    console.log(users);
  });
};

module.exports = handleJoinChat;
