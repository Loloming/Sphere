import React, { useState } from "react";
import pp from "../../assets/default.png";
import { MdAddComment } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { Image } from "cloudinary-react";
import Comments from "./Comments/Comments";
import Audio from "../Audio/Audio";
import { FaShare, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";
import axios from "axios";

const Post = ({ post }) => {
  const { content, id, Images, User, createdAt } = post;

  const { VITE_CLOUD_NAME, VITE_PORT } = import.meta.env;

  const userLogged = useSelector(getUserLogged);

  const navigate = useNavigate();

  const format = createdAt.split("-")[2];

  const form = `${format[0].concat(format[1])}/${createdAt.split("-")[1]}`;

  const [like, setLike] = useState(
    post.Likes.find((like) => like.user_id === userLogged[0]?.id) ? true : false
  );

  async function addLike() {
    try {
      let response = axios.post(
        `http://localhost:${VITE_PORT}/likes/createLike`,
        { user_id: userLogged[0].id, post_id: id }
      );
      if (response) {
        setLike(!like);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeLike() {
    try {
      console.log("remove");
      let userLike =
        post.Likes.find((like) => like.user_id === userLogged[0].id) ||
        (await axios
          .get(`http://localhost:${VITE_PORT}/posts/getPostById?id=${id}`)
          .then((response) => {
            console.log(response);
            return response.data.Likes.find(
              (like) => like.user_id === userLogged[0].id
            );
          }));
      console.log(userLike);
      if (userLike) {
        let response = axios.delete(
          `http://localhost:${VITE_PORT}/likes/deleteLike/${userLike.id}`
        );
        if (response) {
          console.log(response);
          setLike(!like);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleShare() {
    try {
      let response = await axios.post(
        `http://localhost:${VITE_PORT}/reposts/createRepost`,
        {
          post_id: id,
          user_id: userLogged[0]?.id,
        }
      );
      let getReposts = await axios.get(
        `http://localhost:${VITE_PORT}/reposts/getRepost`
      );
      console.log(response);
      console.log(getReposts);
    } catch (error) {
      console.log(error);
    }
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
            onClick={
              User && User.username
                ? () => navigate(`/profile/${User.username}`)
                : null
            }
          />
          <p
            className="text-white font-thin text-xs cursor-pointer hover:underline"
            onClick={
              User && User.username
                ? () => navigate(`/profile/${User.username}`)
                : null
            }
          >
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
        <div className="flex mt-4 mb-4 gap-12 justify-center">
          <button onClick={() => navigate(`/post/${id}`)}>
            <MdAddComment
              className="text-ten-percent"
              title="Ver todos los comentarios"
              size={25}
            />
          </button>
          {like ? (
            <button onClick={removeLike}>
              <AiFillLike className="text-ten-percent animate-like" size={25} />
            </button>
          ) : (
            <button onClick={addLike}>
              <AiOutlineLike className="text-ten-percent" size={25} />
            </button>
          )}
          <button>
            <FaShare className="text-ten-percent" title="Re-send" size={25} />
          </button>
          <button>
            <FaShareAlt
              className="text-ten-percent"
              title="Share"
              onClick={handleShare}
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
