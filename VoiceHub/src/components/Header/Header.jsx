import React from "react";
import { useNavigate } from "react-router";
import "../../App.css";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {

    const navigate = useNavigate()

    const IMG = "http://www.clipartbest.com/cliparts/niB/Mx8/niBMx87xT.gif";

    return (
        <header className="bg-sixty-percent-variant shadow-xl flex flex-row flex-nowrap h-20 justify-between align-top pt-3 px-5">
            <Logo onClick={() => navigate('/home')}/>
            <SearchBar />
            <img className="rounded-full h-11 w-12" src={IMG}></img>
        </header>
    )
}