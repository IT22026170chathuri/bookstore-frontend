import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Rating: React.FC<RatingProps> = ({ value, max = 5, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(max)].map((_, index) => {
        const filled = index < value;
        return filled ? (
          <StarIcon
            key={index}
            className={`${sizeClasses[size]} text-yellow-400`}
          />
        ) : (
          <StarOutlineIcon
            key={index}
            className={`${sizeClasses[size]} text-yellow-400`}
          />
        );
      })}
      <span className="text-sm text-gray-600 ml-1">({value})</span>
    </div>
  );
};

export default Rating;