"use client";
import { PassVisibility } from "@/interfaces/interfaces";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useValidation from "@/hooks/useValidation";
import useLogin from "../../../zustand-store/loginStore/Login";
import { useRouter } from "next/navigation";

const Login = () => {
  const { loginHandler, loading, httpReqError, initialIsAuthenticated, token, blocked } = useLogin();
  console.log( token);
  const { error, validateUser } = useValidation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<PassVisibility>({
    password: false,
    confirmPass: false,
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // check if user is authenticated
  useEffect(() => {
    const authentication = async () => {
      if (initialIsAuthenticated) {
        router.push("/");
      }
    }; 
    authentication();
  }, [initialIsAuthenticated]);
  // on change states
  const onChangeFieldsValue = (e: any) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // show password in field
  const showPasswordHandler = (type: string) => {
    if (type === "pass") {
      setShowPassword((prev) => ({
        ...prev,
        password: true,
      }));
    } else {
      setShowPassword((prev) => ({
        ...prev,
        confirmPass: true,
      }));
    }
  };
  // hide password
  const hidePasswordHandler = (type: string) => {
    if (type === "pass") {
      setShowPassword((prev) => ({
        ...prev,
        password: false,
      }));
    } else {
      setShowPassword((prev) => ({
        ...prev,
        confirmPass: false,
      }));
    }
  };
  //   onsubmit login
  const onLoginHandler = async (e: any) => {
    e.preventDefault();
    // calling custom hook
    const validate = validateUser(
      { email: user.email, password: user.password },
     
      null,
      "login"
    );
    if (!validate) {
      return;
    }
    await loginHandler("http://localhost:3001/auth/login", "POST", {
      email: user.email,
      password: user.password,
    });
   
  };
  useEffect(()=> {
    if (initialIsAuthenticated) {
      router.push("/");
    } else {
      return;
    }
  }, [initialIsAuthenticated, loading, httpReqError, token]);
 
  return (
    <div className="inter-font md:h-screen pt-10 px-2 min-h-screen flex flex-col justify-center items-center">
      <img
        className="block w-[60px] h-10"
        src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png"
        alt="auth logo"
      />
      <h1 className="text-center font-bold text-lg">Join the dev community</h1>
      <p>We are a community of million of people.</p>
      <form
        onSubmit={onLoginHandler}
        className="md:w-[600px] sm:w-[500px] w-full bg-gray-100 p-5 border rounded flex flex-col gap-3 justify-center items-center"
      >
        <label className="text-start block w-full font-medium">
          <span className="text-red-500">*</span>Email
        </label>
        <input
          type="email"
          className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
          name="email"
          onChange={onChangeFieldsValue}
          value={user.email}
        />
        <p className="w-full text-red-500 text-start">
          {error.email !== "" && error.email}
        </p>
        <label className="text-start block w-full font-medium">
          <span className="text-red-500">*</span>Password
        </label>
        <div className="w-full relative">
          <input
            type={`${showPassword.password ? "text" : "password"}`}
            className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
            name="password"
            onChange={onChangeFieldsValue}
            value={user.password}
          />
          {!showPassword.password ? (
            <IoEye
              onClick={() => showPasswordHandler("pass")}
              className="absolute top-[50%] right-2 translate-y-[-50%] text-2xl cursor-pointer text-red-400"
            />
          ) : (
            <IoEyeOff
              onClick={() => hidePasswordHandler("pass")}
              className="absolute top-[50%] right-2 translate-y-[-50%] text-2xl cursor-pointer"
            />
          )}
        </div>
        <p className="w-full text-red-500 text-start">{error.password}</p>
        <button
        disabled={loading}
          type="submit"
          className={`mt-5 py-2 bg-indigo-700 text-white block w-full rounded font-mono hover:bg-indigo-600 ${loading? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
        <p className="w-full text-start text-red-500">
          {Array.isArray(httpReqError?.message)
            ? httpReqError?.message?.map((error: string) => (
                <>
                  {error} <br />
                </>
              ))
            : httpReqError?.message}
            {blocked}
        </p>
      </form>
      <div className="font-mono py-5">
        Do not have account?{" "}
        <Link href={"/auth/signup"} className="text-indigo-500">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
