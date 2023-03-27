import React, { useEffect, useRef, Children } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";
import SendAudio from "../Upload/Audio/SendAudio";
import { Audio, Image } from "cloudinary-react";
import { handleAudio } from "./utils/handleAudio";
import { handleFiles } from "./utils/handleFiles";
const { VITE_PORT, VITE_CLOUD_NAME } = import.meta.env;

export default function Chat() {
  const { chatId } = useParams();
  const userLogged = useSelector(getUserLogged);

  const navigate = useNavigate();

  if (
    userLogged[0] &&
    !userLogged[0].Chats.filter((chat) => chat.id === Number(chatId))[0]
  ) {
    navigate("/");
  }

  const socket = io(`http://localhost:${VITE_PORT}`);

  socket.emit("joinChat", chatId * 1);

  const [chat, setChat] = useState({});

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [audio, setAudio] = useState();
  const [files, setFiles] = useState([]);

  const myRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!messages) {
      setMessages([
        {
          user: userLogged[0].id,
          content: message,
        },
      ]);
    }
    let audioResponse;
    let filesResponse = [];
    if (audio) {
      audioResponse = await handleAudio({ audio });
    }
    if (files[0]) {
      filesResponse = await handleFiles({ files });
    }
    const messageData = {
      content: message || null,
      images:
        (filesResponse[0] &&
          filesResponse
            .filter((file) => file.data.resource_type === "image")
            .map((f) => {
              return { url: f.data.public_id };
            })) ||
        (filesResponse.data && [{ url: filesResponse.data.public_id }]) ||
        null,
      audio: (audioResponse && audioResponse.data.public_id) || null,
      user_id: userLogged[0].id,
      chat_id: chatId * 1,
    };
    socket.emit("message", messageData);
    setAudio(null);
    setFiles([]);
    setMessage("");
  }

  useEffect(() => {
    function receiveMessage(message) {
      setMessages([
        ...messages,
        {
          user: message.id,
          content: message.messageData.content,
          audio:
            message.messageData.audio ||
            (message.messageData.Audio && message.messageData.Audio.url) ||
            null,
          images: message.messageData.images || null,
        },
      ]);
    }
    if (messages && !messages[0]) {
      axios
        .get(`http://localhost:3001/chats/getChatById?id=${chatId * 1}`)
        .then((r) => {
          let dbMessages = [];
          setChat(r.data);
          r.data.Messages.map((m) => {
            dbMessages.push({
              user: m.UserId,
              content: m.content,
              audio: m.audio || (m.Audio && m.Audio.url) || null,
              images: m.images || m.Images,
            });
          });
          if (dbMessages.length) {
            console.log(dbMessages);
            setMessages(dbMessages);
          } else {
            setMessages(null);
          }
        });
    }
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  useEffect(() => {
    myRef.current.scrollTop = myRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col justify-center align-middle bg-sixty-percent h-screen p-10 gap-5">
      <div className="flex gap-1 text-white">
        You are in the <span className="font-black">{chat.name}</span> room
      </div>
      <h1 className="text-slate-600">
        Chat with{" "}
        <span className="text-ten-percent">
          {userLogged[0] &&
            chat.Users &&
            chat.Users.filter((u) => u.id !== userLogged[0].id)[0].username}
        </span>
      </h1>
      <div
        ref={myRef}
        className="bg-sixty-percent-variant flex flex-col justify-between p-6 overflow-y-auto max-h-96"
      >
        {console.log(messages)}
        {(userLogged[0] &&
          messages &&
          messages
            .sort((a, b) => a.id - b.id)
            .map((m, index) => {
              return (
                <div
                  key={index}
                  className={
                    m.user == userLogged[0].id
                      ? "self-end text-right bg-thirty-percent w-96 m-2 p-2 flex flex-col h-auto rounded"
                      : "text-left bg-sixty-percent w-96 m-2 p-2 rounded"
                  }
                >
                  <p className="text-slate-500 break-words">
                    {chat.Users.filter((u) => m.user === u.id)[0].username}
                  </p>
                  {m.images && (
                    <div className={Children.count > 1 ? "grid grid-cols-3" : "flex w-full justify-end gap-2"}>
                      {m.images.map((image, index) => {
                        return (
                          <Image
                            cloudName={VITE_CLOUD_NAME}
                            publicId={image.url}
                            className="w-44 object-cover"
                            key={index}
                          />
                        );
                      })}
                    </div>
                  )}
                  {m.content && (
                    <p className="text-white break-words">{m.content}</p>
                  )}
                  {m.audio && (
                    <Audio
                      className="h-6 w-40"
                      cloudName={VITE_CLOUD_NAME}
                      publicId={m.audio}
                      controls
                    />
                  )}
                </div>
              );
            })) || <h3>No hay mensajes</h3>}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex align-middle justify-center"
      >
        <input
          className="w-full bg-slate-400 p-2 focus:outline-none"
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*,video/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="hidden"
        />
        <label
          htmlFor="file"
          className="flex flex-wrap justify-center items-center h-12 w-12 bg-purple-700 hover:bg-ten-percent text-white text-sm font-bold py-2 px-4 rounded cursor-pointer"
        >
          Media
        </label>
        {files.length && (
          <button
            className="p-2 bg-purple-600 text-white"
            onClick={() => setFiles([])}
          >
            Delete files
          </button>
        )}
        {(message.length && !audio) || (files[0] && !audio) ? (
          <button className="p-2 bg-ten-percent text-white">Send</button>
        ) : (
          <SendAudio setAudio={setAudio} audio={audio} />
        )}
        {audio && (
          <button className="p-2 bg-ten-percent text-white">Send</button>
        )}
      </form>
    </div>
  );
}
