import React, { useState } from "react";
import pp from "../../assets/default.png";
import { FaPlayCircle } from "react-icons/fa";
import { MdAddComment } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

const Post = ({ post }) => {
  const { Images, content, id, Comments, Likes, createdAt, Videos, Audio } = post;
  console.log(post)

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
    <>
      <div
        className="bg-gradient-to-tl from-sixty-percent to-thirty-percent rounded-lg p-4 w-96"
        key={id}
      >
        <div>
          <div className="flex flex-row gap-2 justify-between">
            <img
              src={pp}
              className="w-6 mb-2 rounded-full bg-sixty-percent cursor-pointer"
            />
            <p className="text-white font-thin text-xs cursor-pointer hover:underline">
              andres.jsx
            </p>
            <p className="text-slate-600 text-xs">{form}</p>
          </div>
          {Images && <img src={Images[0].url} alt="noimg" className="rounded-lg" />}
          <div className="mt-4 rounded-md p-2 flex justify-between">
            <p className="text-slate-400 text-sm w-5/6">{content}</p>
            <button>
              <FaPlayCircle className="text-ten-percent" size={20} />
            </button>
          </div>
          <div className="flex mt-4 gap-7 justify-center">
            <button onClick={() => commenter()}>
              <MdAddComment className="text-ten-percent" size={25} />
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
          </div>
        </div>
        {comment ? (
          <div className="w-full p-4 mt-4 flex gap-4 items-center">
            <img
              src={pp}
              className="w-6 mb-2 rounded-full bg-sixty-percent cursor-pointer"
            />
            <input type="text" className="rounded-lg w-5/6 text-center bg-slate-300 focus:outline-none h-11" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Post;
