import { useEffect, useState } from 'react';
import { getGameDetails, isRawgConfigured, type GameDetails } from '../api/rawg';

export const useGameDetails = (gameId?: number) => {
  const [details, setDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setDetails(null);
    setFailed(false);
    if (!gameId || !isRawgConfigured) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    getGameDetails(gameId, controller.signal)
      .then(setDetails)
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.warn(error);
        setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [gameId]);

  return { details, loading, failed };
};
