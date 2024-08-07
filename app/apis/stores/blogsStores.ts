import { create } from 'zustand';
import { RepositoryRemote } from '../services';

interface BlogsStore {
  loading: boolean;
  getBlogs: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;
}

export const useBlogsStore = create<BlogsStore>((set)=>({
  loading: false,
  getBlogs: async (query, onSuccess, onFail) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.blogs.getBlogs(query);
      onSuccess?.(response?.data?.data);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loading: false });
    }
  },
}));
