import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { peerInstance } from "../peer";
import { getUserLogged } from "../../../redux/reducers/userReducer";
import socket from '../socket'

export default function Streaming({ chat, peers }) {
  const [onCall, setOnCall] = useState(false);
  const [outgoingCall, setOutgoingCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  const audioRef = useRef(null); // Se puede usar para mutear el audio del otro usuario posteriormente (audioRef.current.pause())
  const endCallButtonRef = useRef(null);

  const userLogged = useSelector(getUserLogged);
  const arrPeers = Object.entries(peers).map(([key, value]) => ({
    key,
    ...value,
  }));
  const otherPeerId =
    arrPeers[0] &&
    arrPeers.filter((user) => user.key !== userLogged[0]?.username)[0];

  useEffect(() => {
    peerInstance.on("call", (call) => {
      setIncomingCall(call);
    });

    socket.on("onLeaveCall", (usersInCall) => {
      if (Object.entries(usersInCall).length < 2) {
        if (endCallButtonRef.current) {
          endCallButtonRef.current.click();
          console.log("finalizando llamada...");
        }
      }
    });
  }, []);

  function startCall() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setLocalStream(stream);
      const call = peerInstance.call(otherPeerId.peerId, stream, {
        audio: true,
      });
      setOutgoingCall(call);
      setOnCall(true);

      socket.emit("call-started", {
        roomId: chat.id,
        peerId: peerInstance.id,
        user: userLogged[0].username,
      });

      call.on("stream", (incomingStream) => {
        const audioElement = new Audio();
        audioElement.srcObject = incomingStream;
        audioElement.play();
        audioRef.current = audioElement;
      });
      call.on("data", (data) => {
        if (data === "call-ended") {
          console.log("universal!");
          call.close();
        }
      });
      call.on("close", () => {
        stream?.getTracks().forEach((track) => {
          console.log("stream stopped");
          track.stop();
        });
        console.log("llamada finalizada");
        setOutgoingCall(null);
      });
    });
  }

  function handleAnswer() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setLocalStream(stream);
      incomingCall.answer(stream);
      setOnCall(true);
      incomingCall.on("stream", (incomingStream) => {
        const audioElement = new Audio();
        audioElement.srcObject = incomingStream;
        audioElement.pause();
        audioRef.current = audioElement;
      });
      incomingCall.on("close", () => {
        setIncomingCall(null);
      });
    });
  }

  function handleEndCall() {
    console.log("endcall");
    if (incomingCall && localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      incomingCall.close();
      socket.emit("call-leaved", {
        roomId: chat.id,
        peerId: peerInstance.id,
        user: userLogged[0].username,
      });
    }
    if (outgoingCall) {
      outgoingCall.close();
      socket.emit("call-leaved", {
        roomId: chat.id,
        peerId: peerInstance.id,
        user: userLogged[0].username,
      });
    }
  }

  const EndCall = forwardRef((props, ref) => {
    return (
      <button className="text-teal-50 m-0" ref={ref} onClick={handleEndCall}>
        End call
      </button>
    );
  });

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
      {(onCall && outgoingCall && <EndCall ref={endCallButtonRef} />) ||
        (onCall && incomingCall && (
          <button
            className="text-teal-50 m-0"
            ref={endCallButtonRef}
            onClick={handleEndCall}
          >
            End call
          </button>
        ))}
      <button
        onClick={() => console.log(incomingCall, outgoingCall, localStream)}
      >
        Status
      </button>
    </>
  );
}
