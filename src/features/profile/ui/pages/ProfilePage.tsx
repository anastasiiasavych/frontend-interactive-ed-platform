import React from 'react';
import { useAppSelector, useAppDispatch } from '@hooks/redux';
import { useMutation, useQuery } from 'react-query';
import api from '@lib/api/client';
import { setUser } from '@store/slices/authSlice';
import ProtectedRoute from '@shared/components/common/ProtectedRoute';
import LoadingSpinner from '@shared/components/common/LoadingSpinner';
import StatusBadge from '@shared/components/common/StatusBadge';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const { data: profileData, isLoading } = useQuery<User>('userProfile', async () => {
    return await api.get('/user/profile');
  });

  const updateProfileMutation = useMutation(
    async (userData: Partial<User>) => {
      return await api.put('/user/profile', userData);
    },
    {
      onSuccess: (data) => {
        dispatch(setUser(data));
      },
    }
  );

  if (isLoading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <ProtectedRoute accessDeniedMessage="You must be logged in to view your profile.">
      <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 inline-block">
              <p className="text-white font-semibold">Redux & React Query Active</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                <p className="text-xl text-gray-800">{profileData?.firstName || 'N/A'}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                <p className="text-xl text-gray-800">{profileData?.lastName || 'N/A'}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <p className="text-xl text-gray-800">{profileData?.email || 'N/A'}</p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-semibold">
                  {profileData?.role || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </>
    </ProtectedRoute>
  );
};

export default ProfilePage;
