const { Chat } = require("../db");

const handleChatCreation = async (io, socket) => {
    socket.on('newChat', async (chatData) => {
    try {
      const { users, name } = chatData;
      const chat = await Chat.create({
        name,
      });

      if (users) {
        users.map(async u => {
          const user = await User.findOne({
            where: {
              id: u.id
            }
          })
          await user.addChat(chat)
        });
      };
  
      console.log(`Chat creado con éxito: ${chat.name}`);
  
      socket.join(chat.id); // agregar el socket a la habitación del chat
  
      io.emit('chatCreated', { chat, roomId: chat.id }); // emitir el evento de chat con el ID de la habitación
    } catch (error) {
      console.error('Error al crear el chat:', error);
    }
  });
}

module.exports = handleChatCreation;