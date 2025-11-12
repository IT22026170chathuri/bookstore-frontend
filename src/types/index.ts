export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  coverUrl: string;
  description: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export type Theme = 'light' | 'dark';