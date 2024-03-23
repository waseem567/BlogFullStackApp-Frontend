"use client";
import { useEffect, useLayoutEffect } from "react";
import Blog from "./Blog";
import Notification from "./Notification";
import Options from "./Options";
import blogStore from "@/zustand-store/blogStore/Blog";
import BlogSkelton from "./BlogSkelton";
import { FcCancel, FcDislike } from "react-icons/fc";
const BlogHome: React.FC = () => {
  const { getAllBlogs, blogs, loading, error, isInitial } = blogStore();
  useLayoutEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div className="grid-inner mx-auto gap-4 w-full">
      <div className="mb-5">
        {/* blog component */}
        {!loading && !isInitial && blogs?.map((blog) => <Blog pending={false} isDetail={false} key={blog._id} blog={blog} details={true} />)}
        {loading && (
          <>
            <BlogSkelton />
            <BlogSkelton />
          </>
        )}
        {!error && !loading && blogs.length === 0 && !isInitial && <div className="flex justify-center text-6xl flex-col items-center"><FcCancel /> <p className=" text-xl">No Blog Availble!</p></div>}
        {error && <><div className="text-center pt-2 text-4xl mx-auto flex justify-center"><FcDislike /></div> <h1 className="text-center rubik-broken ">Server error occurred! <br /> Please try again later.</h1>
        <button className="bg-indigo-800 my-6 text-white mx-auto block py-2 w-56 ">Try Again</button></>}
      </div>
      <div className="not">
        {/* notification wrapper */}
        <Notification />
      </div>
    </div>
  );
};

export default BlogHome;
