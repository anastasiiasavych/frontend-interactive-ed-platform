import React from 'react';
import { useCourses, useCourse } from '@hooks/useQueryCourses';
import { useAppSelector } from '@hooks/redux';

const CoursesPage: React.FC = () => {
  const { data: courses, isLoading, error } = useCourses();
  const { data: selectedCourse } = useCourse('1');
  const authState = useAppSelector((state) => state.auth);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading courses...</div>;
  if (error) return <div className="text-red-500">Error loading courses</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg mr-4">
            Courses
          </span>
        </h1>
        
        {authState.isAuthenticated && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
            <p className="font-bold">Redux State Active!</p>
            <p>User: {authState.user ? 'Logged in' : 'Not logged in'}</p>
            <p>Role: {authState.role || 'No role'}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course: any) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
