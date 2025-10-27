import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { setUser, setRole } from '@store/slices/authSlice';
import { useMutation } from 'react-query';
import api from '@lib/api/client';
import './LoginRegister.css';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation(
    async (credentials: { email: string; password: string }) => {
      return await api.post('/auth/login', credentials);
    },
    {
      onSuccess: (data) => {
        dispatch(setUser(data));
        dispatch(setRole(data.role));
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-blue-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-3 rounded-full text-2xl font-bold">
            Login
          </div>
        </div>

        {loginMutation.isError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            Login failed. Please check your credentials.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
          >
            {loginMutation.isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {authState.isAuthenticated && (
          <div className="mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <p className="font-bold">Redux Connected!</p>
            <p>Logged in as: {authState.role}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
