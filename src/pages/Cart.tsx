import React from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import { Book } from '../types';

interface CartItem {
  book: Book;
  quantity: number;
}

const Cart: React.FC = () => {
  // Mock cart data - will be replaced with Context tomorrow
  const cartItems: CartItem[] = [];
  const total = cartItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start adding some books to your cart!</p>
            <Link to="/catalog">
              <Button size="lg">Browse Books</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {cartItems.map((item) => (
            <div key={item.book.id} className="border-b border-gray-200 last:border-b-0">
              <div className="p-6 flex items-center space-x-4">
                <img
                  src={item.book.coverUrl}
                  alt={item.book.title}
                  className="w-16 h-20 object-cover rounded"
                />
                
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.book.title}
                  </h3>
                  <p className="text-gray-600">by {item.book.author}</p>
                  <p className="text-lg font-bold text-primary-600 mt-1">
                    ${item.book.price}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MinusIcon className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </p>
                  <button className="text-red-500 hover:text-red-700 mt-2">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">$0.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span className="text-primary-600">${total.toFixed(2)}</span>
            </div>
          </div>
          <Button size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;