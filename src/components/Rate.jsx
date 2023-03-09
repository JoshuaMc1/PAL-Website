import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

const colors = {
  orange: "#FFBA5A",
  gray: "#A9A9A9",
};

const stars = Array(5).fill(0);

const Rate = ({ rating, setRating }) => {
  const [currentValue, setCurrentValue] = useState(0),
    [hoverValue, setHoverValue] = useState(undefined);

  useEffect(() => {
    setCurrentValue(rating);
  }, [rating]);

  const handleClick = (value) => {
    setCurrentValue(value);
    setRating(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = (value) => {
    setHoverValue(undefined);
  };

  return (
    <div className="flex justify-center py-2">
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={24}
            style={{
              marginRight: 10,
              cursor: "pointer",
            }}
            color={
              (hoverValue || currentValue) > index ? colors.orange : colors.gray
            }
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default Rate;
