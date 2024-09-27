import { useState } from "react";
import LeftArrow from "../../../assets/LeftArrow.svg";
import RightArrow from "../../../assets/RightArrow.svg";

function Carousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative">
      {images.length > 0 ? (
        <img
          src={images[currentImageIndex].url}
          alt={images[currentImageIndex].alt || "Image"}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/800x400?text=No+Image+Available"; // Fallback image
          }}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      ) : (
        <img
          src="https://via.placeholder.com/800x400?text=No+Image+Available"
          alt="Placeholder image"
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePreviousImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-4 shadow hover:bg-opacity-75 transition"
            style={{ width: "50px", height: "60px" }}
          >
            <img
              src={LeftArrow}
              alt="Previous"
              className="w-8 h-8"
              style={{ transform: "scale(1.5)" }}
            />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-4 shadow hover:bg-opacity-75 transition"
            style={{ width: "50px", height: "60px" }}
          >
            <img
              src={RightArrow}
              alt="Next"
              className="w-8 h-8"
              style={{ transform: "scale(1.5)" }}
            />
          </button>
        </>
      )}
    </div>
  );
}

export default Carousel;
