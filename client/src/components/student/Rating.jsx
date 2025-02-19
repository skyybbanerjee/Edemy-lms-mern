import React, { useEffect, useState } from "react";

function Rating({ initialRating, onRate }) {
  const [rating, setRating] = useState(initialRating || 0);

  function handleRating(value) {
    setRating(value);
    if (onRate) onRate(value);
  }

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);

  return (
    <div>
      {Array.from({ length: 5 }, (_, idx) => {
        const starValue = idx + 1;
        return (
          <span
            key={idx}
            onClick={() => handleRating(starValue)}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors  ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}>
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

export default Rating;
