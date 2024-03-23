"use client"
import { create } from 'zustand';
import Cookies from 'js-cookie';
import blogStore from '../blogStore/Blog';
interface CommentsStore {
  loading: boolean;
  error: string;
  refetch: boolean;
  commentAddHandler: (comment: string, blogId: string) => Promise<void>;
}
const commentsStore = create<CommentsStore>((set) => ({
    loading: false,
    refetch: false,
    error: "",
    commentAddHandler: async (comment: string, blogId: string) => {
      const userData = Cookies.get("user");
      
      if (!userData) {
        set({ error: "You have to log in first!" });
        return;
      }
      const user = JSON.parse(userData);
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({
          comment: comment,
          blog: blogId,
        }),
      });
      const resp = await response.json();
      console.log(resp);
      
      set((state) => ({ ...state, refetch: !state.refetch }));
    },
  }));
  
  export default commentsStore;
  
