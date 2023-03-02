import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../App.css'
import { useNavigate } from "react-router";
import { useDispatch, useSelector }from 'react-redux'
import { loginUser } from "../../redux/actions/actions";

export default function Login({setForm}) {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector(state => state.user)

    useEffect(() => {
        if (store.user[0]) {
            setTimeout(() => {
                navigate('/home')
            }, 1200)
        }
    }, [store])

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
        setMessage('')
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            // const result = await axios.post('http://localhost:3001/users/loginUser', user);
            dispatch(loginUser(setMessage, user));
        } catch (error) {
            console.log(error)
        }
        
    }

    function handleClick(e) {
        e.preventDefault()
        setForm('register')
    }

    return (
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap justify-center mt-6 shadow-2xl rounded-md px-3 pb-3 pt-3 w-64 h-72 filter border border-gray-300 border-opacity-10">
                <h6 className="text-teal-50 mx-auto mb-auto font-semibold mb-auto">Login</h6>
                {message ? <p className={message === "User logged!" ? "text-green-500 mx-auto my-0 text-xs h-0" : "text-red-600 mx-auto"}>{message}</p> : null}
                <div className="flex flex-col flex-wrap justify-center my-auto pt-3">
                    <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='email' value={user.email} onChange={handleChange} placeholder='Email'/>
                    <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'password'} name= 'password' value={user.password} onChange={handleChange} placeholder='Password'/>
                    <button className="bg-ten-percent m-3 w-20 rounded-md mx-auto hover:bg-violet-500 focus-visible:outline-none font-semibold text-teal-50">Login</button>
                </div>
                <p className="text-teal-50 text-xs mx-auto mt-auto ">Don't have an account? <a className="font-semibold" onClick={handleClick} href="">Register here</a></p>
            </form>
    )
}