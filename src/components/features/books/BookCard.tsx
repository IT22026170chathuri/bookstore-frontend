import React from 'react';
import { Book } from '../../../types';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Rating from '../../ui/Rating';

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col h-full">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
          <div className="flex items-center justify-between mb-3">
            <Rating value={book.rating} />
            <span className="text-sm text-gray-500">{book.category}</span>
          </div>
          <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
            {book.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-primary-600">
              ${book.price}
            </span>
            <Button
              onClick={() => onAddToCart?.(book)}
              size="sm"
              disabled={book.stock === 0}
            >
              {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
          {book.stock > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              {book.stock} in stock
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookCard;