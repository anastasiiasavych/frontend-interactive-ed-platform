import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';
import { useQuery } from 'react-query';
import api from '@lib/api/client';

const FlashcardsCardsPage: React.FC = () => {
  const { flashcardId } = useParams<{ flashcardId: string }>();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: flashcardSet, isLoading } = useQuery(['flashcardSet', flashcardId], async () => {
    return await api.get(`/flashcards/${flashcardId}/cards`);
  });

  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h2>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
            Flashcards Cards
          </h1>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg inline-block">
            <p className="font-bold">Redux & React Query: Active</p>
            <p>Total: {flashcardSet?.cards?.length || 0} cards</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardSet?.cards?.map((card: any, index: number) => (
            <div
              key={card.id}
              onClick={() => setSelectedCardIndex(selectedCardIndex === index ? null : index)}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-t-4 border-orange-500 overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                    Card {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{card.question}</h3>
                {selectedCardIndex === index && (
                  <p className="text-gray-600 text-sm">{card.answer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsCardsPage;
