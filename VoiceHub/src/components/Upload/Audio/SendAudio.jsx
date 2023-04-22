import React, { useState, useRef } from "react";
import { RiMic2Fill, RiDeleteBin6Fill } from 'react-icons/ri'
import { BsFillStopCircleFill } from 'react-icons/bs'

export default function SendAudio({ setAudio, audio }) {
    
    const { MediaRecorder } = window;
    const { VITE_CLOUD_NAME, VITE_POST_MEDIA_PRESET } = import.meta.env;

    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);

    const startRecording = (e) => {
        e.preventDefault();
        const constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            const chunks = [];

            mediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            setAudio(blob);
            };

            mediaRecorder.start();
            setRecording(true);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const stopRecording = (e) => {
        e.preventDefault();
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        setRecording(false);
        }
    };

  return (
    <div>
      { !audio &&
        <button className="text-teal-50" onClick={recording ? stopRecording : startRecording}>
        {recording ? <BsFillStopCircleFill size={35} className="text-ten-percent"/> : <RiMic2Fill size={35} className="text-ten-percent"/>}
      </button>}

      {
          audio &&
          <button
          onClick={() => {
            setAudio(null)
        }}><RiDeleteBin6Fill size={35} className="text-ten-percent"/></button>
      }
    </div>
  );
}