import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProfilePosts } from "../../redux/reducers/postReducer";

export default function Filters() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    date: false,
    likes: false,
    comments: false,
  });

  function handleChange(e) {
    setFilters({
      ...filters,
      [e.target.selectedOptions[0].dataset.name]: e.target.value == 'false' ? false : e.target.value,
    });
    dispatch(filterProfilePosts({
      ...filters,
      [e.target.selectedOptions[0].dataset.name]: e.target.value == 'false' ? false : e.target.value,
    }));
  }

  return (
    <form
      className="flex flex-row flex-nowrap bg-gradient bg-sixty-percent-home justify-evenly items-center w-full h-20"
    >
      <div className="flex flex-col justify-center bg-gradient-to-r from-sixty-percent-home via-sixty-percent-description to-sixty-percent-home p-3">
        <label className="text-teal-50 font-semibold">
          Fecha de publicación
        </label>
        <select
          className="bg-sixty-percent-variant text-teal-50 rounded-lg"
          onChange={handleChange}
        >
          <option data-name={"date"} value={false}>
            Sin filtros
          </option>
          <option data-name={"date"} value="recent">
            Más reciente
          </option>
          <option data-name={"date"} value="older">
            Más antiguo
          </option>
        </select>
      </div>
      <div className="flex flex-col justify-center bg-gradient-to-r from-sixty-percent-home via-sixty-percent-description to-sixty-percent-home p-3">
        <label className="text-teal-50 font-semibold">Likes</label>
        <select
          className="bg-sixty-percent-variant text-teal-50 rounded-lg"
          onChange={handleChange}
        >
          <option data-name={"likes"} value={false}>
            Sin filtros
          </option>
          <option data-name={"likes"} value="most_liked">
            Más likes
          </option>
          <option data-name={"likes"} value="less_liked">
            Menos likes
          </option>
        </select>
      </div>
      <div className="flex flex-col justify-center bg-gradient-to-r from-sixty-percent-home via-sixty-percent-description to-sixty-percent-home p-3">
        <label className="text-teal-50 font-semibold">Comentarios</label>
        <select
          className="bg-sixty-percent-variant text-teal-50 rounded-lg"
          onChange={handleChange}
        >
          <option data-name={"comments"} value={false}>
            Sin filtros
          </option>
          <option data-name={"comments"} value="most_commented">
            Más comentarios
          </option>
          <option data-name={"comments"} value="less_commented">
            Menos comentarios
          </option>
        </select>
      </div>
    </form>
  );
}
