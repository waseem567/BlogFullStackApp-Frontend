"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import RoundedImage from "./RoundedImage";
import useLogin from "@/zustand-store/loginStore/Login";
import Cookies from "js-cookie";
import commentsStore from "@/zustand-store/commentStore/comment";
interface adminControlsProps {
  id: string;
}
const Comments: React.FC<adminControlsProps> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [button, setButton] = useState(false);
  const {commentAddHandler} = commentsStore();
  useEffect(() => {
    if (comment.trim() !== "") {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [comment]);

  const onAddComment = async () => {
    if (comment === "") {
      alert("Please add a comment");
      return;
    }
    await commentAddHandler(comment, id);
    setComment("");
  };

  return (
    <div className="border-t w-full py-5">
      <div className="flex gap-5 my-5">
        <RoundedImage
          url={
            "https://media.dev.to/cdn-cgi/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1273401%2Fc45e15ed-3b83-4c62-acf2-dd5efb809a41.png"
          }
        />
        <div className="w-full flex flex-col">
          <textarea
            className="border rounded-md w-full outline-none p-3"
            name="postContent"
            rows={7}
            placeholder="Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {button && (
            <button
              onClick={onAddComment}
              disabled={loading}
              className="cursor-pointer my-4 hover:underline hover:bg-indigo-500 bg-indigo-700 text-white py-2 rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <hr />
      {/* rendering comments */}
    </div>
  );
};

export default Comments;
