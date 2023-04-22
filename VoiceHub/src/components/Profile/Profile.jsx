import React, { useEffect, useState } from "react";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { VITE_PORT } = import.meta.env;
  const { username } = useParams();

  async function getUser(username) {
    try {
      let response = await axios.get(
        `http://localhost:${VITE_PORT}/users/getUserByUsername?username=${username}`
      );
      if (response.data && response.data.username) {
        setUser(response.data);
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!user && username) {
      getUser(username);
    } else if (!username) {
      navigate("/home");
    }
  }, [user]);

  const getLikes = (userSelected) => {
    var likes = 0;
    userSelected.Posts.map((post) => {
      likes += post.Likes.length;
    });
    return likes;
  };

  console.log(username);

  const IMG = "http://www.clipartbest.com/cliparts/niB/Mx8/niBMx87xT.gif";
  const BANNER =
    "https://blogs.iadb.org/conocimiento-abierto/wp-content/uploads/sites/10/2019/06/banner-programacion-creativa-p5js.png";

  return (
    <div className="flex flex-col h-full justify-start items-center bg-sixty-percent min-h-screen min-w-full">
      <Header />
      {user ? (
        <>
          <div className="flex flex-col h-64 items-center shadow-xl bg-gradient-to-b from-sixty-percent to-sixty-percent-banner rounded-b-lg w-full z-40">
            <img src={BANNER} className="rounded-b-xl h-48 w-full z-30"></img>
            <img
              src={IMG}
              className="rounded-full h-48 w-48 z-40 absolute top-32 outline outline-3 outline-black"
            ></img>
            <div className="flex flex-row w-full h-full items-center justify-around z-50 shadow-xl">
              <div className="flex flex-row w-1/4 flex-nowrap">
                <div className="text-teal-50 font-semibold w-1/2 flex flex-col items-center">
                  <h4>Likes</h4>
                  <h4>{user ? getLikes(user) : "loading..."}</h4>
                </div>
                <div className="text-teal-50 font-semibold w-1/2 flex flex-col items-center">
                  <h4>Followers</h4>
                  <h4>{user ? user.followers.length : "loading..."}</h4>
                </div>
              </div>
              <div className="flex flex-row w-1/4 flex-nowrap">
                <div className="text-teal-50 font-semibold w-1/2 flex flex-col items-center">
                  <h4>Followed</h4>
                  <h4>{user ? user.following.length : "loading..."}</h4>
                </div>
                <div className="text-teal-50 font-semibold w-1/2 flex flex-col items-center">
                  <h4>Posts</h4>
                  <h4>{user ? user.Posts.length : "loading..."}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-sixty-percent-description to-sixty-percent h-32 w-full flex flex-row flex-wrap justify-center z-30 shadow-xl">
            <div className="w-full flex flex-row justify-center items-center">
              <h2 className="text-teal-50 font-semibold text-xl my-1">
                {(user && user.username) || "loading..."}
              </h2>
            </div>
            <div className="w-full flex flex-row justify-center px-3">
              <p className="text-neutral-400 inline-block text-center font-normal shadow-xl z-10">
                {user && user.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-posts w-full h-full">
            <div className="bg-gradient-to-b from-sixty-percent to-sixty-percent-banner shadow-2xl h-full text-center z-50"></div>
            <div className="bg-gradient-to-t from-sixty-percent-home to-sixty-percent flex flex-col h-fit text-center">
              <Filters />
              {user && user.Posts && <Posts posts={user.Posts} />}
            </div>
            <div className="bg-gradient-to-b from-sixty-percent to-sixty-percent-banner shadow-2xl  h-full text-center z-50"></div>
          </div>
        </>
      ) : (
        <VscLoading />
      )}
    </div>
  );
}
