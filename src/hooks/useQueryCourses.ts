import { useQuery } from 'react-query';
import api from '../lib/api/client';

export const useCourses = () => {
  return useQuery('courses', async () => {
    const response = await api.get('/courses');
    return response;
  });
};

export const useCourse = (id: string | undefined) => {
  return useQuery(['course', id], async () => {
    const response = await api.get(`/courses/${id}`);
    return response;
  }, {
    enabled: !!id,
  });
};

