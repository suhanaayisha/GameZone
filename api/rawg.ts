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

export type GameDetails = {
  description?: string;
  developers: string[];
  publishers: string[];
  metacritic?: number;
  playtime?: number;
  esrbRating?: string;
  website?: string;
};

type RawgGameDetails = {
  description_raw?: string | null;
  developers?: { name: string }[] | null;
  publishers?: { name: string }[] | null;
  metacritic?: number | null;
  playtime?: number | null;
  esrb_rating?: { name: string } | null;
  website?: string | null;
};

// Details rarely change, so keep them for the rest of the session to save requests.
const detailsCache = new Map<number, GameDetails>();

export const getGameDetails = async (id: number, signal?: AbortSignal): Promise<GameDetails> => {
  const cached = detailsCache.get(id);
  if (cached) return cached;
  if (!apiKey) throw new Error('RAWG API key is not configured');
  const response = await fetch(`${API_URL}/games/${id}?key=${encodeURIComponent(apiKey)}`, { signal });
  if (!response.ok) {
    throw new Error(`RAWG details failed (${response.status})`);
  }
  const game: RawgGameDetails = await response.json();
  const details: GameDetails = {
    description: game.description_raw?.trim() || undefined,
    developers: (game.developers ?? []).map((d) => d.name),
    publishers: (game.publishers ?? []).map((p) => p.name),
    metacritic: game.metacritic ?? undefined,
    playtime: game.playtime || undefined,
    esrbRating: game.esrb_rating?.name,
    website: game.website || undefined,
  };
  detailsCache.set(id, details);
  return details;
};
