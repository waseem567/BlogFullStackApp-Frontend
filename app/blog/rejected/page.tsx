"use client";
import Blog from "@/components/Blog";
import BlogSkelton from "@/components/BlogSkelton";
import adminStore from "@/zustand-store/admin/admin";
import blogStore from "@/zustand-store/blogStore/Blog";
import React, { useLayoutEffect } from "react";
import { FcBiotech } from "react-icons/fc";
import Cookies from "js-cookie";
const Page: React.FC = () => {
  const getAllMyBlogs = async() => {
    const userData = Cookies.get("user")
    if(!userData){
      return 
    }
    const myBlogs = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL, {
      headers: { 
        "Authorization": "Bearer "
      }
    })
  };
  // useEffect(() => {
  //   getAllMyBlogs();
  // }, []);
  
  return (
    <div className="grid grid-pending gap-4">
      <div className="flex flex-col gap-5">
        <div>Working on rejected page</div>
        {<BlogSkelton />}
      </div>
      <div className="h-max md:sticky md:left-0 md:top-[70px] font-sans font-semibold bg-white rounded-md px-3 py-5">
        Pending Posts
        <hr />
        <div className="not text-base font-light py-2">200 Posts</div>
        <div className="not text-base font-light py-2">200 Posts</div>
      </div>
    </div>
  );
};

export default Page;
