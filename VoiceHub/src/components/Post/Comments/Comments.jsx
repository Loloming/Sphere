import React from "react";
import Comment from "../Comment/Comment";
import SendComment from "../Comment/SendComment";

export default function Comments({ comments, post_id }) {
  return (
    <>
      <div className="w-full p-4 mt-4 flex flex-col gap-4 items-start h-full overflow-y-scroll scrollbar-thumb-ten-percent scrollbar-track-transparent scrollbar-thin mb-1">
        {comments[0] ? (
          comments.map((comment, index) => {
            return (
              <Comment
                user={comment.User.username}
                content={comment.content}
                key={index}
              />
            );
          })
        ) : (
          <h3 className="bg-ten-percent p-1 rounded-xl">Sé el primero en comentar...</h3>
        )}
      </div>
      <div>
        <SendComment post_id={post_id} />
      </div>
    </>
  );
}
