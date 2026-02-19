export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface Product {
  id: number;
  _id?: string; // MongoDB ID for logged-in users
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}