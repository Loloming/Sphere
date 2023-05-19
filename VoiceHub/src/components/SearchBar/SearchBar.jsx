import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setSearch(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?q=${search.replace(/ /g, '+')}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row h-8">
      <input
        value={search}
        onChange={handleChange}
        type="text"
        className="mx-0 focus:outline-none rounded-tl-md border-none rounded-bl-md h-8"
      ></input>
      <button className="bg-ten-percent flex flex-col flex-nowrap justify-center rounded-tr-md border-none rounded-br-md h-8 p-2 font-semibold text-teal-50 hover:bg-violet-600">
        Search
      </button>
    </form>
  );
}
