import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandinPage from "./components/LandingPage/LandingPage";
import "./App.css";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Chat from "./components/Chat/Chat";
import Chats from "./components/Chats/Chats";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogged, loginUser } from "./redux/reducers/userReducer";
import SearchResults from "./components/SearchResults/SearchResults";
import PostDetail from "./components/PostDetail/PostDetail";

function App() {
  const dispatch = useDispatch();

  const cookieUser = Cookies.get("uT");

  const userLogged = useSelector(getUserLogged);

  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (cookieUser && !userLogged[0]) {
      const uT = JSON.parse(cookieUser);
      dispatch(loginUser({ user: uT }));
    } else if (cookieUser && userLogged[0]) {
      setValidation(true);
    } else if (userLogged && userLogged[0]) {
      setValidation(true);
    }
  }, [userLogged]);

  return (
    <Routes>
      {cookieUser || (validation && userLogged[0]) ? null : (
        <Route path="/" element={<LandinPage />} />
      )}
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chats/chat/:chatId" element={<Chat />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
