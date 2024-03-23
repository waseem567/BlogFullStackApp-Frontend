import React from 'react';
import Marquee from 'react-fast-marquee';
import Card from './Card';

function Community() {
  return (
    <div className="bg-community protest-revolution-regular flex flex-col justify-center items-center gap-6 absolute w-screen top-0 left-[50%] h-[800px] ml-[-50vw]">
      <p className="sm:text-[3rem] text-3xl px-4 sm:px-1 tracking-tighter font-bold leading-[3rem] text-center my-5">Don't just take our word for it, <br /> <span className="text-indigo-500">trust the community!</span></p>
      <Marquee pauseOnHover direction='left'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </Marquee>
    <Marquee pauseOnHover direction='right'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </Marquee>
    <Marquee pauseOnHover direction='left'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </Marquee>
    </div>
 
   
  )
}

export default Community