import React, { useState, useRef } from "react";


export default function Audio({ setAudio, handleChange }) {
    
    const { MediaRecorder } = window;
    const { VITE_CLOUD_NAME, VITE_POST_MEDIA_PRESET } = import.meta.env;

    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const [audioFile, setAudioFile] = useState(null);

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
            setAudioFile(blob);
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
      <button className="text-teal-50" onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {
          audioFile && <button onClick={() => {
            setAudioFile(null)
            setAudio(null)
        }}>Delete Audio</button>
      }
      {audioFile && (
        <audio src={URL.createObjectURL(audioFile)} controls />
      )}
    </div>
  );
}