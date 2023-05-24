import React, { useEffect, useState } from "react";
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
import Upload from "../Upload/Upload";

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

  const [modal, setModal] = useState(false);
  const [published, setPublished] = useState(false);

  const [sharingPost, setSharingPost] = useState([]);

  async function getSharedPost() {
    try {
      let response = await axios.get(
        `http://localhost:${VITE_PORT}/posts/getPostById?id=${post.Sharing.sharing_id}`
      );
      setSharingPost(response.data);
      console.log("sharing", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (published) {
      setTimeout(() => {
        setModal(false);
        setPublished(false);
      }, 2000);
    }
  }, [published]);

  useEffect(() => {
    if (post.Sharing && !sharingPost[0]) {
      getSharedPost();
    }
  }, []);

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

  return (
    <div
      className="flex flex-row bg-gradient-to-tl from-sixty-percent to-thirty-percent rounded-lg p-4 w-full h-full my-3"
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
        {like ? (
            <div className="flex flex-col justify-center items-center">
              <button onClick={removeLike}>
                <AiFillLike
                  className="text-ten-percent animate-like"
                  size={25}
                />
              </button>
              <p className="text-teal-50 font-medium h-0">
                {post.Likes?.length || "0"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <button onClick={addLike}>
                <AiOutlineLike className="text-ten-percent" size={25} />
              </button>
              <p className="text-teal-50 font-medium h-0">
                {post.Likes?.length || "0"}
              </p>
            </div>
          )}
          <div className="flex flex-col justify-center items-center">
            <button onClick={() => navigate(`/post/${id}`)}>
              <MdAddComment
                className="text-ten-percent"
                title="Ver todos los comentarios"
                size={25}
              />
            </button>
            <p className="text-teal-50 font-medium h-0">
              {post.Comments?.length || "0"}
            </p>
          </div>
          {/* <button>
            <FaShare className="text-ten-percent" title="Re-send" size={25} />
          </button> */}
          <div className="flex flex-col justify-center items-center">
            <button>
              <FaShareAlt
                className="text-ten-percent"
                title="Share"
                onClick={() => setModal(!modal)}
                size={25}
              />
            </button>
            <p className="text-teal-50 font-medium h-0">
              {post.Reposts?.length || "0"}
            </p>
          </div>
        </div>
        {post.Sharing && (
          <div
            className="flex flex-row bg-gradient-to-tl from-purple-900 to-thirty-percent rounded-lg p-4 w-full h-fit my-3 opacity-80 cursor-pointer"
            key={sharingPost.id}
            onClick={() => navigate(`/post/${sharingPost.id}`)}
          >
            {sharingPost?.Images && sharingPost.Images[0] && (
              <Image
                cloudName={VITE_CLOUD_NAME}
                publicId={sharingPost.Images[0].url}
                alt="noimg"
                width={"50%"}
                className="rounded-lg mr-2"
              ></Image>
            )}
            <div
              className={
                sharingPost?.Images && sharingPost.Images[0]
                  ? "w-1/2 h-full flex flex-col items-center justify-between"
                  : "w-full h-full flex flex-col items-center"
              }
            >
              <div className="flex flex-row justify-between w-full">
                <img
                  src={pp}
                  className="w-6 mb-2 rounded-full bg-sixty-percent cursor-pointer"
                  onClick={
                    sharingPost.User && sharingPost.User.username
                      ? () => navigate(`/profile/${sharingPost.User.username}`)
                      : null
                  }
                />
                <p
                  className="text-white font-thin text-xs cursor-pointer hover:underline"
                  onClick={
                    sharingPost.User && sharingPost.User.username
                      ? () => navigate(`/profile/${sharingPost.User.username}`)
                      : null
                  }
                >
                  {(sharingPost.User && sharingPost.User.username) ||
                    "loading..."}
                </p>
                <p className="text-slate-600 text-xs">{form}</p>
              </div>
              {sharingPost.Audio && <Audio public_id={sharingPost.Audio.url} />}
              {content && (
                <div className="mt-4 rounded-md p-2 flex justify-center">
                  <p className="text-slate-400 font-normal w-full text-center">
                    {sharingPost.content}
                  </p>
                </div>
              )}
              <Comments
                comments={sharingPost.Comments}
                post_id={sharingPost.id}
              />
            </div>
          </div>
        )}
        <Comments comments={post.Comments} post_id={id} />
      </div>
      {modal ? (
        <div className="fixed inset-0 transition-opacity z-40 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-gray-800 opacity-75 z-40"
            onClick={() => setModal(false)}
          ></div>
          <Upload
            setPublished={setPublished}
            published={published}
            sharing={id}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Post;
