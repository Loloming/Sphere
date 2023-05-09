import React from "react";
import { Image, Transformation } from "cloudinary-react";
import { FaRegFileAudio } from "react-icons/fa";
import HoverInfo from "./HoverInfo/HoverInfo";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";

export default function PostGrid({ post }) {

  const userLogged = useSelector(getUserLogged);

  const { VITE_CLOUD_NAME } = import.meta.env;

  if (post.Images[0]) {
    return (
      <div className="h-full w-full aspect-square group cursor-pointer transition duration-300 hover:scale-110">
        <Image className={"w-full h-full"} cloudName={VITE_CLOUD_NAME} publicId={post.Images[0].url} alt="noimg">
          <Transformation aspectRatio="1:1" crop="fill"/>
        </Image>
        {userLogged && userLogged[0] && <HoverInfo post={post} />}
      </div>
    );
  } else if (post.Audio && post.Audio.url) {
    return (
      <div className="aspect-square group cursor-pointer transition hover:scale-110 bg-gradient-to-tr from-ten-percent via-purple-600 to-purple-500 flex justify-center items-center">
        <FaRegFileAudio size={35} className="text-teal-50" />
        {userLogged && userLogged[0] && <HoverInfo post={post} />}
      </div>
    );
  } else {
    return (
      <div className="w-full h-full aspect-square group cursor-pointer transition hover:scale-110 flex justify-center items-center bg-gradient-to-tr from-purple-500 via-purple-600 to-ten-percent font-medium text-teal-50">
        {post.content.slice(0, 23)}
        {userLogged && userLogged[0] && <HoverInfo post={post} />}
      </div>
    );
  }
}
