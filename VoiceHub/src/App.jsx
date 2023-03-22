import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import LandinPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import './App.css'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Chat from './components/Chat/Chat';
import Chats from './components/Chats/Chats';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogged, loginUser } from './redux/reducers/userReducer';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookieUser = Cookies.get('uT');

  const userLogged = useSelector(getUserLogged);

  const [validation, setValidation] = useState(false);
  
  useEffect(() => {
    if (cookieUser && !userLogged[0]) {
      const uT = JSON.parse(cookieUser)
      dispatch(loginUser({user: uT}))
    }
    else if (cookieUser && userLogged[0]) {
      setValidation(true)
      navigate('/home')
    }
    else if (userLogged && userLogged[0]) {
      setValidation(true)
    }
  }, [userLogged])

  return (
      <Routes>
        {cookieUser || validation && userLogged[0] ? null : <Route path='/' element={<LandinPage />} />}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/home' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/chats' element={<Chats />} />
        <Route path='*' element={<Home />} />
      </Routes>
  )
}

export default App
