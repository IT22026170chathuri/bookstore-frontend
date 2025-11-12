import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/features/books/BookCard';
import Button from '../components/ui/Button';
import { Book } from '../types';

const Home: React.FC = () => {
  // Mock featured books data
  const featuredBooks: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      category: 'Classic',
      price: 12.99,
      rating: 4.5,
      stock: 10,
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'A classic novel of the Jazz Age...',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      category: 'Fiction',
      price: 14.99,
      rating: 4.8,
      stock: 8,
      coverUrl: 'https://images.unsplash.com/photo-1554757380-2fb69b9b95c2?w=400',
      description: 'A gripping tale of racial injustice...',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      category: 'Dystopian',
      price: 11.99,
      rating: 4.7,
      stock: 5,
      coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
      description: 'A dystopian social science fiction novel...',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to BookStore</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover your next favorite book from our extensive collection of bestsellers and classics.
          </p>
          <Link to="/catalog">
            <Button size="lg" variant="secondary">
              Browse Catalog
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button size="lg">
                View All Books
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $25</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Thousands of books across all genres</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices and daily deals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;