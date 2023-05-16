import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { getPosts } from "../../redux/reducers/postReducer";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import Upload from "../Upload/Upload";

export default function Home() {
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  });

  return (
    <div className="flex flex-col h-full justify-start bg-gradient-to-b from-sixty-percent-home to-sixty-percent min-h-screen">
      <Header />
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
      <div className="p-2">
        <button
          className="bg-ten-percent text-white p-2 rounded-md"
          w="3rem"
          onClick={() => setModal(!modal)}
        >
          Create
        </button>
      </div>
      <div className="grid grid-cols-posts h-full w-full">
        <div></div>
        <Posts />
        <div></div>
      </div>
    </div>
  );
}
