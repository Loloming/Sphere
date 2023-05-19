import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserLogged } from "../../redux/reducers/userReducer";

export default function Chats() {
  const userLogged = useSelector(getUserLogged);

  const navigate = useNavigate();
  const [chat, setChat] = useState(false);

  const [chatInfo, setChatInfo] = useState({
    name: "",
    users: [
      {
        id: userLogged.id,
      },
    ],
  });

  console.log(chatInfo.name);
  

  return (
    <div className="bg-sixty-percent w-100 h-screen p-4">
      {chat && (
        <div className="w-full h-full inset-0 absolute flex justify-center items-center">
          <div
            className="absolute w-full h-full inset-0 bg-black opacity-[0.7]"
            onClick={() => setChat(!chat)}
          ></div>
          <div className="z-10">
            <div className="w-[400px] bg-thirty-percent h-[400px] flex justify-around items-center flex-col gap-3 rounded-lg">
              <div>
                <h1 className="text-white text-4xl">Nuevo chat</h1>
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="name"
                  className="text-white"
                  value={chatInfo.name}
                  onChange={(e) => setChatInfo.name(e.target.value)}
                ></label>
                <input
                  type="text"
                  name="name"
                  className="px-2 h-6 bg-transparent focus-visible:outline-none text-white"
                  placeholder="Nombre del chat"
                />
                <div className="w-[300px] bg-ten-percent flex flex-col gap-3">
                  <h2>Usuario ejemplo</h2>
                  <h2>Usuario ejemplo</h2>
                  <h2>Usuario ejemplo</h2>
                  <h2>Usuario ejemplo</h2>
                  <h2>Usuario ejemplo</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex gap-10 py-5 text-white">
          <buton className="cursor-pointer border-solid border-ten-percent border p-4 hover:bg-sixty-percent-home">
            Your chats
          </buton>
          <buton
            className="cursor-pointer border-solid border-thirty-percent border p-4 hover:bg-sixty-percent-home"
            onClick={() => setChat(!chat)}
          >
            Start new chat
          </buton>
        </div>
        {(userLogged[0] &&
          userLogged[0].Chats.map((chat, index) => {
            return (
              <>
                <div
                  className="cursor-pointer bg-sixty-percent-home p-5 flex justify-between hover:bg-thirty-percent duration-300"
                  onClick={() => navigate(`/chats/chat/${chat.id}`)}
                  key={index}
                >
                  <p className="text-white">{chat.name}</p>
                  <span className="text-ten-percent">Delete</span>
                </div>
              </>
            );
          })) || <h3>Cargando...</h3>}
      </div>
    </div>
  );
}
