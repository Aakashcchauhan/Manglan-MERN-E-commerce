import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "../../assets/Banner2.jpg";
import banner2 from "../../assets/banner1.jpg";
// This is just a demo component - in a real implementation you would import your actual images
const HeroSection = () => {
  // For demo purposes, using placeholder images
    const images = [banner1, banner2];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="w-full bg-gray-900 h-96 md:h-screen max-h-screen relative overflow-hidden">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 z-20 translate-x-0"
                : direction === 1
                ? "opacity-0 -translate-x-full z-10"
                : "opacity-0 translate-x-full z-10"
            }`}
          >
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-opacity-30"></div>
            
            {/* Content Overlay - Add your hero text here */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
              <button 
                className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-black p-2 rounded-full z-30 transition duration-300"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-black p-2 rounded-full z-30 transition duration-300"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white w-8" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={toggleAutoPlay}
        className="absolute bottom-8 right-8 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full z-30 hover:bg-opacity-70 transition"
      >
        {isAutoPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default HeroSection;
