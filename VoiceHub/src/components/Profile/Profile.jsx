import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import '../../App.css';
import { getPosts } from "../../redux/reducers/postReducer";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";

export default function Profile() {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('hehe')
        dispatch(getPosts())
    }, [dispatch])

    const IMG = "http://www.clipartbest.com/cliparts/niB/Mx8/niBMx87xT.gif";
    const BANNER = "https://blogs.iadb.org/conocimiento-abierto/wp-content/uploads/sites/10/2019/06/banner-programacion-creativa-p5js.png"

    return (
        <div className="flex flex-col h-full justify-start items-center bg-sixty-percent min-h-screen min-w-full">
            <Header />
            <div className="flex flex-col h-64 items-center shadow-xl bg-gradient-to-b from-sixty-percent to-sixty-percent-banner rounded-b-lg w-full z-40">
                <img src={BANNER} className="rounded-b-xl h-48 w-full z-30"></img>
                <img src={IMG} className="rounded-full h-48 w-48 z-40 absolute top-32 outline outline-3 outline-black"></img>
                <div className="flex flex-row w-full h-full items-center justify-around z-50 shadow-xl">
                    <div className="flex flex-row w-1/4 flex-nowrap">
                        <div className="text-teal-50 font-semibold w-1/2 flex flex-col items-center">
                            <h4>Likes</h4>
                            <h4>1</h4>
                        </div>
                        <div className="text-teal-50 font-semibold w-1/2 flex flex-col items-center">
                            <h4>Followers</h4>
                            <h4>1</h4>
                        </div>
                    </div>
                    <div className="flex flex-row w-1/4 flex-nowrap">
                        <div className="text-teal-50 font-semibold w-1/2 flex flex-col items-center">
                            <h4>Followed</h4>
                            <h4>1</h4>
                        </div>
                        <div className="text-teal-50 font-semibold w-1/2 flex flex-col items-center">
                            <h4>Images</h4>
                            <h4>1</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-b from-sixty-percent-description to-sixty-percent h-32 w-full flex flex-row flex-wrap justify-center z-30 shadow-xl">
                <div className="w-full flex flex-row justify-center items-center">
                    <h2 className="text-teal-50 font-semibold text-xl my-1">Loloming</h2>
                </div>
                <div className="w-full flex flex-row justify-center px-3">
                    <p className="text-neutral-400 inline-block text-center font-normal shadow-xl z-10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus error adipisci,
                    earum distinctio minus ullam aliquam minima quaerat hic suscipit deleniti tempore enim ipsum iure necessitatibus
                    magnam numquam commodi vel?</p>
                </div>
            </div>
            <div className="grid grid-cols-posts w-full h-full">
                <div className="bg-gradient-to-b from-sixty-percent to-sixty-percent-banner shadow-2xl h-full text-center z-50">
                </div>
                <div className="bg-gradient-to-t from-sixty-percent-home to-sixty-percent flex flex-col h-fit text-center">
                    <Filters />
                    <Posts />
                </div>
                <div className="bg-gradient-to-b from-sixty-percent to-sixty-percent-banner shadow-2xl  h-full text-center z-50">
                </div>
            </div>
        </div>
    )
}