import React, { useEffect, useState } from "react";
import axios from "axios";
import SendAudio from "./Audio/SendAudio";
import { RiH4, RiImageAddLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";
import Audio from "../Audio/Audio";

const { VITE_CLOUD_NAME, VITE_POST_MEDIA_PRESET, VITE_PORT } = import.meta.env;

export default function Upload({ published, setPublished }) {
  const [images, setImages] = useState();
  const [content, setContent] = useState("");
  const [audio, setAudio] = useState();

  const [files, setFiles] = useState([]);

  const userLogged = useSelector(getUserLogged);

  useEffect(() => {
    if (images && audio) {
      setFiles([...images, audio]);
    } else if (images) {
      setFiles([...images]);
    } else if (audio) {
      setFiles([audio]);
    }
  }, [images, audio]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files[0]) {
      const uploadRequests = files.map((file) => {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", VITE_POST_MEDIA_PRESET);
        return axios.post(
          `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/upload`,
          uploadData
        );
      });
      try {
        const responses = await Promise.all(uploadRequests);
        axios.post(`http://localhost:${VITE_PORT}/posts/createPost`, {
          content,
          user_id: userLogged[0].id,
          images:
            responses
              .filter((file) => file.data.resource_type === "image")
              .map((f) => {
                return { url: f.data.public_id };
              }) || null,
          audio:
            responses
              .filter((file) => file.data.resource_type === "video")
              .map((f) => {
                return f.data.public_id;
              })[0] || null,
        });
        setPublished(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(
          `http://localhost:${VITE_PORT}/posts/createPost`,
          {
            content,
            user_id: userLogged[0].id,
          }
        );
        setPublished(true);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="flex flex-col items-center justify-around bg-gradient-to-b from-sixty-percent to-sixty-percent-home shadow-2xl rounded-lg p-2 w-3/4 max-w-screen-md h-72 z-50">
      <div className="flex w-full px-6 items-center justify-between">
        <h1 className="text-white text-left font-bold text-xl">
          Create a new post
        </h1>
        {published ? <h4 className="text-green-600">Succesfully posted!</h4> : <></>}
      </div>
      <div className="w-full flex justify-center px-6">
        <input
          type="text"
          autoComplete="off"
          placeholder="Write something..."
          className="rounded-lg w-full text-gray-100 bg-transparent focus:outline-none h-20 animate-expand"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between px-6">
        <div className="flex gap-5">
          <label htmlFor="file-upload" className="">
            <RiImageAddLine
              size={35}
              className="text-ten-percent cursor-pointer"
            />
          </label>
          <input
            className="appearance-none hidden"
            type="file"
            name="file"
            id="file-upload"
            onChange={(e) => setImages(e.target.files)}
          />
          <SendAudio setAudio={setAudio} audio={audio} />
          {audio && <Audio audio={URL.createObjectURL(audio)} />}
        </div>
        <button
          className={`text-teal-50 px-3 rounded-lg ${
            !images && !content && !audio
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-ten-percent"
          }`}
          disabled={!images && !content && !audio}
          onClick={handleUpload}
        >
          Publish
        </button>
      </div>
    </form>
  );
}
