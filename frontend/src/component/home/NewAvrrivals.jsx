import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../../component/other/Heading";
import ShopingCard from "../../component/Cards/ShopingCard";
import Loader from "../../component/other/Loader";
import Navbar from "../../component/navbar";

// ProductLoadingCard component defined within the same file
const ProductLoadingCard = () => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 animate-pulse">
      {/* Product Image Placeholder */}
      <div className="h-64 bg-gray-200 p-4 flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-gray-300 rounded"></div>
      </div>

      {/* Product Info Placeholder */}
      <div className="p-5">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        
        {/* Rating Placeholder */}
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="ml-2 w-8 h-4 bg-gray-200 rounded"></div>
        </div>
        
        {/* Price Placeholder */}
        <div className="h-7 bg-gray-200 rounded w-1/3 mb-4"></div>
        
        {/* Buttons Placeholder */}
        <div className="flex flex-col space-y-2">
          <div className="w-full h-10 bg-gray-200 rounded"></div>
          
          <div className="flex space-x-2">
            <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Man = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProductsByTag = async (tag) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://manglan-clothing-backend.onrender.com/product/tag/${tag}`);
        // Axios automatically parses JSON, so we just need to access the data property
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products by tag:", err.response?.data?.message || err.message);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
     
    fetchProductsByTag("summer");
  }, []);
  
  return (
    <>
      <div className="w-full h-auto pb-10 flex flex-col justify-center items-center">
        <div className="max-w-[2000px] w-full h-auto mx-2">
            <div className="grid grid-cols-1 px-6 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-16 place-items-center">
              {loading ? (
                // Show loading cards while data is being fetched
                Array(4).fill(0).map((_, index) => (
                  <ProductLoadingCard key={`loading-${index}`} />
                ))
              ) : error ? (
                <div className="col-span-full text-center text-red-500">
                  <p>Error loading products: {error}</p>
                </div>
              ) : (
                // Show actual products once loaded
                products.slice(0,8).map((item, index) => (
                  <ShopingCard key={index} item={item} index={index} />
                ))
              )}
            </div>
        </div>
      </div>
    </>
  );
};

export default Man;
