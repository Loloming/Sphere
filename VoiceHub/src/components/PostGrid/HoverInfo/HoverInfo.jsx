import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../../redux/reducers/userReducer";
import axios from "axios";

export default function HoverInfo({ Likes, Comments, post_id }) {
  const { VITE_PORT } = import.meta.env;

  const userLogged = useSelector(getUserLogged);

  const [like, setLike] = useState(
    Likes.find((like) => like.user_id === userLogged[0].id) ? true : false
  );

  const [info, setInfo] = useState({
    likes: Likes.length,
    comments: Comments.length,
  });

  async function addLike() {
    try {
      let response = axios.post(
        `http://localhost:${VITE_PORT}/likes/createLike`,
        { user_id: userLogged[0].id, post_id }
      );
      if (response) {
        setLike(!like);
        setInfo({
          comments: info.comments,
          likes: info.likes + 1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeLike() {
    try {
      let userLike =
        Likes.find((like) => like.user_id === userLogged[0].id) ||
        (await axios
          .get(`http://localhost:${VITE_PORT}/posts/getPostById?id=${post_id}`)
          .then((response) => {
            return response.data.Likes.find(
              (like) => like.user_id === userLogged[0].id
            );
          }));
      if (userLike) {
        console.log(userLike);
        let response = axios.delete(
          `http://localhost:${VITE_PORT}/likes/deleteLike/${userLike.id}`
        );
        if (response) {
          console.log(response);
          setLike(!like);
          setInfo({
            comments: info.comments,
            likes: info.likes - 1,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-full hidden group-hover:flex absolute bottom-0">
      <div className="w-full h-full flex opacity-0 absolute bottom-0 transition duration-150 bg-gradient-to-t from-slate-200 via-transparent to-slate-200 hover:opacity-50"></div>
      <div className="flex flex-col justify-end items-center group-hover:flex h-full w-1/2">
        {like ? (
          <AiFillHeart
            size={18}
            className="hidden group-hover:block relative top-1 text-red-600"
            onClick={removeLike}
          />
        ) : (
          <AiOutlineHeart
            size={18}
            className="hidden group-hover:block relative top-1 text-black"
            onClick={addLike}
          />
        )}
        <p className="text-sm font-medium text-black z-50">{info.likes}</p>
      </div>
      <div className="flex flex-col justify-end items-center group-hover:flex h-full w-1/2">
        <FaRegComment
          size={18}
          className="hidden group-hover:block relative top-1 text-black" // al hacerle click te llevaría al PostDetail
        />
        <p className="text-sm font-medium text-black z-50">{info.comments}</p>
      </div>
    </div>
  );
}
