import React, { useState } from "react";
import pp from "../../../assets/default.png";
import SendReply from "./SendReply";
import Comments from "../Comments/Comments";

export default function Comment({
  id,
  user,
  content,
  replies,
  audio,
  images,
  isDetail,
}) {
  const [reply, setReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <>
      <div className="flex flex-row flex-nowrap bg-ten-percent bg-opacity-5 rounded-md w-full items-center">
        <div className="flex flex-col items-center">
          <img
            src={pp}
            className="w-6 mb-0 rounded-full bg-sixty-percent cursor-pointer"
          />
          <p className="text-teal-50 font-normal text-xs cursor-pointer hover:underline">
            {user || "loading..."}
          </p>
        </div>
        <div>
          <p className="text-teal-50 font-normal rounded-xl p-1">{content}</p>
        </div>
      </div>
      {isDetail && (
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-end gap-4 pr-5 w-full h-fit">
            {replies && replies[0] && (
              <div className="w-full pl-16">
                <p onClick={() => {
                  setShowReplies(!showReplies)
                  setReply(!reply)
                  }} className="h-8 text-teal-50 font-medium cursor-pointer opacity-80">{showReplies ? 'Hide replies...' : 'Show replies...'}</p>
              </div>
            )}
            <p className="h-8 text-teal-50 font-medium cursor-pointer opacity-80">
              Like
            </p>
            <p
              onClick={() => setReply(!reply)}
              className="h-8 text-teal-50 font-medium cursor-pointer opacity-80"
            >
              Reply
            </p>
          </div>
          {showReplies && <Comments comments={replies} isReplying={true} isDetail={true}/>}
          {reply && <SendReply comment_id={id} />}
        </div>
      )}
    </>
  );
}
