const handleCall = (io, socket) => {
  let usersInCall = {};
  socket.on("call-started", (user) => {
    console.log("Llamada empezada por", user.user);
    usersInCall[user.user] = {
      roomId: user.roomId,
      peerId: user.peerId,
      socketId: socket.id,
    };
    socket.to(user.roomId).emit("call-status", usersInCall);
  });
  socket.on("call-leaved", (user) => {
    for (let key in usersInCall) {
      if (usersInCall[key].socketId === socket.id) {
        room = usersInCall[key].roomId;
        delete usersInCall[key];
        break;
      }
    }
    console.log(`El usuario ${user.user} abandonó la llamada`);
    socket.to(user.roomId).emit("onLeaveCall", usersInCall);
  });
};

module.exports = handleCall;
