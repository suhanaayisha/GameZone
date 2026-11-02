export type Review = {
  key: string;
  title: string;
  body: string;
  rating: number;
};

export type ReviewInput = Omit<Review, 'key'>;
