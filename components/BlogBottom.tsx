"use client"
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import Comment from "./Comment";
import { GrLike } from "react-icons/gr";
import useLogin from "@/zustand-store/loginStore/Login";
import { useRouter } from "next/navigation";
import { CommentInterface } from "@/interfaces/interfaces";
import Cookies from "js-cookie";
interface BlogBottomProps {
  show: boolean;
  comments: CommentInterface[];
  reactions?: any[]; 
  id: string;
}

const BlogBottom: React.FC<BlogBottomProps> = ({
  show,
  comments = [],
  reactions = [], 
  id,
}) => {
  const {userId, token} = useLogin();
  const [isLiked, setIsLiked] = useState<boolean>(checkLike);
  
  const [allReactions, setReactions] = useState<any[]>(reactions);

  const router = useRouter();
console.log(userId)

  useEffect(() => {
    setReactions(reactions);
  }, [reactions]);

  useEffect(() => {
    setIsLiked(checkLike());
  }, [reactions]);

  function checkLike() {
   const userData = Cookies.get("user");
   if(!userData) {
    router.push("/auth/login")
   };
   const user = JSON.parse(userData);
    const like = reactions?.some((reaction) => reaction?.user === user?.user?._id);
    console.log(reactions)
    return like;
  }

  function toggleLike() {
    const index = allReactions?.findIndex((reaction) => reaction?.user === userId);
    if (index !== -1) {
      const updatedReactions = [...allReactions];
      updatedReactions.splice(index, 1);
      setReactions(updatedReactions);
    } else {
      const updatedReactions = [...allReactions, { user: userId, blog: id, reaction: "like" }];
      setReactions(updatedReactions);
    }
  }
  const userReactionHandle = async () => {
    const userData = Cookies.get("user");
    if(!userData){
      alert("You must be logged in to like a blog");
      router.push("/auth/login");
    }
    const user = JSON.parse(userData);
    setIsLiked(!isLiked);
    toggleLike();
    const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "reaction", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + user?.token, 
      },
      body: JSON.stringify({
        blog: id,
        reaction: "like",
      }),
    });
    const data = await resp.json();
    console.log(data);
  };
  const reverseComments = [...comments].reverse();

  return (
    <>
      <div className="flex justify-start items-center gap-5 pb-3">
        <p
          onClick={userReactionHandle}
          className="hover:bg-indigo-50 cursor-pointer w-max py-2 rounded-md px-2 text-gray-600 flex justify-start items-center lg:gap-4"
        >
          <span className="flex gap-2 justify-start items-center mx-2">
            {isLiked ? (
              <GrLike className="text-2xl text-blue-500" />
            ) : (
              <GrLike className="text-2xl" />
            )}
          </span>
          {allReactions?.length}
        </p>
        <p className="text-gray-600 hover:bg-indigo-50 cursor-pointer w-max py-2 rounded-md px-2 flex justify-start items-center gap-4">
          <span className="flex gap-2 justify-start items-center">
            <FaRegComment className="text-2xl" />
          </span>
          {comments?.length}
        </p>
        <p className="text-gray-600 hover:bg-indigo-50 cursor-pointer py-2 rounded-md px-2 text-end ml-auto w-max">
          <FaRegBookmark className="text-xl" />
        </p>
      </div>
      {show && (
        <>
          <Comments id={id} />
          {reverseComments?.length > 0 && reverseComments.map(comment => <Comment comment={comment} />)}
        </>
      )}
    </>
  );
};

export default BlogBottom;
