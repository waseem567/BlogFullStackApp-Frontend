"use client";
import React, { useState } from "react";
import parse from 'html-react-parser';
interface BlogDemo{
    text: string;
    image: string;
    heading: string;
}
const BlogDemo:React.FC<BlogDemo> = ({text, image, heading}) => {
  return (
    <>
      <div className="cursor-pointer max-w-full w-full flex flex-col rounded-md overflow-hidden bg-white mb-5">
        <div className="w-full h-60">
          {image ? <img
            className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:cursor-pointer object-center"
            src={image}
            alt="blog banner"
          /> : <div className="h-full w-full bg-gray-50 flex justify-center items-center"><div className="border-2 border-dotted p-5">Please Add Image</div></div>}
        </div>
        <div className="px-5">
          
          {/* heading */}
          <h1 className="hover:text-indigo-400 cursor-pointer leading-9 w-full md:w-4/5 mx-auto text-3xl font-extrabold text-center p-5 break-words">
            {heading ? heading : "Heading goes here..."}
          </h1>
          <p className="my-5 break-words">{text ? parse(text)  : "Write text of the blog"}</p>
        </div>
      </div>
    </>
  );
};

export default BlogDemo;
