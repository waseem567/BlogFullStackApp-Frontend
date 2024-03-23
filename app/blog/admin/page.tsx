"use client"
import AdminBlog from '@/components/AdminBlog'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import useLogin from '@/zustand-store/loginStore/Login'
import { useRouter } from 'next/navigation'

const page = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {initialIsAuthenticated, logout} = useLogin();
    useEffect(()=> {
        if(!initialIsAuthenticated && logout){
            router.push("/auth/login");
        }
    }, [initialIsAuthenticated, logout ])
    useEffect(()=> {
        const getAdminBlogs = async () => {
            setLoading(true)
            const user = Cookies.get("user")
            const userData = JSON.parse(user);
            const adminBlogs = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "blog/admin-blogs", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+ userData.token
                }
            })
            if(!adminBlogs.ok){
                setLoading(false);
            }
            const blogs = await adminBlogs.json(); 
            setBlogs(blogs);
            setLoading(false);
        }
        getAdminBlogs()
    }, []);
    const onAcceptBlog = (id:string) => {
        setBlogs((prev) => {
            // Use map to iterate over the array and update the specific blog
            return prev.map((blog) => {
                // Check if the current blog has the matching id
                if (blog._id === id) {
                    // If it does, update the status field to "approved"
                    return { ...blog, status: "approved" };
                }
                // If not, return the blog as it is
                return blog;
            });
        });
    };
    const rejectBlog = (id:string) => {
        setBlogs((prev) => {
            // Use map to iterate over the array and update the specific blog
            return prev.map((blog) => {
                // Check if the current blog has the matching id
                if (blog._id === id) {
                    // If it does, update the status field to "approved"
                    return { ...blog, status: "rejected" };
                }
                // If not, return the blog as it is
                return blog;
            });
        });
    };
    
  return (
    <div>
        {blogs.length > 0 && blogs.map(blog => <> <p
              className={`p-2 rounded-md my-3 ${
                blog?.status === "approved" && "bg-green-200"
              } ${blog?.status === "pending" && "bg-yellow-200 text-black"} ${
                blog?.status === "rejected" && "bg-red-200"
              }`}
            >
              {blog?.status}
            </p><AdminBlog blog={blog} onMarkApp={onAcceptBlog} onRej={rejectBlog}  /></>)}
        
    </div>
  )
}

export default page