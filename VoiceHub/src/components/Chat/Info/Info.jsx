import React from "react";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../../redux/reducers/userReducer";

export default function Info({ chat }) {

    const userLogged = useSelector(getUserLogged);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-1 text-white">
        You are in the <span className="font-black">{chat.name}</span> room
      </div>
      <h1 className="text-slate-600">
        Chat with{" "}
        <span className="text-ten-percent">
          {userLogged[0] &&
            chat.Users &&
            chat.Users.filter((u) => u.id !== userLogged[0].id)[0].username}
        </span>
      </h1>
    </div>
  );
}
