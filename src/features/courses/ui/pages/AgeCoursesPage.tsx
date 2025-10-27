import React from 'react';
import { useAppSelector } from '@hooks/redux';
import { useQuery } from 'react-query';
import api from '@lib/api/client';
import { useNavigate } from 'react-router-dom';

interface AgeGroup {
  id: string;
  name: string;
  ageRange: string;
  courses: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

const AgeCoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: ageGroups, isLoading } = useQuery<AgeGroup[]>('ageGroups', async () => {
    return await api.get('/courses/by-age');
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Courses by Age Group
          </h1>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg inline-block">
            <p className="font-bold">Redux & React Query: Active</p>
            {isAuthenticated && <p>User: Logged in</p>}
          </div>
        </div>

        <div className="space-y-8">
          {ageGroups?.map((group) => (
            <div key={group.id} className="bg-white rounded-xl shadow-xl p-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-t-xl -mx-8 -mt-8 mb-6">
                <h2 className="text-3xl font-bold">{group.name}</h2>
                <p className="text-blue-100">{group.ageRange}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.courses?.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer border-l-4 border-blue-500"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                      View Course
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgeCoursesPage;
