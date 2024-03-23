"use client"
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import ClipLoader from "react-spinners/ClipLoader";
const UserCard = ({user, refetchUsers}) => {
    const [loading, setLoading] = useState(false);
    const onChangeUserStatus = async () => {
        setLoading(true);
        const data = Cookies.get("user");
        const userData = JSON.parse(data);
            const userStatus = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"auth/"+user?._id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + userData?.token
                },
                
            });
            if(!userStatus.ok){
                setLoading(false);
                const userStatusData = await userStatus.json();
                console.log(userStatusData.message);
            }
            const userStatusData = await userStatus.json();
            setLoading(false);
            refetchUsers();

    };
    const date = new Date(user?.createdAt).toLocaleDateString("en-US");
  return (  <div className='p-5 bg-indigo-100 rounded-lg gap-4 flex justify-between items-center'>
  <div className='h-24 w-24 rounded-full overflow-hidden'>
      <img className='object-center h-full w-full block' src="https://tse3.mm.bing.net/th?id=OIP.iSu2RcCcdm78xbxNDJMJSgHaEo&pid=Api&P=0&h=220" alt="jjjj" />
  </div>
  <div className=''>
      {user?.name} <br />
      ({user?.username})
  </div>
  <div className=''>
      {date}
  </div>
  <div className='text-gray-500 italic'>{user?.userStatus}</div>
  <div><button onClick={onChangeUserStatus} className='py-2 bg-indigo-700 text-white px-4'>{loading ? "Please wait..." :  user?.userStatus === "unblock" ? "Block User" : "Unblock User"}</button></div>
</div>
  )
}

export default UserCard