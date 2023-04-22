import React from "react";
import { useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";

export default function Header() {

    const navigate = useNavigate()
    const userLogged = useSelector(getUserLogged);

    const IMG = "http://www.clipartbest.com/cliparts/niB/Mx8/niBMx87xT.gif";

    return (
        <header className="bg-sixty-percent-variant shadow-xl z-50 flex flex-row flex-nowrap h-16 justify-between items-center px-5 min-w-full">
            <Logo />
            <SearchBar />
            <div className="flex flex-row items-center gap-2">
                <p className="text-teal-50 cursor-pointer" onClick={() => navigate('/chats')}>Chats</p>
                {userLogged[0] && <img className="rounded-full h-11 w-12 cursor-pointer" src={IMG} onClick={() => navigate(`/profile/${userLogged[0].username}`)}></img>}
            </div>
        </header>
    )
}