import React from 'react'
import { FcLike } from 'react-icons/fc'

function Footer() {
  return (
    <div className='relative bg-gray-50 md:p-10  flex flex-col gap-3'>
           <div className='text-center text-sm text-gray-600'><span className='text-indigo-500'>DEV Community</span>
           — A constructive and inclusive social network for software developers. With you every step of your journey.</div>
           <div className='flex justify-center'>
            <ul className='flex justify-center items-center text-indigo-500 list-disc gap-5 flex-wrap'>
                <li className='mx-2 cursor-pointer'>Home</li>
                <li className='mx-2 cursor-pointer'>Blogs</li>
                <li className='mx-2 cursor-pointer'>Pending</li>
                <li className='mx-2 cursor-pointer'>About</li>
                <li className='mx-2 cursor-pointer'>Contact</li>
                <li className='mx-2 cursor-pointer'>FAQs</li>
            </ul>
           </div>
           <div className='flex flex-row items-center justify-center text-sm text-gray-500 gap-0'>Made with <FcLike className='mx-1' /> & Nextjs and Nestjs</div>
        <div className="absolute h-36 z-[-1] left-[50%] top-0 w-screen ml-[-50vw] bg-gray-50">
         
        </div>
    </div>
  )
}

export default Footer