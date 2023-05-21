import React from "react";
import Comment from "../Comment/Comment";
import SendComment from "../Comment/SendComment";

export default function Comments({ comments, post_id, isDetail, isReplying }) {
  const hasComments =
    "w-full h-26 max-h-44 bg-ten-percent mt-2 bg-opacity-5 p-4 m-0 flex flex-col gap-4 items-start overflow-y-scroll scrollbar-thumb-ten-percent scrollbar-track-transparent scrollbar-thin mb-0";
  const noComments =
    "w-full h-26 max-h-44 bg-ten-percent mt-2 bg-opacity-5 p-4 m-0 flex flex-col gap-4 items-center justify-center overflow-y-scroll scrollbar-thumb-ten-percent scrollbar-track-transparent scrollbar-thin";
  const isDetailedWithComments =
    "w-full h-full max-h-80 bg-ten-percent mt-2 bg-opacity-5 p-4 m-0 flex flex-col items-start overflow-y-scroll scrollbar-thumb-ten-percent scrollbar-track-transparent scrollbar-thin mb-0";
  const isDetailedWithoutComments =
    "w-full h-full max-h-80 bg-ten-percent mt-2 bg-opacity-5 p-4 m-0 flex flex-col gap-4 items-center justify-center overflow-y-scroll scrollbar-thumb-ten-percent scrollbar-track-transparent scrollbar-thin";

  return (
    <div className="w-full">
      <div className={!isDetail && comments && comments[0] ? hasComments : noComments || isDetail && comments && comments[0] ? isDetailedWithComments : isDetailedWithoutComments}>
        {comments && comments[0] ? (
          comments.map((comment, index) => {
            return (
              <Comment
                user={comment.User.username}
                id={comment.id}
                replies={comment.Replies}
                content={comment.content}
                isDetail={isDetail}
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
      {isReplying ? null :<SendComment post_id={post_id} />}
    </div>
  );
}
