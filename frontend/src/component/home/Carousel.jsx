import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const items = [
  { img: "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk16/WS21J-16x9-women-startpage-wk16.jpg?imwidth=1024", id: 1 },
  { img: "https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w16/start-page/MS21LH9-16x9-Startpage-Teaser-1-Week16.jpg?imwidth=1024", id: 2 },
  { img: "https://image.hm.com/content/dam/global_campaigns/season_01/kids/start-page-assets/w-16/4041E-16x9-kids-start-page-prio-week-16.jpg?imwidth=1920", id: 3 },
  { img: "https://image.hm.com/assets/hm/da/8b/da8bdeaee1c3a128beaf91494fc30461daa834bc.jpg?imwidth=564", id: 4 },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);

  // Clone first & last slides for infinite effect
  const extendedItems = [
    items[items.length - 1], // Clone last item at the beginning
    ...items,
    items[0], // Clone first item at the end
  ];

  const next = () => {
    if (currentIndex >= extendedItems.length - 1) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const previous = () => {
    if (currentIndex <= 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Auto-loop functionality
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, [currentIndex]);

  // Handle infinite loop transition
  useEffect(() => {
    if (currentIndex === extendedItems.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(extendedItems.length - 2);
      }, 500);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, extendedItems.length]);

  return (
    <div className="w-full h-[30rem] overflow-hidden relative">
      {/* Image Container - Moves smoothly */}
      <div
        ref={sliderRef}
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedItems.map((item, index) => (
          <img
            key={index}
            src={item.img}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ width: "100%" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
