import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";
const { VITE_PORT } = import.meta.env;

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

  const myRef = useRef()  

  function handleSubmit(e) {
    e.preventDefault();
    if (!messages) {
      setMessages([
        {
          user: userLogged[0].id,
          content: message,
        },
      ]);
    }
    const messageData = {
      content: message,
      user_id: userLogged[0].id,
      chat_id: chatId * 1,
    };
    socket.emit("message", messageData);
    setMessage("");
  }

  useEffect(() => {
    myRef.current.scrollTop = myRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    function receiveMessage(message) {
      setMessages([
        ...messages,
        {
          user: message.id,
          content: message.messageData.content,
        },
      ]);
    }
    if (messages && !messages[0]) {
      axios
        .get(`http://localhost:${VITE_PORT}/chats/getChatById?id=1`)
        .then((r) => {
          let dbMessages = [];
          setChat(r.data);
          r.data.Messages.map((m) => {
            dbMessages.push({
              user: m.UserId,
              content: m.content,
              id: m.id,
            });
          });
          if (dbMessages.length) {
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

  
  return (
    <div className="flex flex-col justify-center align-middle bg-sixty-percent h-screen p-10 gap-5">
      <div className="flex gap-1 text-white">
        You are in the <span className="font-black">{chat.name}</span> room
      </div>
      <h1 className="text-slate-600">
        Chat with{" "}
        <span className="text-ten-percent">
          {chat.Users && chat.Users.filter(u => u.id !== userLogged[0].id)[0].username}
        </span>
      </h1>
      <div ref={myRef} className="bg-sixty-percent-variant flex flex-col justify-between p-6 overflow-y-auto max-h-96">
        {console.log(messages)}
        {(messages &&
          messages.sort((a,b) => a.id - b.id).map((m, index) => {
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
                <p className="text-white break-words">{m.content}</p>
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
        <button className="p-2 bg-ten-percent text-white">Send</button>
      </form>
    </div>
  );
}
