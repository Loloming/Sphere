import React from "react";
import pp from "../../../assets/default.png";

export default function Comment({ user, content, audio, images }) {
  return (
    <div className="flex flex-row flex-nowrap">
      <div className="flex flex-col items-center">
        <img
          src={pp}
          className="w-6 mb-0 rounded-full bg-sixty-percent cursor-pointer"
        />
        <p className="text-white font-thin text-xs cursor-pointer hover:underline">
          {user || "loading..."}
        </p>
      </div>
      <div>
        <p className="bg-ten-percent rounded-xl p-1">{content}</p>
      </div>
    </div>
  );
}
