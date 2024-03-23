"use client"
import React, { useState } from 'react'
import { FcCheckmark } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import adminStore from '@/zustand-store/admin/admin';
import Cookies from 'js-cookie';
interface controlsProps{
    id: string;
    status: string;
    onMarkReject: (id:string) => void;
    onMarkApproved: (id:string) => void;
}
const AdminControls:React.FC<controlsProps> = ({id, status, onMarkApproved, onMarkReject}) => {
  const [loading, setLoading] = useState(false);
  const [rejecting, setRejection] = useState(false);
    const {acceptHandler} = adminStore();
    const onAcceptBlog = async () => {
      setLoading(true);
      const data = Cookies.get('user');
    const parsed = JSON.parse(data);
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'blog/approve/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + parsed.token,
        },
        body: JSON.stringify({
          id,
        }),
      });
      if(!response.ok){
        setLoading(false);
        alert("error occured!");
      }
      const res = await response.json();
      console.log(res);
      onMarkApproved(id);
      setLoading(false);
    };
    const onRejectBlog = async() => {
      setRejection(true);
      const data = Cookies.get('user');
    const parsed = JSON.parse(data);
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'blog/reject/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + parsed.token,
        },
        body: JSON.stringify({
          id,
        }),
      });
      if(!response.ok){
        setRejection(false);
        alert("error occured!");
      }
      const res = await response.json();
      console.log(res);
      onMarkReject(id);
      setRejection(false);
    };
  return (
    <div className='w-full p-5 grid grid-cols-2 gap-2'>
        <button onClick={onAcceptBlog} className={`hover:bg-green-100 bg-green-50 py-3 rounded-lg flex justify-center items-center text-xl text-green-600 ${loading && "animate-bounce"}`}><FcCheckmark className='text-2xl mx-2' /> Accept Blog</button>
        {status !== "rejected" && <button onClick={onRejectBlog} className={`hover:bg-red-100 bg-red-50 py-3 rounded-lg flex justify-center items-center text-xl text-red-600 ${rejecting && "animate-pulse"}`}><RxCross2 className='text-2xl mx-2' />Reject Blog</button>
    }
    </div>
  )
}

export default AdminControls