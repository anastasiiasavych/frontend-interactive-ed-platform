import React from 'react';
import { useAppSelector } from '@hooks/redux';
import { useQuery } from 'react-query';
import api from '@lib/api/client';
import { useNavigate } from 'react-router-dom';

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  cardCount: number;
}

const FlashcardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: flashcardSets, isLoading } = useQuery<FlashcardSet[]>('flashcardSets', async () => {
    return await api.get('/flashcards');
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h2>
          <p className="text-gray-600">You must be logged in to view flashcards.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
            Flashcards
          </h1>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg inline-block">
            <p className="font-bold">Redux & React Query: Active</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardSets?.map((set) => (
            <div
              key={set.id}
              onClick={() => navigate(`/flashcards/${set.id}`)}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-t-4 border-orange-500"
            >
              <div className="h-40 bg-gradient-to-r from-orange-400 to-red-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{set.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{set.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                    {set.cardCount} cards
                  </span>
                  <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all">
                    Study Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
