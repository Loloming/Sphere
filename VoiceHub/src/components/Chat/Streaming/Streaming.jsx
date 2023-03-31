import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { peerInstance } from "../peer";
import { getUserLogged } from "../../../redux/reducers/userReducer";
import socket from "../socket";
import Peer from "peerjs";

export default function Streaming({ peers }) {
  const [onCall, setOnCall] = useState(false);
  const [outgoingCall, setOutgoingCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [mediaStream, setMediaStream] = useState();
  const [peer, setPeer] = useState(peerInstance);
  const userLogged = useSelector(getUserLogged);
  const arrPeers = Object.entries(peers).map(([key, value]) => ({
    key,
    ...value,
  }));
  const otherPeerId =
    arrPeers[0] &&
    arrPeers.filter((user) => user.key !== userLogged[0]?.username)[0];

  useEffect(() => {
    let stream = null; // Guarda una referencia al objeto MediaStream

    peerInstance.on("connection", (conn) => {
      conn.on("data", (data) => {
        if (data.type === "call-ended") {
          // Maneja el evento de cierre de la llamada
          console.log("Llamada cerrada");
          setIncomingCall(null);
          setOnCall(false);

          // Detiene el stream y deja de usar el micrófono
          console.log(mediaStream, stream);
          if (stream || mediaStream) {
            stream ? stream.getTracks().forEach((track) => {
              track.stop();
            }) : mediaStream.getTracks().forEach((track) => {
              track.stop();
            });
          }
        }
      });
    });

    peerInstance.on("call", (call) => {
      console.log("llamadosky");
      setIncomingCall(call);
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((mediaStr) => {
          // Guarda una referencia al objeto MediaStream
          stream = mediaStr;

          // Agrega solo el audio entrante a un nuevo MediaStream
          const incomingAudioStream = new MediaStream();
          call.on("stream", (remoteStream) => {
            remoteStream.getAudioTracks().forEach((track) => {
              incomingAudioStream.addTrack(track);
            });
          });
          call.on("close", () => {
            stream.getTracks().forEach((track) => {
              track.stop();
            });
          });
          // Reproduce el audio entrante en el altavoz
          const audioElement = new Audio();
          audioElement.srcObject = incomingAudioStream;
          audioElement.play();
        })
        .catch((error) => {
          console.error("Error al obtener permisos del micrófono", error);
        });
    });
  }, []);

  function startCall() {
    setOnCall(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((MediaStream) => {
      setMediaStream(MediaStream);
      var call = peer.call(otherPeerId.peerId, MediaStream, {
        metadata: { username: userLogged[0].username },
      });
      setOutgoingCall(call);
      call.on("close", () => {
        console.log("Llamada cerrada desde el lado del emisor");
        setOnCall(false);
        setOutgoingCall(null);
      });
    });
  }

  function handleAnswer() {
    if (incomingCall && !onCall) {
      incomingCall.answer();
      setOnCall(true);
    }
  }

  function handleEndCall() {
    if ((onCall && outgoingCall) || (onCall && incomingCall)) {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      outgoingCall ? outgoingCall.close() : incomingCall.close();
      setOutgoingCall(false);
      setIncomingCall(false);
      setOnCall(false);
      const conn = peerInstance.connect(otherPeerId.peerId);
      conn.on("open", () => {
        conn.send({ type: "call-ended" });
      });
    }
  }

  return (
    <>
      <button
        className={
          !otherPeerId
            ? "bg-slate-700"
            : "bg-ten-percent flex items-center justify-center h-14 w-15 p-0 m-0"
        }
        onClick={incomingCall ? handleAnswer : () => startCall()}
        disabled={!otherPeerId}
      >
        {(incomingCall && "Join stream") ||
          (outgoingCall && "Streaming") ||
          "Start stream"}
      </button>
      {(onCall && outgoingCall && (
        <button className="text-teal-50 m-0" onClick={handleEndCall}>
          End call
        </button>
      )) ||
        (onCall && incomingCall && (
          <button className="text-teal-50 m-0" onClick={handleEndCall}>
            End call
          </button>
        ))}
    </>
  );
}
