import type { GameInfo } from '../types/review';

const API_URL = 'https://api.rawg.io/api';
const apiKey = process.env.EXPO_PUBLIC_RAWG_API_KEY;

export const isRawgConfigured = Boolean(apiKey);

type RawgGame = {
  id: number;
  slug: string;
  name: string;
  released?: string | null;
  background_image?: string | null;
  genres?: { name: string }[] | null;
  platforms?: { platform: { name: string } }[] | null;
};

const toGameInfo = (game: RawgGame): GameInfo => ({
  id: game.id,
  slug: game.slug,
  name: game.name,
  released: game.released ?? undefined,
  coverUrl: game.background_image ?? undefined,
  genres: (game.genres ?? []).map((genre) => genre.name),
  platforms: (game.platforms ?? []).map((p) => p.platform.name),
});

export const searchGames = async (query: string, signal?: AbortSignal): Promise<GameInfo[]> => {
  if (!apiKey) return [];
  const url = `${API_URL}/games?key=${encodeURIComponent(apiKey)}&search=${encodeURIComponent(query)}&page_size=6`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`RAWG search failed (${response.status})`);
  }
  const data: { results?: RawgGame[] } = await response.json();
  return (data.results ?? []).map(toGameInfo);
};

export const rawgGameUrl = (slug: string) => `https://rawg.io/games/${slug}`;
export const RAWG_URL = 'https://rawg.io';
