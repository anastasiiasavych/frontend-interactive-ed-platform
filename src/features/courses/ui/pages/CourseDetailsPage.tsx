import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';
import { useQuery } from 'react-query';
import api from '@lib/api/client';

interface Course {
  id: string;
  title: string;
  description: string;
  modules: Array<{
    id: string;
    title: string;
    lessons: Array<{ id: string; title: string }>;
  }>;
}

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  const { data: course, isLoading, error } = useQuery<Course>(
    ['course', courseId],
    async () => {
      return await api.get(`/courses/${courseId}`);
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Course Not Found</h2>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8">
            <h1 className="text-5xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-lg text-white/90">{course.description}</p>
            {isAuthenticated && (
              <div className="mt-4 bg-white/20 backdrop-blur rounded-lg p-3 inline-block">
                <p className="text-white font-semibold">Redux: Active | Role: {role}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Modules</h2>
          {course.modules?.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-indigo-500"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{module.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {module.lessons?.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 hover:from-purple-100 hover:to-pink-100 transition-all cursor-pointer"
                  >
                    <p className="text-gray-700 font-medium">{lesson.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-xl p-6">
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
