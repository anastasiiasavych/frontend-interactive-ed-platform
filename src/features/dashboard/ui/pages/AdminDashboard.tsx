import React from 'react';
import { useAppSelector } from '@hooks/redux';
import { useQuery } from 'react-query';
import api from '@lib/api/client';
import { useNavigate } from 'react-router-dom';

interface Stats {
  totalUsers: number;
  totalCourses: number;
  activeCourses: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  const { data: stats, isLoading } = useQuery<Stats>('adminStats', async () => {
    return await api.get('/admin/stats');
  });

  if (!isAuthenticated || role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md">
          <div className="bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-red-600 text-3xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You must be an administrator to access this dashboard.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Admin Dashboard
          </h1>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg inline-block">
            <p className="font-bold">Redux & React Query: Active</p>
            <p>User: {isAuthenticated ? 'Logged in' : 'Not logged in'}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
                <div className="bg-blue-100 rounded-full p-3">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-blue-600">{stats?.totalUsers || 0}</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Total Courses</h3>
                <div className="bg-purple-100 rounded-full p-3">
                  <span className="text-2xl">📚</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-purple-600">{stats?.totalCourses || 0}</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Active Courses</h3>
                <div className="bg-green-100 rounded-full p-3">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-green-600">{stats?.activeCourses || 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
