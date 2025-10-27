import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@hooks/redux';
import { useQuery, useMutation } from 'react-query';
import api from '@lib/api/client';
import { setUser } from '@store/slices/authSlice';

const CourseEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const { courseId } = useParams<{ courseId: string }>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { data: course, isLoading } = useQuery(['course', courseId], async () => {
    return await api.get(`/courses/${courseId}`);
  }, {
    onSuccess: (data) => {
      setTitle(data.title || '');
      setDescription(data.description || '');
    },
  });

  const updateMutation = useMutation(
    async (formData: any) => {
      return await api.put(`/courses/${courseId}`, formData);
    },
    {
      onSuccess: (data) => {
        dispatch(setUser(data));
      },
    }
  );

  if (!isAuthenticated || role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You must be an administrator to edit courses.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ title, description });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h1 className="text-4xl font-bold text-white">Edit Course</h1>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 mt-4 inline-block">
              <p className="text-white font-semibold">Redux & React Query Active</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              {updateMutation.isError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                  Failed to update course. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={updateMutation.isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg disabled:opacity-50"
              >
                {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseEditor;
