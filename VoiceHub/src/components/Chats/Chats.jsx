import React from "react";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";

export default function Chats() {

    const userLogged = useSelector(getUserLogged)

    return (
        <div>
            <div>
                {userLogged[0].Chats.map(chat => {
                    return (
                        <div>
                            <p>{chat.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}