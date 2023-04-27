import React, { useEffect, useRef, useState } from "react";

export default function Filters({setPosts, posts}) {

    const formRef = useRef(null);

  const [filters, setFilters] = useState({
    date: false,
    likes: false,
    comments: false,
  });

//   useEffect(() => {
//     if (filters.date === 'recent') {
//         console.log(posts)
//         setPosts(posts.sort((a, b) => a.id - b.id))
//     }
//     if (filters.date === 'older') {
//         console.log(posts)
//         setPosts(posts.sort((a, b) => a.id - b.id).reverse())
//     }
//   }, [filters])

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit')
    if (filters.date === 'recent') {
        console.log(posts)
        setPosts(posts.sort((a, b) => a.id - b.id))
    }
    if (filters.date === 'older') {
        console.log(posts)
        setPosts(posts.sort((a, b) => a.id - b.id).reverse())
    }
  }

  function handleChange(e) {
      setFilters({ ...filters, [e.target.selectedOptions[0].dataset.name]: e.target.value });
      const form = e.target.form;
      form.submit()
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-row flex-nowrap bg-gradient bg-sixty-percent-home justify-evenly w-full h-20">
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
