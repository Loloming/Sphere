import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/reducers/userReducer";

export default function Register({setForm}) {

    const [user, setUser] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const [message, setMessage] = useState('');
    const [validation, setValidation] = useState(true);

    useEffect(() => {
        if (message === "User registered!") {
            setTimeout(() => {
                setForm('login')
            }, 1000)
        }
    }, [message])

    const validators = {
        name: function validateName(name) {
            if (name === undefined || name === '') {
                return false;
            }
            var regex = /^([a-zA-Z ]){2,30}$/;
            return regex.test(name)
        },
        password: function validatePassword(password) {
            if (password === undefined || password === '') {
                return false;
            }
            var regex = /^(?=.{8,})(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/;
            return regex.test(password)
        },
        email: function validateEmail(email) {
            if (email === undefined || email === '') {
                return false;
            }
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          },
        all: function validateAll() {
            if (validators.name(user.name) && validators.password(user.password) && validators.email(user.email)) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    function handleChange(e) {
        if (e.target.name === 'name') {
            validators.name(e.target.value) ? setMessage('') : setMessage("Name can't have numbers")
        }
        if (e.target.name === 'lastname') {
            validators.name(e.target.value) ? setMessage('') : setMessage("Lastname can't have numbers")
        }
        if (e.target.name === 'email') {
            validators.email(e.target.value) ? setMessage('') : setMessage('Email is needed!')
        }
        if (e.target.name === 'password') {
            validators.password(e.target.value) ? setMessage('') : setMessage('Password has to be 8 characters, with one special character, a capital letter and a lower case one')
        }
        setUser({...user, [e.target.name]: e.target.value})
        validators.all();   
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            dispatch(registerUser({user, setMessage}))
        } catch (error) {
            setMessage(error.response.data.response)
        }
    }

    function handleClick(e) {
        e.preventDefault()
        setForm('login')
    }

    return (
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap justify-center mt-6 shadow-2xl rounded-md p-3 w-64 h-auto filter border border-gray-300 border-opacity-10">
                <h6 className="text-teal-50 mx-auto mb-1 font-semibold">Register</h6>
                {message[0] ? <p className={message === "User registered!" ? "text-green-500 mx-auto" : "text-red-600 mx-auto"}>{message}</p> : null}
                <div className="pt-5">
                    <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='username' value={user.username} onChange={handleChange} placeholder='Username'/>
                    <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='name' value={user.name} onChange={handleChange} placeholder='Name'/>
                    <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='lastname' value={user.lastname} onChange={handleChange} placeholder='Lastname'/>
                    <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'text'} name='email' value={user.email} onChange={handleChange} placeholder='Email'/>
                    <input className="bg-teal text-black m-4 p-1 rounded-md focus-visible:outline-none" type={'password'} name= 'password' value={user.password} onChange={handleChange} placeholder='Password'/>
                </div>
                <button disabled={validators.all()} className="bg-ten-percent m-3 w-20 rounded-md mx-auto hover:bg-violet-500 focus-visible:outline-none font-semibold text-teal-50">Register</button>
                <p className="text-teal-50 text-xs mx-auto">Already have an account? <a className="font-semibold" onClick={handleClick} href="">Login here</a></p>
            </form>
    )
}
