"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Blog from "@/components/Blog";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";
import { FcCheckmark, FcEditImage, FcFullTrash } from "react-icons/fc";

import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
function page() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [initial, setInitial] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchUserBlogs = async () => {
      const userdata = Cookies.get("user");
      if (!userdata) {
        router.push("/auth/login");
      }
      setLoading(true);
      const user = JSON.parse(userdata);
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "blog/user-blogs",
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + user?.token,
          },
        }
      );
      if (!response.ok) {
        setLoading(false);
      }
      setInitial(false)
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
    };
    fetchUserBlogs();
  }, []);
  // on delete
  const onEditBlog = () => {};
  // on edit
  const onDeleteBlog = async (id:string) => {
    const userData = Cookies.get("user");
    if (!userData) {
      router.push("/auth/login");
    }
    setDeleting(true);
    const user = JSON.parse(userData);
    const deleteBlog = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "blog/delete/"+ id, {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + user?.token,
      },
    });
    if(!deleteBlog.ok){
      const blogData = await deleteBlog.json();  
      setDeleting(true);
      alert(blogData?.message);
      return;
    }
    const data = await deleteBlog.json();
    setBlogs(prev => blogs.filter(b => id !== b?._id));
    console.log(data);
    setDeleting(false);
  };
 
  return (
    <div className="grid-inner gap-4">
      <div className="w-full">
        {loading && (
          <div className="flex justify-center items-center flex-col">
            <div className="lds-heart">
              <div></div>
            </div>
            <p>Fetching your blogs...</p>
          </div>
        )}
        {!initial && blogs?.length === 0 && <div>No Blog Found...</div>}
        {blogs.map((blog) => (
          <div className="w-[300px] sm:w-full flex flex-col justify-center items-center mx-auto">
            <p
              className={`p-2 rounded-md my-3 ${
                blog?.status === "approved" && "bg-green-200"
              } ${blog?.status === "pending" && "bg-yellow-200 text-black"} ${
                blog?.status === "rejected" && "bg-red-200"
              }`}
            >
              {blog?.status}
            </p>
            <Blog
              blog={blog}
              details={false}
              isDetail={false}
              pending={false}
            />
            <div className="w-full grid sm:grid-cols-2 gap-2 grid-cols-1 mb-5">
              <Link className="w-full" href={"/edit/"+blog?._id}><button className="hover:bg-green-200 bg-green-50 py-3 rounded-lg flex justify-center items-center text-xl text-green-800 w-full">
                <FcEditImage className="text-2xl mx-2" onClick={onEditBlog} />{" "}
                Edit Blog
              </button></Link>
              <button onClick={() => {
                    onDeleteBlog(blog?._id);
                  }} className="hover:bg-red-100 bg-red-50 py-3 rounded-lg flex justify-center items-center text-xl text-red-600">
                <FcFullTrash
                  className="text-2xl mx-2"
                />
                {deleting ? "Deleting" : "Delete"} Blog
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="not">
        <Notification />
      </div>
    </div>
  );
}

export default page;
