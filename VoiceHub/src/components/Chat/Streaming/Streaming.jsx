import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { peerInstance } from "../peer";
import { getUserLogged } from "../../../redux/reducers/userReducer";
import socket from "../socket";
import { VscCallOutgoing, VscCallIncoming } from "react-icons/vsc";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";

export default function Streaming({ chat, peers }) {
  const [onCall, setOnCall] = useState(false);
  const [outgoingCall, setOutgoingCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [callStatus, setCallStatus] = useState(null);

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
      setOverlay(true);
    });

    socket.on("onLeaveCall", (usersInCall) => {
      console.log('un usuario dejó la llamada')
      if (Object.entries(usersInCall).length < 2) {
        if (endCallButtonRef.current) {
          endCallButtonRef.current.click();
          console.log("finalizando llamada...");
        }
        else {
          setIncomingCall(null);
          setOverlay(false);
        }
      }
    });
    socket.on('get-status', (usersInCall) => setCallStatus(usersInCall))
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
        console.log('call on stream now')
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
        console.log('call on close')
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
        setOverlay(false);
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
      socket.emit("call-left", {
        roomId: chat.id,
        peerId: peerInstance.id,
        user: userLogged[0].username,
      });
      setIncomingCall(null);
    }
    else if (outgoingCall && Object.entries(callStatus).length < 2) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      outgoingCall.close();
      setIncomingCall(null)
      setOutgoingCall(null)
      setOnCall(false)
      socket.emit("call-left", {
        roomId: chat.id,
        peerId: peerInstance.id,
        user: userLogged[0].username,
      });
      
    }
    else if (outgoingCall) {
      console.log('ongoingcall')
      outgoingCall.close();
      socket.emit("call-left", {
        roomId: chat.id,
        peerId: peerInstance.id,
        user: userLogged[0].username,
      });
    }
  }

  const EndCall = forwardRef((props, ref) => {
    return (
      <button
        className="text-teal-50 m-0 bg-red-900 h-12 w-12 aspect-square flex items-center justify-center rounded-xl"
        ref={ref}
        onClick={handleEndCall}
      >
        <HiOutlinePhoneMissedCall size={30} />
      </button>
    );
  });

  const CallModal = () => {
    return (
      <>
        {incomingCall && (
          <>
            {overlay && (
              <div className="absolute inset-0 flex justify-center items-center gap-4">
                <h1 className="text-white relative z-20">
                  You're getting a call
                </h1>
                <button
                  onClick={handleAnswer}
                  className="relative z-20 bg-ten-percent flex items-center justify-center h-12 w-12 m-0 rounded-xl p-2"
                >
                  <VscCallIncoming size={25} />
                </button>
                <button 
                  onClick={handleEndCall}
                  className="relative z-20 bg-red-900 flex items-center justify-center h-12 w-12 m-0 rounded-xl p-2"  
                >
                  <HiOutlinePhoneMissedCall size={25}/>
                </button>
                <div className="absolute inset-0 bg-slate-900 opacity-50 z-10"></div>
              </div>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      {!incomingCall && !outgoingCall && (
        <button
          className={
            !otherPeerId
              ? "bg-slate-700 rounded-xl h-12 w-12 aspect-square flex items-center justify-center"
              : "bg-ten-percent flex items-center justify-center h-12 w-12 p-0 m-0 rounded-xl aspect-square"
          }
          onClick={incomingCall ? handleAnswer : () => startCall()}
          disabled={!otherPeerId}
        >
          <VscCallOutgoing size={30} />
        </button>
      )}
      {incomingCall && (
        <span className="animate-ping absolute inline-flex h-2 w-2 top-64 left-48 rounded-full bg-ten-percent opacity-75"></span>
      )}
      {outgoingCall && (
        <span className="animate-ping absolute inline-flex h-2 w-2 top-64 left-48 rounded-full bg-ten-percent opacity-75"></span>
      )}
      {incomingCall && <CallModal />}
      {(onCall && outgoingCall && <EndCall ref={endCallButtonRef} />) ||
        (onCall && incomingCall && (
          <button
            className="text-teal-50 m-0 bg-red-900 h-12 w-12 aspect-square flex items-center justify-center rounded-xl"
            ref={endCallButtonRef}
            onClick={handleEndCall}
          >
            <HiOutlinePhoneMissedCall size={30} />
          </button>
        ))}
    </>
  );
}
