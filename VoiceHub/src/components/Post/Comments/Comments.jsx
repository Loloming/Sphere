import React from "react";
import Comment from "../Comment/Comment";
import SendComment from "../Comment/SendComment";

export default function Comments({ comments, post_id }) {
  const hasComments =
    "w-full h-26 max-h-44 bg-ten-percent mt-2 bg-opacity-5 p-4 m-0 flex flex-col gap-4 items-start overflow-y-scroll scrollbar-thumb-ten-percent scrollbar-track-transparent scrollbar-thin mb-0";
  const noComments =
    "w-full h-26 max-h-44 bg-ten-percent mt-2 bg-opacity-5 p-4 m-0 flex flex-col gap-4 items-center justify-center overflow-y-scroll scrollbar-thumb-ten-percent scrollbar-track-transparent scrollbar-thin";

  return (
    <div className="w-full">
      <div className={comments[0] ? hasComments : noComments}>
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
          <h3 className="bg-ten-percent bg-opacity-5 text-slate-400 p-1 rounded-xl">
            There is no comments...
          </h3>
        )}
      </div>
        <SendComment post_id={post_id} />
    </div>
  );
}
