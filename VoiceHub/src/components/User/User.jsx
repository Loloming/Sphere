import React from "react";
import pp from "../../assets/default.png";
import { useNavigate } from "react-router";

export default function User({user}) {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/profile/${user.username}`)} className="flex items-center justify-center w-24 h-full rounded-md flex-wrap bg-sixty-percent-variant mx-2 cursor-pointer">
            <img
            src={pp}
            className="w-6 mb-2 mx-10 rounded-full bg-sixty-percent cursor-pointer"
          />
          <p className="font-semibold text-teal-50">{user.username}</p>
        </div>
    )
}