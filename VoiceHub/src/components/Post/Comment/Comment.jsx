import React from "react";
import pp from "../../../assets/default.png";

export default function Comment({ user, content, audio, images }) {
  return (
    <div className="flex flex-row flex-nowrap bg-ten-percent bg-opacity-5 rounded-md w-full items-center">
      <div className="flex flex-col items-center">
        <img
          src={pp}
          className="w-6 mb-0 rounded-full bg-sixty-percent cursor-pointer"
        />
        <p className="text-teal-50 font-normal text-xs cursor-pointer hover:underline">
          {user || "loading..."}
        </p>
      </div>
      <div>
        <p className="text-teal-50 font-normal rounded-xl p-1">{content}</p>
      </div>
    </div>
  );
}
