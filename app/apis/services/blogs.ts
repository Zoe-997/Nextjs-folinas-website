import { callApi } from '@/app/apis/index';

const getBlogs = (query: string) => {
  return callApi(`/api/blogs${query}`, 'get');
};

export const blogs = {
  getBlogs,
};