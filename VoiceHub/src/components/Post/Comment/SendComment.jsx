import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pp from "../../../assets/default.png";
import { getUserLogged } from "../../../redux/reducers/userReducer";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { getPosts } from "../../../redux/reducers/postReducer";

export default function SendComment({ post_id }) {
  const { VITE_PORT } = import.meta.env;
  const userLogged = useSelector(getUserLogged);

  const dispatch = useDispatch();

  const [comment, setComment] = useState({
    user_id: userLogged && userLogged[0] && userLogged[0].id || null,
    post_id,
    content: "",
  });

  function handleChange(e) {
    setComment({ ...comment, [e.target.name]: e.target.value });
    console.log(comment);
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      axios
        .post(`http://localhost:${VITE_PORT}/comments/createComment`, comment)
        .then((response) => {
          if (response.data === "Succesfully posted!") {
            setComment({ user_id: userLogged[0].id, post_id, content: "" });
            dispatch(getPosts());
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-nowrap items-center justify-end w-full max-h-11"
    >
      <div className="w-full">
        <input
          type="text"
          name="content"
          value={comment.content}
          onChange={handleChange}
          placeholder="Write a comment..."
          autoComplete={"false"}
          className="w-full text-center bg-ten-percent bg-opacity-10 text-teal-50 focus:outline-none h-11 m-0"
        />
        <button className="m-0 h-0 w-0 relative">
          <MdSend size={26} className="text-ten-percent relative right-8 top-1.5"/>
        </button>
      </div>
    </form>
  );
}
