"use client"
import useLogin from "@/zustand-store/loginStore/Login";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { FcPortraitMode } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import Cookies from "js-cookie";
import {
  FcBiotech,
  FcHome,
  FcImport,
  FcRemoveImage,
  FcRules,
  FcTodoList,
} from "react-icons/fc";
import { FaCircleUser } from "react-icons/fa6";

const Options = () => {
    const path = usePathname();
    const {logout, role, isAuthenticated, token,  initialIsAuthenticated} = useLogin();
    const [user, setUser] = useState<any>(null)
    const router = useRouter();
    useLayoutEffect(()=> {
      const user = Cookies.get("user");
      if (!user) {
        return router.push("/auth/login");
      }
      const parsed = JSON.parse(user);
      setUser(parsed)

    }, [])
    console.log(user)
    const logOutHandler = () => {
      logout();
    };
  
 
  return (
    <ul className="inter-font flex flex-col justify-start items-start pl-3 md:sticky md:left-0 md:top-[80px]">
      {<Link className="w-full" href={user?.user?.role === "admin" ? "/blog/admin" : "/blog/home"}>
        <li className={`${path === "/blog/home" && "bg-indigo-200 underline"} flex justify-start items-center px-2 gap-4 text-md w-full py-3 cursor-pointer hover:bg-indigo-100 ${path === "/home" && "bg-indigo-100"} rounded hover:underline`}>
          <FcHome className="text-2xl" /> {user?.user?.role === "admin" ? "All Blogs" : " Timeline"}
        </li>
      </Link>}
      {initialIsAuthenticated && user?.user?.role !== "admin" && <Link className="w-full" href={"/blog/pending"}>
        <li className={` ${path === "/blog/pending" && "bg-indigo-200 underline"} flex justify-start items-center px-2 gap-4 text-md w-full py-3 cursor-pointer hover:bg-indigo-100 rounded hover:underline ${path === "/pending" && "bg-indigo-100"}`}>
          <FcBiotech className="text-2xl" /> Pending Posts
        </li>
      </Link>}
      {initialIsAuthenticated && user?.user?.role === "admin" && <Link className="w-full" href={"/blog/users"}>
        <li className={` ${path === "/blog/users" && "bg-indigo-200 underline"} flex justify-start items-center px-2 gap-4 text-md w-full py-3 cursor-pointer hover:bg-indigo-100 rounded hover:underline ${path === "/pending" && "bg-indigo-100"}`}>
          <FaCircleUser className="text-2xl" /> All Users
        </li>
      </Link>}
      {!initialIsAuthenticated&& <Link className="w-full" href={"/auth/login"}>
        <li className={`flex justify-start items-center px-2 gap-4 text-md w-full py-3 cursor-pointer hover:bg-indigo-100 rounded hover:underline ${path === "/pending" && "bg-indigo-100"}`}>
        <FcPortraitMode className="text-2xl" /> Login
        </li>
      </Link>}
      {!initialIsAuthenticated&& <Link className="w-full" href={"/auth/signup"}>
        <li className={`flex justify-start items-center px-2 gap-4 text-md w-full py-3 cursor-pointer hover:bg-indigo-100 rounded hover:underline ${path === "/pending" && "bg-indigo-100"}`}>
        <FcPlus className="text-2xl"/> Signup
        </li>
      </Link>}
      {initialIsAuthenticated&& <Link className="w-full" href={"/you"}>
        <li className={` flex justify-start items-center px-2 gap-4 text-md w-full py-3 cursor-pointer hover:bg-indigo-100 rounded hover:underline ${path === "/you" && "bg-indigo-100"}`}>
          <FcRules className="text-2xl" /> Profile
        </li>
      </Link>}
      {initialIsAuthenticated && user?.user?.role !== "admin" && <Link className="w-full" href={"/blog/posts"}>
        <li className={`${path === "/blog/posts" && "bg-indigo-200 underline"} flex justify-start items-center px-2 gap-4 text-md w-full py-3 cursor-pointer hover:bg-indigo-100 rounded hover:underline ${path === "/posts" && "bg-indigo-100"}`}>
          <FcTodoList className="text-2xl" /> My Posts
        </li>
      </Link>}
      {/* {initialIsAuthenticated && user?.user?.role !== "admin" && <Link className="w-full" href={"/blog/rejected"}>
        <li className={`${path === "/blog/rejected" && "bg-indigo-200 underline"} flex justify-start items-center px-2 gap-4 text-md w-full py-3 cursor-pointer hover:bg-indigo-100 rounded hover:underline ${path === "/rejected" && "bg-indigo-100"}`}>
          <FcRemoveImage className="text-2xl" /> Rejected
        </li>
      </Link>} */}
      
       {initialIsAuthenticated&& <li onClick={logOutHandler} className="flex justify-start items-center px-2 gap-4 text-md w-full py-3 cursor-pointer  hover:bg-indigo-100 rounded hover:underline">
          <FcImport className="text-2xl" /> Log Out
        </li>}
      
    </ul>
  );
};
export default Options;
