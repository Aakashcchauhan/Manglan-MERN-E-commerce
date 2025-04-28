import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ShopingCard from "../../component/Cards/ShopingCard";

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 4;
  
  const observer = useRef();
  const lastProductElementRef = useCallback(node => {
    if (loading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { threshold: 0.5 });
    
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore]);
  
  const fetchProductsByTag = async (tag, pageNum) => {
    try {
      const isInitialLoad = pageNum === 1;
      
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      // In a real API, you would pass page and limit params
      // Here we're simulating pagination with the existing API
      const response = await axios.get(`https://manglan-clothing-backend.onrender.com/product/tag/${tag}`);
      
      // Simulate pagination by slicing the response
      const allProducts = response.data;
      const startIndex = 0;
      const endIndex = pageNum * ITEMS_PER_PAGE;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);
      
      // Check if we've reached the end of available products
      setHasMore(endIndex < allProducts.length);
      
      if (isInitialLoad) {
        setProducts(paginatedProducts);
      } else {
        setProducts(prev => [...prev, ...paginatedProducts.slice((pageNum-1) * ITEMS_PER_PAGE)]);
      }
    } catch (err) {
      console.error("Error fetching products by tag:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };
  
  useEffect(() => {
    fetchProductsByTag("summer", page);
  }, [page]);
  
  return (
    <>
      <div className="w-full h-auto pb-10 flex flex-col justify-center items-center">
        <div className="max-w-[2000px] w-full h-auto mx-2">
            <div className="grid grid-cols-1 px-6 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-16 place-items-center">
              {loading && page === 1 ? (
                // Show loading cards for initial load
                Array(4).fill(0).map((_, index) => (
                  <ProductLoadingCard key={`loading-${index}`} />
                ))
              ) : error ? (
                <div className="col-span-full text-center text-red-500">
                  <p>Error loading products: {error}</p>
                </div>
              ) : (
                // Show actual products
                products.map((item, index) => {
                  // Apply ref to the last product element for infinite scroll
                  if (products.length === index + 1) {
                    return (
                      <div key={index} ref={lastProductElementRef}>
                        <ShopingCard item={item} index={index} />
                      </div>
                    );
                  }
                  return <ShopingCard key={index} item={item} index={index} />;
                })
              )}
              
              {/* Loading indicator at the bottom when loading more items */}
              {loadingMore && (
                <div className="col-span-full p-4 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-4 h-4 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-4 h-4 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </>
  );
};

export default Man;
