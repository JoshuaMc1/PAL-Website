import { useState, useEffect } from "react";

const Alert = ({ type = "info", children }) => {
  const typeClass = {
    info: {
      class: "flex bg-blue-100 rounded-lg p-4 mb-5 text-sm text-blue-700",
      hideClass: "animate-fadeOut",
    },
    success: {
      class: "flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700",
      hideClass: "animate-fadeOut",
    },
    danger: {
      class: "flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700",
      hideClass: "animate-fadeOut",
    },
    warning: {
      class: "flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700",
      hideClass: "animate-fadeOut",
    },
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className={`${typeClass[type].class} ${
            isVisible ? "" : typeClass[type].hideClass
          }`}
          role="alert"
        >
          <svg
            className="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">{children}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
