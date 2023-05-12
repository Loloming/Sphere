import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import Users from "../Users/Users";

export default function SearchResults() {
  const { VITE_PORT } = import.meta.env;
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q");

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    searcher(search);
  }, [searchParams]);

  async function searcher(query) {
    try {
      let postResponse = await axios.get(
        `http://localhost:${VITE_PORT}/posts/getPost`
      );
      let userResponse = await axios.get(
        `http://localhost:${VITE_PORT}/users/getUser`
      );
      setPosts(
        postResponse.data.filter(
          (post) =>
            post.content.includes(query) ||
            post.content.includes(query.toLowerCase()) ||
            post.content
              .split("")
              .filter((letra, index, self) => self.indexOf(letra) === index)
              .join("")
              .includes(query) ||
            post.content
              .split("")
              .filter((letra, index, self) => self.indexOf(letra) === index)
              .join("")
              .includes(query.toLowerCase())
        )
      );
      setUsers(
        userResponse.data.filter(
          (user) =>
            user.username.includes(query) ||
            user.username.includes(query.toLowerCase()) ||
            user.username.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.name.includes(query) ||
            user.name.includes(query.toLowerCase()) ||
            user.name.toLowerCase().includes(query) ||
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.lastname.includes(query) ||
            user.lastname.includes(query.toLowerCase()) ||
            user.lastname.toLowerCase().includes(query) ||
            user.lastname.toLowerCase().includes(query.toLowerCase())
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col h-full justify-start bg-gradient-to-b from-sixty-percent-home to-sixty-percent min-h-screen">
      <Header />
      {!users[0] && !posts[0] && <h3 className="text-teal-50 text-2xl font-semibold">Nothing founded</h3>}
      {users[0] && <Users users={users} />}
      {posts[0] && (
        <>
          <h3 className="text-teal-50 text-2xl font-semibold">Posts that may coincide with your search</h3>
          <div className="grid grid-cols-posts h-full w-full my-4">
            <div></div>
            <div>
              <Posts posts={posts} />
            </div>
            <div></div>
          </div>
        </>
      )}
    </div>
  );
}
