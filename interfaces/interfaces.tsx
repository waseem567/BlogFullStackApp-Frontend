export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
}
export interface Error {
  image: string;
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
export interface PassVisibility {
  password: boolean;
  confirmPass: boolean;
}

// zustand store interfaces
export interface BlogItem {
  _id: string;
  status: string;
  reaction: any[];
  comment: CommentInterface[];
  heading: string;
  text: string;
  user: User;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface BlogStore {
  blogs: BlogItem[];
  loading: boolean;
  error: boolean;
  getAllBlogs: () => Promise<void>;
  pendingBlogs: BlogItem[];
  pendingError: boolean;
  pending: boolean;
  getPendingBlogs: () => Promise<void>
  blog: any;
  fetching: boolean;
  fetchingError: boolean;
  getBlog: (id: string) => Promise<void>;
  isInitial: boolean;
  pendingInitial: boolean;
}

// pending component
export interface CompProps {
  blog: BlogItem;
  details: boolean;
  isDetail: boolean;
  pending: boolean;
  // previewStatus: boolean;
  // imagePreView: string;
  // textPreview: string;
}

// comment component
export interface UserSub {
  username: string;
  name: string;
  image: string;
}

export interface CommentInterface {
  _id: string;
  user: UserSub;
  blog: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}