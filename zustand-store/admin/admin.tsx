import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AdminStore {
  loading: boolean;
  success: boolean;
  error: string;
  acceptHandler: (blogId: string) => Promise<void>;
}
const adminStore = create<AdminStore>((set) => ({
  loading: false,
  success: false,
  error: '',
  acceptHandler: async (blogId: string) => {
    const data = Cookies.get('token');
    if (!data) {
      set({ error: 'You have to log in first!' });
      return;
    }
    const parsed = JSON.parse(data);
    set({ loading: true, error: '' });
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'blog/approve/' + blogId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + parsed,
      },
      body: JSON.stringify({
        id: blogId,
      }),
    });
    if (!response.ok) {
        console.log(response);
      set({ loading: false, error: "error occured!", success: false });
    }
    const res = await response.json();
    console.log(res);
    set({ loading: false, error: '', success: true });
  },
}));

export default adminStore;
