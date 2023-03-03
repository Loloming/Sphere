import React from "react";
import '../../App.css';

export default function SearchBar() {

    return (
        <form className="flex flex-row h-8">
            <input type="text" className="mx-0 focus:outline-none rounded-tl-md border-none rounded-bl-md h-8"></input>
            <button className="bg-ten-percent flex flex-col flex-nowrap justify-center rounded-tr-md border-none rounded-br-md h-8 p-2 font-semibold text-teal-50 hover:bg-violet-600">Search</button>
        </form>
    )
}