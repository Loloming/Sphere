import React, { useEffect } from "react";
import io from 'socket.io-client'
import axios from 'axios';
import { useState } from "react";

export default function Chat() {

    const socket = io('http://localhost:3001');

    socket.emit('joinChat', 1)

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(messages)
        const messageData = {
            content: message,
            user_id: 1,
            chat_id: 1
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
        if (!messages[0]) {
            axios.get('http://localhost:3001/chats/getChatById?id=1')
            .then(r => {
                let dbMessages = [];
                console.log(r.data.Messages)
                r.data.Messages.map(m => {
                    dbMessages.push({
                        user: m.UserId,
                        content: m.content
                    });
                });
                setMessages(dbMessages)
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
                {messages.map((m, index) => {
                    return (
                        <div key={index}>
                            <p>{m.user}: {m.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}