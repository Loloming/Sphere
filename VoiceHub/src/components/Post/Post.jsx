import React, { useState } from "react";
import pp from "../../assets/default.png";
import { MdAddComment } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { Image } from "cloudinary-react";
import Comments from "./Comments/Comments";
import Audio from "../Audio/Audio";
import { FaShare, FaShareAlt } from "react-icons/fa";

const Post = ({ post }) => {
  const { content, id, Images, Likes, User, createdAt } = post;

  const { VITE_CLOUD_NAME } = import.meta.env;

  const format = createdAt.split("-")[2];

  const form = `${format[0].concat(format[1])}/${createdAt.split("-")[1]}`;

  const [like, setLike] = useState(false);

  const [comment, setComment] = useState(false);

  function liker() {
    setLike(!like);
  }

  function commenter() {
    setComment(!comment);
  }

  return (
    <div
      className="flex flex-row bg-gradient-to-tl from-sixty-percent to-thirty-percent rounded-lg p-4 w-full h-fit my-3"
      key={id}
    >
      {Images[0] && (
        <Image
          cloudName={VITE_CLOUD_NAME}
          publicId={Images[0].url}
          alt="noimg"
          width={"50%"}
          className="rounded-lg mr-2"
        ></Image>
      )}
      <div
        className={
          Images[0]
            ? "w-1/2 h-full flex flex-col items-center justify-between"
            : "w-full h-full flex flex-col items-center"
        }
      >
        <div className="flex flex-row justify-between w-full">
          <img
            src={pp}
            className="w-6 mb-2 rounded-full bg-sixty-percent cursor-pointer"
          />
          <p className="text-white font-thin text-xs cursor-pointer hover:underline">
            {(User && User.username) || "loading..."}
          </p>
          <p className="text-slate-600 text-xs">{form}</p>
        </div>
        {post.Audio && <Audio public_id={post.Audio.url} />}
        {content && (
          <div className="mt-4 rounded-md p-2 flex justify-center">
            <p className="text-slate-400 font-normal w-full text-center">
              {content}
            </p>
          </div>
        )}
        <div className="flex mt-4 gap-12 justify-center">
          <button onClick={() => commenter()}>
            <MdAddComment
              className="text-ten-percent"
              title="Ver todos los comentarios"
              size={25}
            />
          </button>
          {like ? (
            <button onClick={() => liker()}>
              <AiFillLike className="text-ten-percent animate-like" size={25} />
            </button>
          ) : (
            <button onClick={() => liker()}>
              <AiOutlineLike className="text-ten-percent" size={25} />
            </button>
          )}
          <button>
            <FaShare
              className="text-ten-percent"
              title="Ver todos los comentarios"
              size={25}
            />
          </button>
          <button>
            <FaShareAlt
              className="text-ten-percent"
              title="Ver todos los comentarios"
              size={25}
            />
          </button>
        </div>
        <Comments comments={post.Comments} post_id={id} />
      </div>
    </div>
  );
};

export default Post;
