import React from "react";

const Post = ({ post }) => {
  const { media, heading, content, id, Comments, Likes } = post;

  return (
    <div className="bg-gradient-to-tl from-sixty-percent to-thirty-percent rounded-lg p-4 w-80" key={id}>
      <div>
        {media && <img src={media} alt="noimg" className="rounded-lg"/>}
        <p className="text-white">{content}</p>
      </div>
    </div>
  );
};

export default Post;
