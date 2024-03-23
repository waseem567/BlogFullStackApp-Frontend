"use client";
import Blog from "@/components/Blog";
import BlogSkelton from "@/components/BlogSkelton";
import adminStore from "@/zustand-store/admin/admin";
import blogStore from "@/zustand-store/blogStore/Blog";
import React, { useLayoutEffect } from "react";
import { FcBiotech } from "react-icons/fc";

const Page: React.FC = () => {
  const { getPendingBlogs, pendingError, pending, pendingBlogs, pendingInitial } = blogStore();
  const {acceptHandler, error, loading, success} = adminStore();
  useLayoutEffect(() => {
    getPendingBlogs();
  }, [success]);
  console.log("pen => ",pendingBlogs);
  return (
    <div className="grid grid-pending gap-4">
      <div className="flex flex-col gap-5">
        {loading && <BlogSkelton />}
        {pending && <BlogSkelton />}
        {!pending &&
          !pendingError &&
          pendingBlogs.length > 0 &&
          pendingBlogs?.map((blog) => <Blog pending={true} isDetail={false} key={blog._id} blog={blog} details={false} />)}
        {!pendingInitial && !pending && pendingBlogs?.length === 0 && (
          <div className="text-center flex flex-col justify-center items-center">
            No Pending Post... <FcBiotech className="text-3xl animate-pulse" />
          </div>
        )}
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
