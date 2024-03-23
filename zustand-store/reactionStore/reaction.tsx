import {create } from 'zustand';


const reactionStore = create((set) => ({
    reactions: [],
    loading: false,
    error: false,
    getAllReactions: async () => {
        set({ loading: true, error: false, reactions: [] });
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"get-reactions");
            const data = await response.json();
            set({ loading: false, error: false, reactions: data });
        } catch (error) {
            set({ loading: false, error: true, reactions: [] });
        }
    }
}));