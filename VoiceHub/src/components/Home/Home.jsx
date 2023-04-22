import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { getAllPosts, getPosts } from "../../redux/reducers/postReducer";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import Upload from "../Upload/Upload";

export default function Home() {

    const dispatch = useDispatch()
    const posts = useSelector(getAllPosts)

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    return (
        <div className="flex flex-col h-full justify-start bg-gradient-to-b from-sixty-percent-home to-sixty-percent min-h-screen">
            <Header />
            <Upload />
            <div className="grid grid-cols-posts h-full w-full">
                <div>
                    
                </div>
                <Posts posts={posts}/>
                <div>
                    
                </div>
            </div>
        </div>
    )
}