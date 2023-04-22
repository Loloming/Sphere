import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";

export default function Audio({ public_id, audio }) {
  const { VITE_CLOUD_NAME } = import.meta.env;

  const waveformRef = useRef();
  const [waveForm, setWaveform] = useState();
  const [playing, setPlaying] = useState(false);

  const url = public_id ? `http://res.cloudinary.com/${VITE_CLOUD_NAME}/video/upload/v1/${public_id}.ogg` : audio;

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        scrollParent: false,
        barWidth: 2,
        barHeight: 1,
        // height: 100,
        responsive: true,
        waveColor: "#a3f",
        cursorColor: "#0000"
      });
      setWaveform(wavesurfer);
      wavesurfer.load(url);
      return () => wavesurfer.destroy();
    }
  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(remainingSeconds).padStart(2, '0');
  
    return `${minutesString}:${secondsString}`;
  } // en caso de querer agregar tiempo a los audios se usa formatTime(waveForm.backend.getDuration())

  return (
    <div className="w-fit flex flex-row items-center h-10 bg-violet-900 rounded-2xl py-4 overflow-hidden">
      {playing ? (
        <FaStopCircle
          className="text-ten-percent m-0 cursor-pointer"
          size={36}
          onClick={() => {
            waveForm.pause();
            setPlaying(!playing);
          }}
        />
      ) : (
        <FaPlayCircle
          className="text-ten-percent m-0 cursor-pointer"
          size={36}
          onClick={() => {
            waveForm.play();
            setPlaying(!playing);
          }}
        />
      )}
      <div ref={waveformRef} className="w-28 relative"></div>
    </div>
  );
}
