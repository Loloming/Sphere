import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import LandinPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import './App.css'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';

function App() {

  return (
      <Routes>
        <Route path='/' element={<LandinPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/home' element={<Home />} />
      </Routes>
  )
}

export default App
