const { Message, Chat, Image, Audio, Video, User } = require("../db");

const handleMessageEvent = (io, socket) => {
    socket.on('message', async (messageData) => {
        console.log(`Mensaje recibido en el evento message: ${messageData.content && messageData.content || messageData.audio && messageData.images && 'multimedia' || messageData.audio && 'audio'} chat_id: ${messageData.chat_id}`);
        io.to(messageData.chat_id).emit('message', {messageData, id: messageData.user_id});
        try {
            const { content, images, video, audio, user_id, chat_id } = messageData;
        
            const message = await Message.create({
              content
            });
        
            if (images) {
              images.map(async i => {
                const image = await Image.create({
                  url: i.url
                })
                await message.addImage(image)
              });
            };
            if (video) {
                const video_ = await Video.create({
                  url: video
                })
                await message.addVideo(video_);
            };
            if (audio) {
              const audio_ = await Audio.create({
                url: audio
              })
              await message.setAudio(audio_)
            };
        
            const chat = await Chat.findOne({
              where: {
                id: chat_id
              }
            })

            const user = await User.findOne({
              where: {
                id: user_id
              }
            })
        
            await chat.addMessage(message);
            await user.addMessage(message);
        
          } catch (error) {
            console.log(error)
          }
    });
  };
  
  module.exports = handleMessageEvent;