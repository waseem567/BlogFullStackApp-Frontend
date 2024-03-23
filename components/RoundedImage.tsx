import React from 'react'

function RoundedImage(props) {
  return (
    <div className="flex-center cursor-pointer h-[40px] rounded-full text-black hover:bg-indigo-200 w-[40px] overflow-hidden">
        <img className="block scale-150 h-full w-[200%]" src={props.url} alt="user" />
      </div>
  )
}

export default RoundedImage