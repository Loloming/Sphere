import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import '../../App.css'
import { useNavigate } from "react-router";
import { useDispatch, useSelector }from 'react-redux'
import { loginUser, getUserError, getUserLogged, getUserStatus } from "../../redux/reducers/userReducer";

export default function Login({setForm}) {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogged = useSelector(getUserLogged);

    useEffect(() => {
        if (userLogged[0] && rememberMe) {
            const uT = JSON.stringify(user)
            Cookies.set('uT', uT, {expires: 30, secure: true});
            console.log('cookie')
            navigate('/home');
        }
        else if (userLogged[0]) {
            console.log('hola')
            navigate('/home');
        }
    }, [userLogged])

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
        setMessage('')
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            dispatch(loginUser({user, setMessage}));
        } catch (error) {
        }
        
    }

    function handleClick(e) {
        e.preventDefault()
        setForm('register')
    }

    return (
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap justify-center mt-6 shadow-2xl rounded-md px-3 pb-3 pt-3 w-64 h-72 filter border border-gray-300 border-opacity-10">
                <h6 className="text-teal-50 mx-auto mb-auto font-semibold">Login</h6>
                {message ? <p className={message === "User logged!" ? "text-green-500 mx-auto my-0 text-xs h-0" : "text-red-600 mx-auto h-0"}>{message}</p> : null}
                <div className="flex flex-col flex-wrap justify-center my-auto pt-3">
                    <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='email' value={user.email} onChange={handleChange} placeholder='Email'/>
                    <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'password'} name= 'password' value={user.password} onChange={handleChange} placeholder='Password'/>
                    <button className="bg-ten-percent m-3 w-20 rounded-md mx-auto hover:bg-violet-500 focus-visible:outline-none font-semibold text-teal-50">Login</button>
                </div>
                <label className="text-teal-50 flex flex-row justify-center mb-1">
                    <input className="mx-1" type="checkbox" onChange={() => setRememberMe(!rememberMe)} />
                    Remember me
                </label>
                <p className="text-teal-50 text-xs mx-auto mt-auto ">Don't have an account? <a className="font-semibold text-ten-percent" onClick={handleClick} href="">Register here</a></p>
            </form>
    )
}