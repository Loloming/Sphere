import React, { useEffect } from "react";
import io from 'socket.io-client'
import axios from 'axios';
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";

export default function Chat() {

    const { chatId } = useParams();
    const userLogged = useSelector(getUserLogged);

    const navigate = useNavigate();

    if (!userLogged[0].Chats.filter(chat => chat.id === chatId * 1)[0]) {
        navigate('/')
    }

    const socket = io('http://localhost:3001');

    socket.emit('joinChat', chatId * 1)

    const [chat, setChat] = useState({});

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!messages) {
            setMessages([{
                user: userLogged[0].id,
                content: message
            }])
        };
        const messageData = {
            content: message,
            user_id: userLogged[0].id,
            chat_id: chatId * 1
        }
        socket.emit('message', messageData);
        setMessage('');
    }

    useEffect(() => {
        function receiveMessage(message) {
            setMessages([...messages, {
                user: message.id,
                content: message.messageData.content
            }])
        }
        if (messages && !messages[0]) {
            axios.get('http://localhost:3001/chats/getChatById?id=1')
            .then(r => {
                let dbMessages = [];
                setChat(r.data);
                r.data.Messages.map(m => {
                    dbMessages.push({
                        user: m.UserId,
                        content: m.content
                    });
                });
                if (dbMessages.length) {
                    setMessages(dbMessages)
                }
                else {
                    setMessages(null)
                }
            })
        }
        socket.on('message', receiveMessage);
        return () => {
            socket.off('message', receiveMessage)
        };
    }, [messages])

    return (
        <div className="flex flex-col">
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={(e) => {
                    setMessage(e.target.value)
                }} />
                <button>Send</button>
            </form>
            <div>
                {messages && messages.map((m, index) => {
                    return (
                        <div key={index}>
                            <p>{chat.Users.filter(u => m.user === u.id)[0].username}: {m.content}</p>
                        </div>
                    )
                }) || <h3>No hay mensajes</h3>}
            </div>
        </div>
    )
}