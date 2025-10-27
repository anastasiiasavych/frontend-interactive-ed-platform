import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';
import { useQuery, useMutation } from 'react-query';
import api from '@lib/api/client';

const FlashcardStudy: React.FC = () => {
  const { flashcardId } = useParams<{ flashcardId: string }>();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { data: flashcardSet, isLoading } = useQuery(['flashcard', flashcardId], async () => {
    return await api.get(`/flashcards/${flashcardId}`);
  });

  const { data: cards } = flashcardSet || {};

  const updateProgressMutation = useMutation(
    async ({ cardId, correct }: { cardId: string; correct: boolean }) => {
      return await api.post(`/flashcards/${flashcardId}/progress`, { cardId, correct });
    }
  );

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

  const currentFlashcard = cards?.[currentCard];

  if (!currentFlashcard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Flashcards Available</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-lg mb-8 text-center">
          <p className="font-bold">Card {currentCard + 1} of {cards?.length}</p>
          <div className="bg-white/20 backdrop-blur rounded p-2 mt-2 inline-block">
            <p className="text-sm">Redux & React Query: Active</p>
          </div>
        </div>

        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="bg-white rounded-xl shadow-2xl p-12 min-h-[400px] flex items-center justify-center cursor-pointer transform transition-all hover:scale-105"
        >
          <p className="text-3xl font-bold text-gray-800">
            {isFlipped ? currentFlashcard.answer : currentFlashcard.question}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => {
              updateProgressMutation.mutate({ cardId: currentFlashcard.id, correct: true });
              setCurrentCard((prev) => Math.min((cards?.length || 1) - 1, prev + 1));
              setIsFlipped(false);
            }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold"
          >
            ✓ Got It
          </button>
          <button
            onClick={() => {
              updateProgressMutation.mutate({ cardId: currentFlashcard.id, correct: false });
              setCurrentCard((prev) => Math.min((cards?.length || 1) - 1, prev + 1));
              setIsFlipped(false);
            }}
            className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all font-bold"
          >
            ✗ Skip It
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardStudy;
