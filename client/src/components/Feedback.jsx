import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0);
  const [feedbackData, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:5000/feedback");
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  const checkNumber = (number) => {
    if (number > feedbackData.length - 1) {
      return 0;
    } else if (number < 0) {
      return feedbackData.length - 1;
    }
    return number;
  };

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  if (feedbackData.length === 0) {
    return <p>Loading...</p>;
  }

  const { image, username, feedback } = feedbackData[index];

  return (
    <div className="bg-blue-100 rounded-lg flex items-center justify-center min-h-[60vh]">
      <article className="relative bg-white rounded-lg p-5 shadow-lg max-w-3xl text-center"> {/* Adjusted padding and max width */}
        {/* Arrow Buttons */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-400 mx-2" // Added mx-2 for spacing
          onClick={prevPerson}
        >
          <FaChevronLeft />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-400 mx-2" // Added mx-2 for spacing
          onClick={nextPerson}
        >
          <FaChevronRight />
        </button>

        {/* User Image */}
        <div className="flex justify-center mb-4">
          <img
            src={image}
            alt={username}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" // Adjusted image size
          />
        </div>

        {/* Feedback Content */}
        <p className="text-gray-600 italic mb-2">{feedback}</p>

        {/* Quote Icon */}
        <div className="flex justify-center text-blue-600 text-2xl mb-1"> {/* Adjusted icon size */}
          <FaQuoteRight />
        </div>

        {/* Username and Title */}
        <h4 className="text-lg font-semibold">{username}</h4>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-2">
          {feedbackData.map((_, feedbackIndex) => (
            <span
              key={feedbackIndex}
              className={`mx-1 w-2 h-2 rounded-full ${
                feedbackIndex === index ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </article>
    </div>
  );
};

export default Review;
