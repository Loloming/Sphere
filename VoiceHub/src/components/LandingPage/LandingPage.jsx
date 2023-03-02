import React, { useState } from "react";
import "../../App.css";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function LandinPage() {

  const [form, setForm] = useState('login');

  return (
    <>
      <article className="flex flex-col h-full justify-center pl-3 pt-5 bg-gradient-to-tr from-sixty-percent via-thirty-percent to-sixty-percent min-h-screen">
        <h3 className="text-5xl font-semibold text-teal-50">
          An amazing app based on audio and streaming.
        </h3>
        <h4 className="text-5xl pl-5+ font-semibold text-ten-percent">Wanna try? </h4>
        <aside className="flex flex-wrap flex-row justify-center w-full p-10">
          {
            form === 'register' ? <Register setForm={setForm}/> : <Login setForm={setForm}/>
          }
        </aside>
      </article>
    </>
  );
}
