import React from 'react'
import RoundedImage from './RoundedImage'

function Card() {
  return (
    <div className='max-h-40 h-40 p-5 overflow-hidden rounded-md border-2 bg-com__card w-[445px] mx-3'>
        <div className='flex justify-start items-center'>
            <RoundedImage  url={"https://cdn.hashnode.com/res/hashnode/image/upload/v1691161791905/4bfc655c-14c6-4b22-9b00-e5c3ed28b785.jpeg?w=100&h=100&auto=format,compress"} />
            <div className='flex justify-center items-start flex-col ml-3'>
                <span className='font-semibold leading-4'>Muhammad Waseem</span>
                <span className='text-sm font-light leading-4'>Mern dev</span>
            </div>
        </div>
        <div className='py-3'>Thank God for @hashnode's revision history. I swiped to the left with 2 fingers and my browser went to the previous page I visited. On coming back to my draft, ...</div>
    </div>
  )
}

export default Card