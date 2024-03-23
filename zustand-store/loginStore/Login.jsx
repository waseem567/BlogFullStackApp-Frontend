"use client";
import Cookies from "js-cookie";
import { create } from "zustand";

const useLogin = create((set) => ({
  initialIsAuthenticated : !!Cookies.get("user"),
  loading: false,
  success: false,
  httpReqError: null,
  name: "",
  username: "",
  created: null,
  token : null ,
  role: "ghost",
  userId: "",
  blocked: "",
  // isAuthenticated: async () => {
  //   const data = Cookies.get("token");
  //   if (!data) {
  //     set({ token: null, name: "", username: "", created: null });
  //     return false;
  //   }
  //   console.log(data);
  //   const parsed = JSON.parse(data);
  //   try {
  //     const auth = await fetch("https://blog-api-m5jf.vercel.app/auth/verify-user", {
  //       headers: {
  //         Authorization: `Bearer ${parsed}`,
  //       },
  //     });
  //     if (!auth.ok) {
  //       Cookies.remove("token");
  //       set({ token: null, name: "", username: "", created: null });
  //       return false;
  //     }
  //     const res = await auth.json();
  //     console.log(res)
  //     set({ userId: res.user._id, role: res.user.role, name: res.user.name, username: res.user.username, created: res.user.createdAt, initialIsAuthenticated: true});
  //     return true;
  //   } catch (error) {
  //     console.error("Error during authentication:", error);
  //     return false;
  //   }
  // },
  
  loginHandler: async (URL, method, credentials) => {
    Cookies.remove("user");
    set({ loading: true, httpReqError: null });
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"auth/login", {
        headers: {
          "Content-Type": "Application/json",
        },
        method,
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const httpReqErrorData = await response.json();
        set({ loading: false, success: false, httpReqError: httpReqErrorData });
        return;
      }
      const data = await response.json();
      if(data?.error){
        set({ loading: false, success: false, blocked: data?.message });
        return;
      }
      Cookies.set("user", JSON.stringify(data), {expires: 7});
      // Handle successful response
      set({
        loading: false,
        success: true,
        httpReqError: null,
        token: data.token,
        initialIsAuthenticated: true
      });
    } catch (httpReqError) {
      // Handle other httpReqErrors
      set({
        loading: false,
        success: false,
        httpReqError: httpReqError.message,
      });
    }
  },
  logout: () => {
    Cookies.remove("user");
    set({ token: null, name: "", username: "", created: null, initialIsAuthenticated: false });
  },
}));
export default useLogin;
