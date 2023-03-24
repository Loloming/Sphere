import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserLogged } from "../../redux/reducers/userReducer";

export default function Chats() {
  const userLogged = useSelector(getUserLogged);

  console.log(userLogged);

  const navigate = useNavigate();

  return (
    <div className="bg-sixty-percent w-100 h-screen p-4">
      <div>
        <div className="flex gap-10 py-5 text-white">
          <h1 className="cursor-pointer border-solid border-ten-percent border p-4 hover:bg-sixty-percent-home">Your chats</h1>
          <h1 className="cursor-pointer border-solid border-thirty-percent border p-4 hover:bg-sixty-percent-home">Start new chat</h1>
        </div>
        {(userLogged[0] &&
          userLogged[0].Chats.map((chat) => {
            return (
              <div
                className="cursor-pointer bg-sixty-percent-home p-5 flex justify-between hover:bg-thirty-percent duration-300"
                onClick={() => navigate(`/chats/chat/${chat.id}`)}
              >
                <p className="text-white">{chat.name}</p>
                <span className="text-ten-percent">Delete</span>
              </div>
            );
          })) || <h3>Cargando...</h3>}
      </div>
    </div>
  );
}
