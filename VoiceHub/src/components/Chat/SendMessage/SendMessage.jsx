import React from "react";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../../redux/reducers/userReducer";
import SendAudio from "../../Upload/Audio/SendAudio";
import { handleSubmit } from "../utils/handleSubmit";

export default function SendMessage({ messages, message, audio, files, setAudio, setMessages, setMessage, setFiles, socket, chatId }) {

    const userLogged = useSelector(getUserLogged);

  return (
    <>
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            messages,
            message,
            userLogged,
            audio,
            files,
            setAudio,
            setMessage,
            setFiles,
            socket,
            chatId
          )
        }
        className="flex align-middle justify-center"
      >
        <input
          className="w-full bg-slate-400 p-2 focus:outline-none"
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*,video/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="hidden"
        />
        <label
          htmlFor="file"
          className="flex flex-wrap justify-center items-center h-12 w-12 bg-purple-700 hover:bg-ten-percent text-white text-sm font-bold py-2 px-4 rounded cursor-pointer"
        >
          Media
        </label>
        {files.length && (
          <button
            className="p-2 bg-purple-600 text-white"
            onClick={() => setFiles([])}
          >
            Delete files
          </button>
        )}
        {(message.length && !audio) || (files[0] && !audio) ? (
          <button className="p-2 bg-ten-percent text-white">Send</button>
        ) : (
          <SendAudio setAudio={setAudio} audio={audio} />
        )}
        {audio && (
          <button className="p-2 bg-ten-percent text-white">Send</button>
        )}
      </form>
    </>
  );
}
