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
    <div className="w-64 h-96 mx-auto my-6 transition-transform duration-300 hover:scale-105 cursor-pointer rounded-lg overflow-hidden">
    <div className="w-full h-80 bg-gray-200 overflow-hidden animate-pulse">
      {/* Loading placeholder for image */}
      <div className="w-full h-full flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
    <div className="px-4 py-3 bg-white flex flex-col justify-center items-center ">
      {/* Loading placeholder for name */}
      <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
      {/* Loading placeholder for price */}
      <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
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
         
          const url = `https://manglan-clothing-backend.onrender.com/product/all?&category=Luxury&limit=${limit}`;
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
