"use client"
import { CiSearch } from "react-icons/ci";
import { RiNotification3Line } from "react-icons/ri";
import RoundedImage from "./RoundedImage";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import useLogin from "@/zustand-store/loginStore/Login";
import { useEffect, useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
const Navbar = () => {
  const { isAuthenticated, token, logout, initialIsAuthenticated } = useLogin();
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(false);
  useLayoutEffect(()=> {
    const userData = Cookies.get("user");
    if(!userData) {
      return;
    }
    const user = JSON.parse(userData);
    setUser(user.user);
  }, [])
  useEffect(() => { 
      setAuth(initialIsAuthenticated);
  }, [token, logout]);
  return (
    <div className="shadow protest-revolution-regular bg-white max-w-screen sm:min-w-screen w-screen mx-auto z-50 fixed left-0 top-0">
      <div className="container max-w-screen-xl mx-auto navbar-grid justify-between items-center h-14 z-50">
        <div className="flex justify-start gap-2">
          <div className="flex-center">
            <Link href={user?.user?.role !== "admin" ? "/blog/home" : "/blog/admin"}>
              <img
                className="min:h-[40px] cursor-pointer block h-[41px] min:w-[50px] w-[51px]"
                src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                alt="dev to"
              />
            </Link>
          </div>
          {initialIsAuthenticated && (
            <div className="h-[40px] relative md:w-[420px] w-full">
              <input
                className="outline-none border px-3 rounded-sm h-full w-full flex justify-start items-center p-1"
                type="text"
                placeholder="Search...."
              />
              <button className="absolute top-[50%] translate-y-[-50%] right-[2px] flex justify-center items-center cursor-pointer hover:bg-purple-100 rounded-sm px-2 h-[36px]">
                <CiSearch className="text-2xl hover:text-purple-700" />
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-end items-center gap-5 responsive_hide">
          {initialIsAuthenticated && user?.role !== "admin" && (
            <Link href={"/new"}>
              <button className="w-28 hover:bg-indigo-600 text-indigo-600 hover:text-white font-light h-[40px] px-3 rounded-lg border border-indigo-700">
                Create Post
              </button>
            </Link>
          )}
          {initialIsAuthenticated && (
              <button disabled={true} className=" bg-indigo-600 text-white font-light h-[40px] px-3 border border-indigo-700">
                {user?.role === "admin" ? "Admin Mode" : "Writer Mode"}
              </button>
          )}
          {!initialIsAuthenticated && (
            <Link href={"/auth/login"}>
              <button className="hover:bg-indigo-100 h-[40px] px-3 rounded-md">
                Login
              </button>
            </Link>
          )}
          {!initialIsAuthenticated && (
            <Link href={"/auth/signup"}>
              <button className="w-36 px-2 hover:bg-indigo-600 text-indigo-600 hover:text-white h-[40px] rounded-lg border border-indigo-700">
                Create Account
              </button>
            </Link>
          )}
          {initialIsAuthenticated && (
            <div className="flex-center cursor-pointer h-[40px] rounded-xl text-black hover:bg-indigo-200 w-[40px]">
              <RiNotification3Line className="text-2xl" />
            </div>
          )}
          {initialIsAuthenticated && (
            <Link href={"/you"}>
              <RoundedImage
                url={"https://avatars.githubusercontent.com/u/151015897?v=4"}
              />
            </Link>
          )}
        </div>
        {/* hamburger */}
        <div className="responsive_show ml-auto">
          <GiHamburgerMenu className="text-4xl" />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
