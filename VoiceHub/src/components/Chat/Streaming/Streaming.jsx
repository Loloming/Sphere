import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { peerInstance } from "../peer";
import { getUserLogged } from "../../../redux/reducers/userReducer";
import socket from "../socket";

export default function Streaming({ chat, peers, incomingCall, setIncomingCall, mediaStream }) {
  const [onCall, setOnCall] = useState(false);
  const [peer, setPeer] = useState(peerInstance);
  const userLogged = useSelector(getUserLogged);
  const arrPeers = Object.entries(peers).map(([key, value]) => ({
    key,
    ...value,
  }));
  const otherPeerId =
    arrPeers[0] &&
    arrPeers.filter((user) => user.key !== userLogged[0].username)[0].peerId;

  console.log(otherPeerId)

  function startCall() {
    navigator.mediaDevices.getUserMedia({audio: true})
    .then((MediaStream) => {
        peer.call(otherPeerId, MediaStream, {
          metadata: { username: userLogged[0].username },
        });
    })
  }

  function handleAnswer() {
    if (incomingCall && !onCall) {
        incomingCall.answer();
        setOnCall(true);
      }
  }

  function handleEndCall() {
    if (onCall) {
        incomingCall.close();
        setIncomingCall(false);
        setOnCall(false);
      }
  }

  return (
    <div
      className="bg-ten-percent flex items-center justify-center h-14 w-15 p-0 m-0"
      onClick={incomingCall ? handleAnswer : () => startCall()}
    >
      <h3 className="text-teal-50 m-0">{incomingCall ? 'Join stream' : 'Start stream'}</h3>
      {onCall && <h3 className="text-teal-50 m-0" onClick={handleEndCall}>End call</h3>}
    </div>
  );
}
