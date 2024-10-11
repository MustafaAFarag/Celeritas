import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

type CustomRatingProps = {
  value: number;
  onChange: (rating: number) => void;
  max: number;
};

function CustomRating({ value, onChange, max = 5 }: CustomRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  console.log(value);
  const handleRating = (rating: number) => {
    if (onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex">
      {[...Array(max)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              className={`mr-1 h-5 w-5 transition-colors duration-200 md:h-7 md:w-7 ${
                ratingValue <= (hover || value)
                  ? hover
                    ? 'text-yellow-400' // Hover color
                    : 'text-yellow-500' // Submitted rating color
                  : 'text-gray-100' // Unrated color
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default CustomRating;
