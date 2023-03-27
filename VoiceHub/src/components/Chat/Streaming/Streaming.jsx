import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { peerInstance } from "../peer";
import { getUserLogged } from "../../../redux/reducers/userReducer";
import socket from "../socket";

export default function Streaming({ chat, peers }) {
  const [remoteStream, setRemoteStream] = useState(null);
  const [peer, setPeer] = useState(peerInstance);
  const userLogged = useSelector(getUserLogged);
  const arrPeers = Object.entries(peers).map(([key, value]) => ({
    key,
    ...value,
  }));
  const otherPeerId =
    arrPeers[0] &&
    arrPeers.filter((user) => user.key !== userLogged[0].username)[0].peerId;

  function startCall() {
    navigator.mediaDevices.getUserMedia({audio: true})
    .then((MediaStream) => {
        peer.call(otherPeerId, MediaStream, {
          metadata: { username: userLogged[0].username },
        });
    })
  }

  return (
    <div
      className="bg-ten-percent flex items-center justify-center h-14 w-15 p-0 m-0"
      onClick={() => startCall()}
    >
      <h3 className="text-teal-50 m-0">Join stream</h3>
      {remoteStream && <video srcObject={remoteStream} autoPlay muted></video>}
    </div>
  );
}
