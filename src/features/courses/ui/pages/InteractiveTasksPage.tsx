import React, { useState } from 'react';
import { useAppSelector } from '@hooks/redux';
import { useQuery } from 'react-query';
import api from '@lib/api/client';

const InteractiveTasksPage: React.FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const { data: tasks, isLoading } = useQuery('interactiveTasks', async () => {
    return await api.get('/tasks/interactive');
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h2>
          <p className="text-gray-600">You must be logged in to view interactive tasks.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-transparent bg-clip-text">
            Interactive Tasks
          </h1>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg inline-block">
            <p className="font-bold">Redux & React Query: Active</p>
            <p>Role: {role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map((task: any) => (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-t-4 border-cyan-500 overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-r from-cyan-400 to-indigo-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold">
                    {task.type}
                  </span>
                  <button className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-cyan-700 hover:to-indigo-700 transition-all">
                    Start Task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedTask && (
          <div className="mt-8 bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedTask.title}</h2>
            <p className="text-gray-600">{selectedTask.details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTasksPage;
