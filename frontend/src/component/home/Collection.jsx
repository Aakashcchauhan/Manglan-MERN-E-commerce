import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import PriceCard from "../../component/Cards/PriceCard";

// Custom hook to track window dimensions
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

// Loading Card Component
const LoadingCard = () => {
  return (
    <div className="rounded-lg shadow-md bg-white p-4 w-full max-w-xs mx-auto">
      <div className="animate-pulse">
        {/* Image placeholder */}
        <div className="bg-gray-300 h-48 rounded-md mb-4"></div>
        
        {/* Title placeholder */}
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
        
        {/* Price placeholder */}
        <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>
        
        {/* Description placeholders */}
        <div className="h-3 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded mb-2 w-5/6"></div>
        
        {/* Button placeholder */}
        <div className="h-10 bg-gray-300 rounded-md mt-4"></div>
      </div>
    </div>
  );
};

export default function Collection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { width, height } = useWindowDimensions();
    const limit = 12;
 
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
         
          const url = `http://localhost:8080/product/all?&category=Luxury&limit=${limit}`;
          const response = await axios.get(url);
         
          setProducts(response.data.products);
          setTotalPages(Math.ceil(response.data.total / limit));
        } catch (err) {
          setError(err.response?.data?.message || err.message);
        } finally {
          setLoading(false);
        }
      };
 
      fetchProducts();
    }, [limit]);
 
    // Adjust slider settings based on window dimensions
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: width > 1024 ? 4 : width > 700 ? 2 : 1,
      slidesToScroll: 1,
      centerMode: width > 480,
      centerPadding: width > 700 ? "30px" : "10px",
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
          },
        },
      ],
    };
 
    // Adjust container height based on window height
    const containerHeight = height < 700 ? height * 0.5 : 400;

    // Create loading cards array
    const loadingCards = Array.from({ length: 4 }, (_, index) => (
      <div key={`loading-${index}`} className="px-2 md:px-6 lg:px-10">
        <LoadingCard />
      </div>
    ));
   
    return (
      <>  
        {loading ? (
          <div
            className="bg-transparent flex justify-center items-center mt-10"
            style={{ height: `${containerHeight}px` }}
          >
            <Slider {...settings} className="w-full md:w-[90%]">
              {loadingCards}
            </Slider>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : (
          <div
            className="bg-transparent flex justify-center items-center mt-10"
            style={{ height: `${containerHeight}px` }}
          >
            <Slider {...settings} className="w-full md:w-[90%]">
              {products.map((product, index) => (
                <div key={index} className="px-2 md:px-6 lg:px-10">
                  <PriceCard {...product} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </>
    );
}
