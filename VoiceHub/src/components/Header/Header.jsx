import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";
import Upload from "../Upload/Upload";

export default function Header() {
  const [modal, setModal] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (published) {
      setTimeout(() => {
        setModal(false);
        setPublished(false);
      }, 2000);
    }
  }, [published]);

  const navigate = useNavigate();
  const userLogged = useSelector(getUserLogged);

  const IMG = "http://www.clipartbest.com/cliparts/niB/Mx8/niBMx87xT.gif";

  return (
    <header className="bg-sixty-percent-variant shadow-xl z-20 flex flex-row flex-nowrap h-16 justify-between items-center px-5 min-w-full">
      <Logo />
      <SearchBar />
      {modal ? (
        <div className="fixed inset-0 transition-opacity z-40 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-gray-800 opacity-75 z-40"
            onClick={() => setModal(false)}
          ></div>
          <Upload setPublished={setPublished} published={published} />
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-row justify-evenly items-center gap-2 w-60">
        <div className="p-2 flex justify-end">
          <button
            className="bg-ten-percent text-white p-2 rounded-md"
            w="3rem"
            onClick={() => setModal(!modal)}
          >
            Create
          </button>
        </div>
        <p
          className="text-teal-50 cursor-pointer"
          onClick={() => navigate("/chats")}
        >
          Chats
        </p>
        <img
          className="rounded-full h-11 w-12 cursor-pointer"
          src={IMG}
          onClick={
            userLogged[0]
              ? () => navigate(`/profile/${userLogged[0].username}`)
              : null
          }
        ></img>
      </div>
    </header>
  );
}
