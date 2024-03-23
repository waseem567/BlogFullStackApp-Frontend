import { BlogItem, BlogStore } from "@/interfaces/interfaces";
import { create } from "zustand";
import Cookies from "js-cookie";
const blogStore = create<BlogStore>((set) => ({
  // getting all blogs
  blogs: [],
  isInitial: true,
  loading: false,
  error: false,
  getAllBlogs: async () => {
    set({ loading: true, error: false, blogs: [], isInitial: false });
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL+"blog/get-blogs"
      );
      if (!response.ok) {
        set({ loading: false, error: true, blogs: [], isInitial: false });
      } else {
        const data: BlogItem[] = await response.json();
        set({ loading: false, error: false, blogs: data, isInitial: false });
      }
    } catch (error) {
      set({ loading: false, error: true, blogs: [], isInitial: false });
    }
  },
  // getting pending blogs
  pendingBlogs: [],
  pendingError: false,
  pending: false,
  pendingInitial: true,
  getPendingBlogs: async () => {
    const dataToken = Cookies.get("user");
    if (!dataToken) {
      return;
    }
    const parsed = JSON.parse(dataToken);
    set({
      pendingError: false,
      pending: true,
      pendingBlogs: [],
      pendingInitial: false,
    });
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL+"blog/pending-blogs",
      {
        headers: {
          Authorization: "Bearer " + parsed?.token,
        },
      }
    );
    if (!response.ok) {
      set({
        pendingError: true,
        pending: false,
        pendingBlogs: [],
        pendingInitial: false,
      });
      return;
    }
    const data = await response.json();
    set({
      pendingError: false,
      pending: false,
      pendingBlogs: data,
      pendingInitial: false,
    });
  },
  blog: null,
  fetching: false,
  fetchingError: false,
  getBlog: async (id) => {
    set({ blog: null, fetching: true, fetchingError: false });
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"blog/" + id);
    if (!response.ok) {
      set({ blog: null, fetching: false, fetchingError: true });
      return;
    }
    const data = await response.json();
    set({ blog: data, fetching: false, fetchingError: false });
    console.log(data);
  },
}));

export default blogStore;
