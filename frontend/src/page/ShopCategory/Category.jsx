// src/pages/category/index.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import Heading from "../../component/other/Heading";
import ShopingCard from "../../component/Cards/ShopingCard";
import Navbar from "../../component/navbar";
import axios from "axios";
import Banner from '../../component/home/banner';

// Product Loading Card Component
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




const menImages = [
  {
    id: 1,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w17/MS21LH10-16x9-Startpage-Teaser-1-w17.jpg?imwidth=1660"
  },
  {
    id: 2,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w16/start-page/MS21LH9-4x5-Startpage-Teaser-1-Week16.jpg?imwidth=768"
  },
  {
    id: 3,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w17/MS21LH8-4x5-Startpage-Teaser-3-w17.jpg?imwidth=768"
  }
];

const womenImages = [
  {
    id: 1,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk17/WS21K-16x9-splash-women-startpage-wk17.jpg?imwidth=1920"
  },
  {
    id: 2,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk17/DS21H-4x5-women-startpage-wk17.jpg?imwidth=768"
  },
  {
    id: 3,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk17/WS21L-4x5-women-startpage-wk17.jpg?imwidth=768"
  }
];

const kidImages = [
  {
    id: 1,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/kids/start-page-assets/w-17/4081B-16x9-NS-kids-start-page-prio-week-17.jpg?imwidth=1660"
  },
  {
    id: 2,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk17/DS21H-4x5-women-startpage-wk17.jpg?imwidth=768"
  },
  {
    id: 3,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/kids/start-page-assets/w-17/4081A-4x5-NS-kids-start-page-prio-week-17.jpg?imwidth=768"
  }
];

// Reusable CategoryPage component
const CategoryPage = ({ category, title, images }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const itemsPerPage = 4;
  
  // Ref for intersection observer
  const observer = useRef();
  const lastProductElementRef = useCallback(node => {
    if (loading || loadingMore || allProductsLoaded) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < totalPages) {
        loadMoreProducts();
      }
    }, { threshold: 0.5 });
    
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, page, totalPages, allProductsLoaded]);
  
  const fetchCategoryProducts = async (pageNum, shouldAppend = false) => {
    try {
      // Set appropriate loading state
      if (!shouldAppend) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const url = `https://manglan-clothing-backend.onrender.com/product/all?page=${pageNum}&category=${category}&limit=${itemsPerPage}`;
      
      const response = await axios.get(url);
      const data = response.data;
      
      // Calculate total pages
      const total = Math.ceil(data.total / itemsPerPage);
      setTotalPages(total);
      
      // Check if all products are loaded
      if (pageNum >= total) {
        setAllProductsLoaded(true);
      }
      
      // Update products state based on whether we're appending or replacing
      if (shouldAppend) {
        setProducts(prev => [...prev, ...data.products]);
      } else {
        setProducts(data.products);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };
  
  // Load initial products
  useEffect(() => {
    // Reset products when category changes
    setProducts([]);
    setPage(1);
    setAllProductsLoaded(false);
    
    fetchCategoryProducts(1, false);
  }, [category]);
  
  // Function to load more products
  const loadMoreProducts = () => {
    if (page < totalPages && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCategoryProducts(nextPage, true);
    }
  };
  
  // Error handling UI
  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p>{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              setError(null);
              setPage(1);
              fetchCategoryProducts(1, false);
            }}
          >
            Try Again
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
     <Banner images={images} />
      <Heading heading={`${title} Category`} paragraph={"Fashion '25"} />
      <div className="w-full h-auto pb-10 flex flex-col justify-center items-center">
        <div className="max-w-[1500px] w-full h-auto">
          <div className="grid grid-cols-2 px-6 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-16 place-items-center">
            {loading ? (
              // Show loading cards while data is being fetched
              Array(8).fill(0).map((_, index) => (
                <ProductLoadingCard key={`loading-${index}`} />
              ))
            ) : (
              // Show actual products once loaded
              products.map((item, index) => {
                // Apply ref to the last product element for infinite scroll
                if (products.length === index + 1) {
                  return (
                    <div key={item.id || `item-${index}`} ref={lastProductElementRef}>
                      <ShopingCard item={item} index={index} />
                    </div>
                  );
                }
                return <ShopingCard key={item.id || `item-${index}`} item={item} index={index} />;
              })
            )}
          </div>
          
          {/* Loading indicator for more products */}
          {loadingMore && (
            <div className="flex justify-center py-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          
          {/* Manual load more button as a backup */}
          {!loading && !loadingMore && !allProductsLoaded && products.length > 0 && (
            <div className="flex justify-center mt-8">
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                onClick={loadMoreProducts}
              >
                Load More
              </button>
            </div>
          )}
          
          
          {/* Show pagination for larger screens */}
          {!loading && totalPages > 1 && !allProductsLoaded && (
            <div className="hidden md:flex justify-center mt-8 pb-4">
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1 rounded transition duration-200 ${page <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  onClick={() => {
                    if (page > 1) {
                      setPage(1);
                      fetchCategoryProducts(1, false);
                    }
                  }}
                  disabled={page <= 1}
                >
                  First
                </button>
                
                <button 
                  className={`px-3 py-1 rounded transition duration-200 ${page <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  onClick={() => {
                    if (page > 1) {
                      const prevPage = page - 1;
                      setPage(prevPage);
                      fetchCategoryProducts(prevPage, false);
                    }
                  }}
                  disabled={page <= 1}
                >
                  Previous
                </button>
                
                <span className="px-3 py-1">
                  Page {page} of {totalPages}
                </span>
                
                <button 
                  className={`px-3 py-1 rounded transition duration-200 ${page >= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  onClick={() => {
                    if (page < totalPages) {
                      const nextPage = page + 1;
                      setPage(nextPage);
                      fetchCategoryProducts(nextPage, false);
                    }
                  }}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
                
                <button 
                  className={`px-3 py-1 rounded transition duration-200 ${page >= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  onClick={() => {
                    if (page < totalPages) {
                      setPage(totalPages);
                      fetchCategoryProducts(totalPages, false);
                    }
                  }}
                  disabled={page >= totalPages}
                >
                  Last
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

// Individual category pages - now correctly passing the image arrays
const MenPage = () => <CategoryPage category="Men" title="Men" images={menImages} />;
const WomenPage = () => <CategoryPage category="Women" title="Women" images={womenImages} />;
const KidPage = () => <CategoryPage category="Kid" title="Kid" images={kidImages} />;

export { CategoryPage, MenPage, WomenPage, KidPage };
