"use client";
import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import Comments from "./Comments";
import Comment from "./Comment";
import { GrLike } from "react-icons/gr";
import BlogBottom from "./BlogBottom";
import Image from "next/image";
import logo from "@/public/assets/dev_logo.png";
import { BlogItem, CompProps } from "@/interfaces/interfaces";
import Link from "next/link";
import AdminControls from "./AdminControls";
import useLogin from "@/zustand-store/loginStore/Login";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
const Blog: React.FC<CompProps> = ({ blog, details, isDetail, pending }) => {
  const [file, setFile] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const router = useRouter();
  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) {
      return router.push("/auth/login");
    }
    const data = JSON.parse(user);
    setRole(data?.user?.role);
  }, []);
  const created = new Date(blog?.createdAt).toLocaleDateString("en-US");
  return (
    <>
      {details ? (
        <Link href={`/blog/${blog?._id}`}>
          <div className="cursor-pointer max-w-full w-full flex flex-col rounded-md overflow-hidden bg-white mb-5">
            <div className="w-full h-60">
              <img
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:cursor-pointer object-center"
                src={blog?.image}
                alt="blog banner"
              />
            </div>
            <div className="px-5">
              {
                <div className="flex justify-start items-center my-3">
                  {/* picture */}
                  <div className="h-11 rounded-full w-11 overflow-hidden">
                    <img src={blog?.user?.image} alt="user" />
                  </div>

                  {/* user details */}
                  <div
                    className={`flex mx-4 flex-col gap-0 justify-center  ${
                      blog?.user?.image ? "items-start" : "items-center"
                    }`}
                  >
                    <p className="font-bold leading-4 cursor-pointer hover:underline">
                      {blog?.user?.name}
                    </p>
                    <span className="font-light text-sm leading-4 mx-auto">
                      {created}
                    </span>
                  </div>
                </div>
              }
              {/* heading */}
              <h1 className="hover:text-indigo-400 cursor-pointer leading-9 w-full md:w-4/5 mx-auto text-3xl font-extrabold text-center">
                {blog?.heading}
              </h1>
              {/* tags */}
              <div className="text-center my-3">
                <span className="text-gray-700 italic text-base text-center">
                  #github #git
                </span>
              </div>
              <p className="post text my-5 break-words">{blog?.text ? parse(blog?.text) : ""}</p>
              {/* comments and reactions buttons */}
              {isDetail && role !== "admin" && (
                <BlogBottom
                  id={blog?._id}
                  show={false}
                  comments={blog?.comment}
                  reactions={blog?.reaction}
                />
              )}
            
            </div>
          </div>
        </Link>
      ) : (
        <div className="cursor-pointer max-w-full w-full flex flex-col rounded-md overflow-hidden bg-white mb-5">
          <div className="w-full h-60">
            <img
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:cursor-pointer object-center"
              src={blog?.image}
              alt="blog banner"
            />
          </div>
          <div className="px-5">
            {
              <div className="flex justify-start items-center my-3">
                {/* picture */}
                <div className="h-11 rounded-full w-11 overflow-hidden">
                  {blog?.user?.image && (
                    <img src={blog?.user?.image} alt="user" />
                  )}
                </div>

                {/* user details */}
                <div className="flex mx-4 flex-col gap-0 justify-center items-start">
                  <p className="font-bold leading-4 cursor-pointer hover:underline">
                    {blog?.user?.name}
                  </p>
                  <span className="font-light text-sm leading-4">
                    {created}
                  </span>
                </div>
              </div>
            }
            {/* heading */}
            <h1 className="hover:text-indigo-400 cursor-pointer leading-9 w-full md:w-4/5 mx-auto text-3xl font-extrabold text-center">
              {blog?.heading}
            </h1>
            {/* tags */}
            <div className="text-center my-3">
              <span className="text-gray-700 italic text-base text-center">
                #github #git
              </span>
            </div>
            <p className="post text my-5 break-words">{blog?.text ? parse(blog?.text) : ""}</p>
            {/* comments and reactions buttons */}
            {isDetail &&  (
              <BlogBottom
                id={blog?._id}
                show={true}
                comments={blog?.comment}
                reactions={blog?.reaction}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
