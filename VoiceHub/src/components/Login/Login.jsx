import React, { useState } from "react";
import axios from "axios";
import '../../App.css'

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
        setMessage('')
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const result = await axios.post('http://localhost:3001/users/loginUser', user);
            setMessage(result.data.response)
        } catch (error) {
            setMessage(error.response.data.response)
        }
        
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap justify-center mt-6 shadow-xl rounded-md p-3 w-64 h-64 filter">
                <h6 className="text-teal-50 mx-auto font-semibold">Login</h6>
                {message ? <p className={message === "User logged!" ? "text-green-500 mx-auto" : "text-red-600 mx-auto"}>{message}</p> : null}
                <input className="bg-teal text-black m-4 p-1 rounded-md" type={'text'} name='email' value={user.email} onChange={handleChange} placeholder='Email'/>
                <input className="bg-teal text-black m-4 p-1 rounded-md" type={'password'} name= 'password' value={user.password} onChange={handleChange} placeholder='Password'/>
                <button className="bg-ten-percent m-3 w-20 rounded-md mx-auto">Login</button>
            </form>
        </>
    )
}