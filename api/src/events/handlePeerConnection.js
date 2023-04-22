const handlePeerConnection = (io, socket) => {
  socket.on("peerConnected", (id) => {
    console.log('peerId', id)
    socket.emit("peerConnection", id);
  });
};

module.exports = handlePeerConnection;
