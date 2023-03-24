import axios from "axios";

const { VITE_POST_MEDIA_PRESET, VITE_CLOUD_NAME } = import.meta.env;

export async function handleAudio({ audio }) {
    console.log(audio)
    const uploadData = new FormData();
    uploadData.append('file', audio);
    uploadData.append('upload_preset', VITE_POST_MEDIA_PRESET);
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/upload`, uploadData);
    return response;
    // try {
    //     console.log(response)
    //     const audio = response.data.public_id;
    //     const messageData = {
    //       audio,
    //       user_id: userLogged[0].id,
    //       chat_id: chatId * 1,
    //     };
    //     socket.emit("message", messageData);
    //     setMessage("");
    //     setAudio(null);
    // } catch (error) {
    //     console.log(error)
    // }
}