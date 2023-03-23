import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserLogged } from "../../redux/reducers/userReducer";

export default function Chats() {

    const userLogged = useSelector(getUserLogged)

    console.log(userLogged)

    const navigate = useNavigate();

    return (
        <div>
            <div>
                {userLogged[0] && userLogged[0].Chats.map(chat => {
                    return (
                        <div className="cursor-pointer" onClick={() => navigate(`/chats/chat/${chat.id}`)}>
                            <p>{chat.name}</p>
                        </div>
                    )
                }) || <h3>Cargando...</h3>}
            </div>
        </div>
    )

}