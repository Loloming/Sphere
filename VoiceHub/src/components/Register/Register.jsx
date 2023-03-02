import React, { useState } from "react";
import axios from "axios";

export default function Register({setForm}) {

    const [user, setUser] = useState({
        username: '',
        name: '',
        lastname: '',
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
            const result = await axios.post('http://localhost:3001/users/registerUser', user);
            setMessage(result.data.response)
            if (result.data.response === "User registered!") {
                setTimeout(() => {
                    setForm('login')
                }, 1000)
            }
        } catch (error) {
            console.log(error)
            setMessage(error.response.data.response)
        }
    }

    function handleClick(e) {
        e.preventDefault()
        setForm('login')
        console.log('done')
    }

    return (
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap justify-center mt-6 shadow-2xl rounded-md p-3 w-64 h-auto filter border border-gray-300 border-opacity-10">
                <h6 className="text-teal-50 mx-auto font-semibold">Register</h6>
                {message ? <p className={message === "User registered!" ? "text-green-500 mx-auto" : "text-red-600 mx-auto"}>{message}</p> : null}
                <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='username' value={user.username} onChange={handleChange} placeholder='Username'/>
                <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='name' value={user.name} onChange={handleChange} placeholder='Name'/>
                <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='lastname' value={user.lastname} onChange={handleChange} placeholder='Lastname'/>
                <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='email' value={user.email} onChange={handleChange} placeholder='Email'/>
                <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'password'} name= 'password' value={user.password} onChange={handleChange} placeholder='Password'/>
                <button className="bg-ten-percent m-3 w-20 rounded-md mx-auto hover:bg-violet-500 focus-visible:outline-none font-semibold text-teal-50">Register</button>
                <p className="text-teal-50 text-xs mx-auto">Already have an account? <a className="font-semibold" onClick={handleClick} href="">Login here</a></p>
            </form>
    )
}