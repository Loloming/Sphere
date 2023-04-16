import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";

export default function Audio({ public_id }) {
  const { VITE_CLOUD_NAME } = import.meta.env;

  const waveformRef = useRef();
  const [waveForm, setWaveform] = useState();
  const [playing, setPlaying] = useState(false);

  const url = `http://res.cloudinary.com/${VITE_CLOUD_NAME}/video/upload/v1/${public_id}.ogg`;

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        scrollParent: false,
        barWidth: 3,
        barHeight: 1,
        height: 100,
        // responsive: true,
        waveColor: "#a3f",
        cursorColor: "#0000",
      });
      setWaveform(wavesurfer);
      wavesurfer.load(url);
      return () => wavesurfer.destroy();
    }
  }, []);

  return (
    <div className="w-full flex flex-row items-center h-10 bg-violet-900 rounded-xl p-1 mx-2">
      {playing ? (
        <FaStopCircle
          className="text-ten-percent m-0 cursor-pointer"
          size={30}
          onClick={() => {
            waveForm.pause();
            setPlaying(!playing);
          }}
        />
      ) : (
        <FaPlayCircle
          className="text-ten-percent m-0 cursor-pointer"
          size={30}
          onClick={() => {
            waveForm.play();
            setPlaying(!playing);
          }}
        />
      )}
      <div ref={waveformRef} className="w-full m-0"></div>
    </div>
  );
}
