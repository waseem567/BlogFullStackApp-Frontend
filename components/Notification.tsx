import React from 'react'

function Notification() {
  return (
    <div className='md:sticky md:left-0 md:top-[80px] font-sans font-semibold bg-white rounded-md px-3 pt-5'>Notification
    <hr />
    <div className='not text-base font-light py-2 border-b'>
        <span className='font-bold'>You,</span> created a post, titled <span className='font-semibold'>Github is awesome</span> 
    </div>
    <div className='not text-base font-light py-2 border-b'>
        <span className='font-bold'>You,</span> created a post, titled <span className='font-semibold'>Github is awesome</span> 
    </div>
    </div>
  )
}

export default Notification;