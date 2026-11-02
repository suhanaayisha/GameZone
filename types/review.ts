// Snapshot of a game from RAWG, saved with the review so it works offline.
export type GameInfo = {
  id: number;
  slug: string;
  name: string;
  released?: string;
  coverUrl?: string;
  genres: string[];
  platforms: string[];
};

export type Review = {
  key: string;
  title: string;
  body: string;
  rating: number;
  game?: GameInfo;
};

export type ReviewInput = Omit<Review, 'key'>;
