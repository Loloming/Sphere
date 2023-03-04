import React from "react";
import { useNavigate } from "react-router";
    
const Logo = () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => {navigate('/home')}}>
      <svg
        className="cursor-pointer"
        width="50"
        height="50"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="70" cy="70" r="70" fill="#8B30FF" className="hover:fill-violet-600 transition"/>
        <path
          d="M10 75.5H39.5L48 80.5L62.5 58.5L71 95L90 30L98.5 71.5H130.5"
          stroke="#101010"
          stroke-width="8"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
};

export default Logo;
