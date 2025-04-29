import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Slider from "react-slick";
import PriceCard from "../../component/Cards/PriceCard";

// Loading Card Component with memo for performance
const LoadingCard = React.memo(() => {
  return (
    <div className="w-64 h-96 mx-auto my-6 transition-transform duration-300 hover:scale-105 cursor-pointer rounded-lg overflow-hidden shadow-sm">
      <div className="w-full h-80 bg-gray-200 overflow-hidden animate-pulse">
        {/* Loading placeholder for image */}
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
      <div className="px-4 py-3 bg-white">
        {/* Loading placeholder for name */}
        <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        {/* Loading placeholder for price */}
        <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );
});

LoadingCard.displayName = "LoadingCard";

export default function Collection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 700);
  const limit = 12;
  
  // Get window dimensions for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Helper function to determine slides to show based on screen width
  const getSlidesToShow = useCallback(() => {
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    if (width >= 480) return 1;
    return 1;
  }, [width]);
  
  // Fetch products with useCallback for memoization
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      
      const url = `https://manglan-clothing-backend.onrender.com/product/all?&category=Luxury&limit=${limit}&page=${page}`;
      const response = await axios.get(url);
     
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Optimized slider settings with responsive design
  const settings = {
    dots: true,
    infinite: products.length > getSlidesToShow(),
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    centerMode: width > 480,
    centerPadding: width > 768 ? "40px" : "20px",
    focusOnSelect: true,
    arrows: width > 640, // Hide arrows on mobile
    autoplay: products.length > 3,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    lazyLoad: "ondemand",
    className: "center",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "60px",
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0px",
          arrows: false,
        },
      },
    ],
  };

  // Adjust container height based on window height and width
  const containerHeight = height < 700 ? height * 0.5 : width < 768 ? 360 : 400;

  // Create loading cards array - memoized to prevent unnecessary rerenders
  const loadingCards = React.useMemo(() => 
    Array.from({ length: getSlidesToShow() + 1 }, (_, index) => (
      <div key={`loading-${index}`} className="flex justify-center px-2">
        <LoadingCard />
      </div>
    )),
  [getSlidesToShow]);
 
  return (
    <div className="collection-container pb-6">  
      {loading ? (
        <div
          className="bg-transparent flex justify-center items-center mt-8 overflow-hidden"
          style={{ height: `${containerHeight}px` }}
        >
          <div className="w-full md:w-[95%] lg:w-[90%] mx-auto">
            <Slider {...settings}>
              {loadingCards}
            </Slider>
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center h-64 text-red-500">
          <p className="mb-4">Error: {error}</p>
          <button 
            onClick={() => fetchProducts()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">Luxury Collection</h2>
          <div
            className="bg-transparent flex justify-center items-center overflow-hidden"
            style={{ height: `${containerHeight}px` }}
          >
            <div className="w-full md:w-[95%] lg:w-[90%] mx-auto">
              {products.length > 0 ? (
                <Slider {...settings}>
                  {products.map((product) => (
                    <div key={product._id || product.id} className="flex justify-center px-2 md:px-3">
                      <PriceCard {...product} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p className="text-lg text-gray-500">No products found</p>
                </div>
              )}
            </div>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Previous
                </button>
                <span className="flex items-center px-4">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )} 
    </div>
  );
}
