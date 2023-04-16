import React, { useState } from "react";
import { useSelector } from "react-redux";
import pp from "../../../assets/default.png";
import { getUserLogged } from "../../../redux/reducers/userReducer";
import { MdSend } from "react-icons/md";
import axios from "axios";

export default function SendComment({ post_id }) {
  const { VITE_PORT } = import.meta.env;
  const userLogged = useSelector(getUserLogged);

  const [comment, setComment] = useState({
    user_id: userLogged[0].id,
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
      axios.post(
        `http://localhost:${VITE_PORT}/comments/createComment`,
        comment
      )
      .then(response => {
        if (response.data === "Succesfully posted!") {
            setComment({user_id: userLogged[0].id, post_id, content: ""})
        }
      })
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row flex-nowrap items-center w-full"
    >
      <img
        src={pp}
        className="w-6 mb-2 rounded-full bg-sixty-percent cursor-pointer m-0"
      />
      <input
        type="text"
        name="content"
        value={comment.content}
        onChange={handleChange}
        placeholder="Write a comment..."
        autoComplete={"false"}
        className="rounded-lg w-5/6 text-center bg-slate-300 focus:outline-none h-11 animate-expand m-0"
      />
      <button>
        <MdSend size={25} className="text-ten-percent m-0 cursor-pointer" />
      </button>
    </form>
  );
}
