import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';
import { useQuery } from 'react-query';
import api from '@lib/api/client';

const CourseLearningPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [currentLesson, setCurrentLesson] = useState(0);

  const { data: lessons, isLoading } = useQuery(['lessons', courseId], async () => {
    return await api.get(`/courses/${courseId}/lessons`);
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h2>
          <p className="text-gray-600">You must be logged in to access this course.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
      </div>
    );
  }

  const lesson = lessons?.[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
            Course Learning
          </h1>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg inline-block">
            <p className="font-bold">Redux & React Query: Active</p>
            <p>Lesson {currentLesson + 1} of {lessons?.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{lesson?.title}</h2>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson?.content }} />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
            disabled={currentLesson === 0}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold disabled:opacity-50"
          >
            Previous Lesson
          </button>
          <button
            onClick={() => setCurrentLesson(Math.min((lessons?.length || 1) - 1, currentLesson + 1))}
            disabled={currentLesson === (lessons?.length || 1) - 1}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold disabled:opacity-50"
          >
            Next Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;
