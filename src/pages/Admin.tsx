import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { Book } from '../types';

interface BookFormData {
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  coverUrl: string;
  description: string;
}

const Admin: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>();

  const handleAddBook = (data: BookFormData) => {
    const newBook: Book = {
      id: Date.now(),
      ...data,
      price: Number(data.price),
      rating: Number(data.rating),
      stock: Number(data.stock),
    };

    setBooks(prev => [...prev, newBook]);
    setIsModalOpen(false);
    reset();
  };

  const handleEditBook = (data: BookFormData) => {
    if (!editingBook) return;

    const updatedBook: Book = {
      ...editingBook,
      ...data,
      price: Number(data.price),
      rating: Number(data.rating),
      stock: Number(data.stock),
    };

    setBooks(prev => prev.map(book => 
      book.id === editingBook.id ? updatedBook : book
    ));
    setIsModalOpen(false);
    setEditingBook(null);
    reset();
  };

  const handleDeleteBook = (bookId: number) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
  };

  const openAddModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
    reset();
  };

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
    reset({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      rating: book.rating,
      stock: book.stock,
      coverUrl: book.coverUrl,
      description: book.description,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your book catalog</p>
          </div>
          <Button onClick={openAddModal}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Book
          </Button>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {books.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No books added yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start by adding your first book to the catalog
              </p>
              <Button onClick={openAddModal}>
                <PlusIcon className="w-5 h-5 mr-2" />
                Add First Book
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-10 h-12 object-cover rounded"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {book.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              by {book.author}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${book.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ⭐ {book.rating}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openEditModal(book)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add/Edit Book Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBook(null);
            reset();
          }}
          title={editingBook ? 'Edit Book' : 'Add New Book'}
          size="lg"
        >
          <form
            onSubmit={handleSubmit(editingBook ? handleEditBook : handleAddBook)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="input-field"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author *
                </label>
                <input
                  {...register('author', { required: 'Author is required' })}
                  className="input-field"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  {...register('category', { required: 'Category is required' })}
                  className="input-field"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  className="input-field"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  {...register('rating', { 
                    required: 'Rating is required',
                    min: { value: 0, message: 'Rating must be at least 0' },
                    max: { value: 5, message: 'Rating cannot exceed 5' }
                  })}
                  className="input-field"
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  {...register('stock', { 
                    required: 'Stock is required',
                    min: { value: 0, message: 'Stock cannot be negative' }
                  })}
                  className="input-field"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover URL *
              </label>
              <input
                {...register('coverUrl', { required: 'Cover URL is required' })}
                className="input-field"
              />
              {errors.coverUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.coverUrl.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                rows={3}
                {...register('description', { required: 'Description is required' })}
                className="input-field"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingBook(null);
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingBook ? 'Update Book' : 'Add Book'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Admin;