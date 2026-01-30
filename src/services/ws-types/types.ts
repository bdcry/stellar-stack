export type TFeedStatus = 'created' | 'pending' | 'done';

export type TFeed = {
  ingredients: string[];
  status: TFeedStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
  _id: string;
  name: string;
};

export type TWsFeedsSuccess = {
  success: true;
  orders: TFeed[];
  total: number;
  totalToday: number;
};

export type TWsFeedsError = {
  success: false;
  message: string;
};

export type TWsFeedsMessage = TWsFeedsSuccess | TWsFeedsError;
