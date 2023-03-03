import React from "react";
import "../../App.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {

    const IMG = "http://www.clipartbest.com/cliparts/niB/Mx8/niBMx87xT.gif";

    return (
        <header className="bg-sixty-percent-variant shadow-xl flex flex-row flex-nowrap h-14 justify-between align-top pt-3 px-2">
            <h3>VoiceHub</h3>
            <SearchBar />
            <img className="rounded-full h-11 w-12" src={IMG}></img>
        </header>
    )
}