import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { getPosts } from "../../redux/reducers/postReducer";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";

export default function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    })

    return (
        <div className="flex flex-col h-full justify-start bg-gradient-to-b from-sixty-percent-home to-sixty-percent min-h-screen">
            <Header />
            <div className="grid grid-flow-col grid-cols-3 col-span-3 h-full w-full">
                <div>
                    preview
                </div>
                <Posts />
            </div>
        </div>
    )
}