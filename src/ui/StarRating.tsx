import { ChangeEvent, useState } from 'react';
import { FaStar } from 'react-icons/fa';

type CustomRatingProps = {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
};

function CustomRating({ value, onChange, max = 5 }: CustomRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const ratingValue = parseInt(e.target.value);
    onChange(ratingValue);
  }

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
              onChange={handleChange}
              className="hidden"
            />
            <FaStar
              className={`mr-1 h-5 w-5 transition-colors duration-200 md:h-7 md:w-7 ${
                ratingValue <= (hover || value)
                  ? hover
                    ? 'text-yellow-300'
                    : 'text-yellow-400'
                  : 'text-gray-300'
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
