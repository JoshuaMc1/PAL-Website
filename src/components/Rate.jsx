import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  gray: "#A9A9A9",
};

const stars = Array(5).fill(0);

const Rate = ({ rating, setRating, editable = true }) => {
  const [currentValue, setCurrentValue] = useState(0),
    [hoverValue, setHoverValue] = useState(undefined);

  useEffect(() => {
    setCurrentValue(rating);
  }, [rating]);

  const handleClick = (value) => {
    if (editable) {
      setCurrentValue(value);
      setRating(value);
    }
  };

  const handleMouseOver = (value) => {
    if (editable) {
      setHoverValue(value);
    }
  };

  const handleMouseLeave = () => {
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
              cursor: editable ? "pointer" : "default",
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
