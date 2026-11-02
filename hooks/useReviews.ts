import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Review } from '../types/review';

const STORAGE_KEY = 'gamezone:reviews';

// Shown on first launch, before the user has saved anything.
const sampleReviews: Review[] = [
  { title: 'Zelda, Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
  { title: 'Gotta Catch Them All (again)', rating: 4, body: 'lorem ipsum', key: '2' },
  { title: 'Not So "Final" Fantasy', rating: 3, body: 'lorem ipsum', key: '3' },
];

export const useReviews = () => {
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

  const addReview = (review: Omit<Review, 'key'>) => {
    const newReview = { ...review, key: Date.now().toString() };
    setReviews((currentReviews) => [newReview, ...currentReviews]);
  };

  return { reviews, loaded, addReview };
};
