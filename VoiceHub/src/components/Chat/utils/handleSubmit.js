import { handleAudio } from "./handleAudio";
import { handleFiles } from "./handleFiles";


export async function handleSubmit(e, messages, message, userLogged, audio, files, setAudio, setMessage, setFiles, socket, chatId) {
    e.preventDefault();
    if (!messages) {
      setMessage([
        {
          user: userLogged[0].id,
          content: message,
        },
      ]);
    }
    let audioResponse;
    let filesResponse = [];
    if (audio) {
      audioResponse = await handleAudio({audio});
    }
    if (files[0]) {
      filesResponse = await handleFiles({files})
    }
    const messageData = {
      content: message || null,
      images: filesResponse[0] && filesResponse.filter(file => file.data.resource_type === 'image').map(f => {
        return {url: f.data.public_id}
    }) || filesResponse.data && [{url: filesResponse.data.public_id}] || null,
      audio: audioResponse && audioResponse.data.public_id || null,
      user_id: userLogged[0].id,
      chat_id: chatId * 1,
    };
    socket.emit("message", messageData);
    setAudio(null);
    setFiles([]);
    setMessage("");
  }