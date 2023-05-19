import React, { useEffect, useRef } from "react";
import { peerInstance } from "./peer";
import axios from "axios";
import socket from "./socket";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";
import Messages from "./Messages/Messages";
import Info from "./Info/Info";
import SendMessage from "./SendMessage/SendMessage";
import Streaming from "./Streaming/Streaming";

export default function Chat() {
  const { chatId } = useParams();

  const userLogged = useSelector(getUserLogged);

  const navigate = useNavigate();

  const myRef = useRef();

  const [peer, setPeer] = useState(peerInstance);
  const [peers, setPeers] = useState(null);

  const [chat, setChat] = useState({});

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [audio, setAudio] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    socket.on("usersRoom", (users) =>{
      setPeers(users)
    });
    return () => socket.off("usersRoom");
  }, []);

  useEffect(() => {
    if (
      userLogged[0] &&
      !userLogged[0].Chats.filter((chat) => chat.id === Number(chatId))[0]
    ) {
      navigate("/");
    }

    if (
      userLogged[0] &&
      userLogged[0].Chats.filter((chat) => chat.id === Number(chatId))[0]
    ) {
      myRef.current.scrollTop = myRef.current.scrollHeight;
    }

    function receiveMessage(message) {
      setMessages(
        messages
          ? [
              ...messages,
              {
                user: message.id,
                content: message.messageData.content,
                audio:
                  message.messageData.audio ||
                  (message.messageData.Audio &&
                    message.messageData.Audio.url) ||
                  null,
                images: message.messageData.images || null,
              },
            ]
          : [
              {
                user: message.id,
                content: message.messageData.content,
                audio:
                  message.messageData.audio ||
                  (message.messageData.Audio &&
                    message.messageData.Audio.url) ||
                  null,
                images: message.messageData.images || null,
              },
            ]
      );
    }
    if (
      messages &&
      !messages[0] &&
      userLogged[0] &&
      userLogged[0].Chats.filter((chat) => chat.id === Number(chatId))[0]
    ) {
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
              id: m.id
            });
          });
          if (dbMessages.length) {       
            setMessages(dbMessages.sort((a, b) => a.id - b.id));
          } else {
            setMessages(null);
          }
        });
    }
    userLogged[0] &&
      peerInstance &&
      socket.emit("joinChat", {
        roomId: chatId * 1,
        peerId: peer.id,
        user: userLogged[0].username,
      });
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages, userLogged]);

  if (
    userLogged[0] &&
    userLogged[0].Chats.filter((chat) => chat.id === Number(chatId))[0]
  ) {
    return (
      <div className="flex flex-col justify-center align-middle bg-sixty-percent h-screen p-10 gap-5">
        <div className="flex flex-row justify-between">
          <Info chat={chat} />
          {peer && peers && (
            <Streaming
              chat={chat}
              peers={peers}
            />
          )}
        </div>
        <Messages messages={messages} chat={chat} myRef={myRef} />
        <SendMessage
          message={message}
          messages={messages}
          audio={audio}
          files={files}
          setAudio={setAudio}
          setMessage={setMessage}
          setMessages={setMessages}
          setFiles={setFiles}
          socket={socket}
          chatId={chatId}
        />
      </div>
    );
  } else {
    return null;
  }
}
