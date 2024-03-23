"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useSignUp from "../../../zustand-store/signupStore/Signup";
import useValidation from "@/hooks/useValidation";
import { User, PassVisibility } from "@/interfaces/interfaces";
import useLogin from "@/zustand-store/loginStore/Login";

const Signup = () => {
  const { loading, httpReqError, success, signUpHandler } = useSignUp();
  const {initialIsAuthenticated} = useLogin();
  const { error, validateUser } = useValidation();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageIsValid, setImageIsValid] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState<PassVisibility>({
    password: false,
    confirmPass: false,
  });
  const [user, setUser] = useState<any>({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // on pick an image
  const onPickUserImage = (event: any) => {
    if (
      event?.target?.files[0]?.type === "image/png" ||
      event?.target?.files[0]?.type === "image/jpg"
    ) {
      setImageIsValid(true);
      setImage(event.target.files[0]);
    } else {
      setImageIsValid(false);
      return;
    }
  };
   // check if user is authenticated
   useLayoutEffect(() => {
    const authentication = async () => {
      if (initialIsAuthenticated) {
        router.push("/");
      }
    }; 
    authentication();
  }, []);
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
 
  // on pick img btn click
  const pickImageHandler = () => {
    imageRef?.current?.click();
  };
  const onAddNewUserHandler = async (e: any) => {
    e.preventDefault();
    const validate = validateUser(
      {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      },
      image,
      "signup"
    );
    //  submitting user
    if (validate) {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("username", user.username);
      formData.append("file", image ? image : "");
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("role", "writer");
      formData.append("userStatus", "unblock");
      await signUpHandler(
        "http://localhost:3001/auth/signup",
        "POST",
        formData
      ); 
    }
  };
  useEffect(()=> {
    if (success) {
      router.replace("/auth/login");
    } else {
      return;
    }
  }, [success])
  return (
    <>
      <div className="min-h-screen flex flex-col pt-28 items-center px-2 inter-font">
        <img
          className="block w-[60px] h-10"
          src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png"
          alt="auth logo"
        />
        <h1 className="text-center font-bold text-lg">
          Join the dev community
        </h1>
        <p>We are a community of million of people.</p>
        {/* form */}
        <form
          onSubmit={onAddNewUserHandler}
          className="md:w-[600px] sm:w-[500px] w-full m-2 bg-gray-100 border rounded p-5 my-5 flex flex-col gap-3 justify-center items-center"
        >
          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span> Pick your image
            <span className="font-extralight text-sm">
              {" "}
              (only PNG and JPG){" "}
            </span>
          </label>
          <div className="border w-full bg-gray-50">
            <input
              ref={imageRef}
              type="file"
              className="hidden w-full"
              onChange={onPickUserImage}
            />
            <button
              type="button"
              onClick={pickImageHandler}
              className="hover:bg-slate-200 py-2 flex h-full w-full justify-center"
            >
              Pick File
            </button>
          </div>
          {imageIsValid && (
            <div className="h-48 w-48 border mx-auto">
              <img
                src={image ? URL.createObjectURL(image) : ""}
                alt="preview"
              />
            </div>
          )}
          <p className="w-full text-red-500 text-start">
            {!imageIsValid && imageIsValid !== null && "invalid image format"}
            {error?.image !== "" && error?.image}
          </p>
          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span>Username{" "}
            <span className="font-extralight text-sm">
              {" "}
              (must have letters and numbers : example123){" "}
            </span>
          </label>
          <input
            type="text"
            className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
            name="username"
            value={user.username}
            onChange={onChangeFieldsValue}
          />
          <p className="w-full text-red-500 text-start">
            {error.username !== "" && error.username}
          </p>
          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span>Name
          </label>
          <input
            type="text"
            className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
            name="name"
            onChange={onChangeFieldsValue}
            value={user.name}
          />
          <p className="w-full text-red-500 text-start">
            {error.name !== "" && error.name}
          </p>
          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span>Type
          </label>
          <select
            className="block w-full py-2 outline-none cursor-pointer text-gray-500 text-sm"
          >
            <option value="writer">Writer</option>
          </select>
          
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
            <p className="w-full text-red-500 text-start">
              {error.password !== "" && error.password}
            </p>
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
          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span>Confirm Password
          </label>
          <div className="w-full relative">
            <input
              type={`${showPassword.confirmPass ? "text" : "password"}`}
              className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
              name="confirmPassword"
              onChange={onChangeFieldsValue}
              value={user.confirmPassword}
            />
            <p className="w-full text-red-500 text-start">
              {error.confirmPassword !== "" && error.confirmPassword}
            </p>
            {!showPassword.confirmPass ? (
              <IoEye
                onClick={() => showPasswordHandler("conPass")}
                className="absolute top-[50%] right-2 translate-y-[-50%] text-2xl cursor-pointer text-red-400"
              />
            ) : (
              <IoEyeOff
                onClick={() => hidePasswordHandler("conPass")}
                className="absolute top-[50%] right-2 translate-y-[-50%] text-2xl cursor-pointer"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-5 py-2  text-white block w-full rounded font-mono  ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-700 hover:bg-indigo-600"
            }`}
          >
            {loading ? "Please Wait" : "Create Account"}
          </button>
          <p className="w-full text-start text-red-500">
            {Array.isArray(httpReqError?.message)
              ? httpReqError?.message?.map((error: string) => (
                  <>
                    {error} <br />
                  </>
                ))
              : httpReqError?.message}
          </p>
        </form>
        <div className="font-mono py-5">
          Already a user?
          <Link href={"/auth/login"} className="text-indigo-500">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
