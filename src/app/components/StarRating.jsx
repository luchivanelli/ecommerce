import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 0, maxRating = 5, size = 24 }) => {
  return (
    <div className="flex items-center gap-1">
      {/* calcula si cada estrella tiene que ser completa o no */}
      {[...Array(maxRating)].map((_, index) => {
        const fillPercentage = Math.max(0, Math.min(1, rating - index));
        const isFilled = fillPercentage === 1;
        const isPartial = fillPercentage > 0 && fillPercentage < 1;

        return (
          <div key={index} className="relative">
            {isPartial ? (
              <div className="relative">
                <Star
                  size={size}
                  className="text-gray-300"
                  fill="currentColor"
                />
                <div 
                  className="absolute top-0 left-0 overflow-hidden" 
                  style={{ width: `${fillPercentage * 100}%` }}
                >
                  <Star
                    size={size}
                    className="text-yellow-400"
                    fill="currentColor"
                  />
                </div>
              </div>
            ) : (
              <Star
                size={size}
                className={isFilled ? 'text-yellow-400' : 'text-gray-300'}
                fill="currentColor"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;