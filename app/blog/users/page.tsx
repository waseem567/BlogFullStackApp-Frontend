"use client";
import UserCard from "@/components/UserCard";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const page = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [fetchState, setFetchState] = useState("initial");
  const [refetch, setRefetch] = useState(false);
  // fetching users
  const fetchingUsers = async () => {
    setFetchState("api")
    const userData = Cookies.get("user");
    if(!userData) return;
    const user = JSON.parse(userData);
    setLoading(true);
    const users = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "auth/users", {
      method: "GET",
      headers: {
        authorization: "Bearer " + user?.token,
      },
    });
    if (!users.ok) {
      setLoading(false);
      setUsers(null);
      setFetchState("error");
    }
    const usersData = await users.json();
    setUsers(usersData);
    setLoading(false);
    setFetchState("success")
  };
  useEffect(() => {
    const fetchUsers = async () => {
      await fetchingUsers();
    };
    fetchUsers();
  }, [refetch]);
  const onRefetch = () => {
    setRefetch(prev => !prev)
  };
  return <div className="flex flex-col gap-5">
  {users?.length > 0 && users?.map(user => <UserCard refetchUsers={onRefetch} user={user} />)}
  {fetchState === "error" && <div>Error occurred!</div>}
  {fetchState === "initial" && !loading && <div>Loading...</div>}
  {loading && <div>Fetching users...</div>}
  </div>;
};

export default page;
