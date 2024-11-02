export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
};

export type Reviews = Review[];

export type NewReview = Pick <Review, 'comment' | 'rating'>;

export type ArgPostReviewAction = Pick<Review, 'id' | 'comment' | 'rating'>;
