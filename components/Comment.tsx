import React from 'react'
import RoundedImage from './RoundedImage'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'


const Comment:React.FC<any> = ({comment}) => {
  const created = new Date(comment.createdAt).toLocaleDateString("en-US");
  
  return (
    <div className="border-t w-full py-5 z-10">
    <div className="flex gap-5">
      <RoundedImage
        url={comment?.user?.image}
      />
      <div className="w-full bg-[#F5F5F5] flex flex-col text-sm border comment p-5 relative z-50">
        <p className='text-base font-bold my-3'>{comment?.user?.name}<span className='text-sm italic font-light ml-6'>{created}</span></p>
       {comment?.comment}
       {/* <div className='text-xl flex justify-end items-center gap-2'>
        <FaRegEdit className='hover:text-indigo-700 cursor-pointer hover:scale-125 transition-all duration-300' />
        <MdOutlineDelete className='hover:text-red-700 cursor-pointer hover:scale-125 transition-all duration-300' />
        </div> */}
      </div>
    </div>
  </div>
  )
}

export default Comment