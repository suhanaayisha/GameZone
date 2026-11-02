import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Review, ReviewInput } from '../types/review';

const STORAGE_KEY = 'gamezone:reviews';

// Shown on first launch, before the user has saved anything.
const sampleReviews: Review[] = [
  { title: 'Zelda, Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
  { title: 'Gotta Catch Them All (again)', rating: 4, body: 'lorem ipsum', key: '2' },
  { title: 'Not So "Final" Fantasy', rating: 3, body: 'lorem ipsum', key: '3' },
];

type ReviewsContextValue = {
  reviews: Review[];
  loaded: boolean;
  addReview: (review: ReviewInput) => void;
  updateReview: (key: string, review: ReviewInput) => void;
  deleteReview: (key: string) => void;
};

const ReviewsContext = createContext<ReviewsContextValue | null>(null);

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => setReviews(stored ? JSON.parse(stored) : sampleReviews))
      .catch((error) => {
        console.warn('Failed to load reviews', error);
        setReviews(sampleReviews);
      })
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    // Don't overwrite stored reviews before they've been read.
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reviews)).catch((error) =>
      console.warn('Failed to save reviews', error)
    );
  }, [reviews, loaded]);

  const addReview = (review: ReviewInput) => {
    const newReview = { ...review, key: Date.now().toString() };
    setReviews((currentReviews) => [newReview, ...currentReviews]);
  };

  const updateReview = (key: string, review: ReviewInput) => {
    setReviews((currentReviews) =>
      currentReviews.map((r) => (r.key === key ? { ...review, key } : r))
    );
  };

  const deleteReview = (key: string) => {
    setReviews((currentReviews) => currentReviews.filter((r) => r.key !== key));
  };

  return (
    <ReviewsContext.Provider value={{ reviews, loaded, addReview, updateReview, deleteReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used inside ReviewsProvider');
  }
  return context;
};
