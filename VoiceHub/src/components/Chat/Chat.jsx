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

  // useEffect(() => {
  //   peer.on("call", (call) => {
  //     navigator.mediaDevices
  //       .getUserMedia({ audio: true })
  //       .then((mediaStream) => {
  //         // Agrega solo el audio entrante a un nuevo MediaStream
  //         setIncomingCall(call)
  //         const incomingAudioStream = new MediaStream();
  //         call.on("stream", (remoteStream) => {
  //           remoteStream.getAudioTracks().forEach((track) => {
  //             incomingAudioStream.addTrack(track);
  //           });
  //         });

          
  //         // Reproduce el audio entrante en el altavoz
  //         const audioElement = new Audio();
  //         audioElement.srcObject = incomingAudioStream;
  //         audioElement.play();
          
  //         setMediaStream(incomingAudioStream)
  //         // Pide permisos para el micrófono y responde a la llamada
  //         console.log('llamda ??');
  //         // Maneja el evento de cierre de la llamada
  //         call.on("close", (answer) => {
  //           console.log('llamada cerrada');
  //           answer.close();
  //           setIncomingCall(null)
  //           // Detiene la reproducción del audio entrante
  //           // audioElement.pause()
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error al obtener permisos del micrófono", error);
  //       });
  //   });

  //   peer.on('close', () => {
  //     console.log('closeeed')
  //   })

  // }, [peer, incomingCall]);

  useEffect(() => {
    socket.on("usersRoom", (users) =>{
      setPeers(users)
      console.log(peers)
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
            });
          });
          if (dbMessages.length) {
            setMessages(dbMessages);
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
        <div className="flex flex-row">
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
