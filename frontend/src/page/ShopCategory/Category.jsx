// src/pages/category/index.js
import React, { useState, useEffect } from "react";
import Heading from "../../component/other/Heading";
import ShopingCard from "../../component/Cards/ShopingCard";
import Loader from "../../component/other/Loader";
import Navbar from "../../component/navbar";
import axios from "axios";

// Reusable CategoryPage component
const CategoryPage = ({ category, title }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const url = `https://manglan-clothing-backend.onrender.com/product/all?page=${page}&category=${category}&limit=10`;
        
        const response = await axios.get(url);
        const data = response.data;
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 10));
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [page, category]);

  // Implement infinite scroll with debounce
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      
      if (scrollTop + windowHeight >= fullHeight - 100) {
        setVisibleItems((prev) => Math.min(prev + 4, products.length));
      }
    };
    
    const debounceScroll = () => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(handleScroll, 100);
      };
    };
    
    const debouncedHandleScroll = debounceScroll();
    window.addEventListener("scroll", debouncedHandleScroll);
    
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [products.length]);

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Heading heading={`${title} Category`} paragraph={"Fashion '25"} />
          <div className="w-full h-auto pb-10 flex flex-col justify-center items-center">
            <div className="max-w-[1500px] w-full h-auto">
              <div className="grid grid-cols-2 px-6 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-16 place-items-center">
                {products.slice(0, visibleItems).map((item, index) => (
                  <ShopingCard key={item.id || index} item={item} index={index} />
                ))}
              </div>
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 pb-4">
                  <button 
                    className={`mx-1 px-3 py-1 rounded ${page <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page <= 1}
                  >
                    Previous
                  </button>
                  
                  <span className="mx-2 py-1">
                    Page {page} of {totalPages}
                  </span>
                  
                  <button 
                    className={`mx-1 px-3 py-1 rounded ${page >= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page >= totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
              
              {/* Show load more button as an alternative to infinite scroll */}
              {visibleItems < products.length && (
                <div className="flex justify-center my-8">
                  <button 
                    className="px-6 py-2 bg-blue-600 text-white rounded"
                    onClick={() => setVisibleItems(prev => Math.min(prev + 4, products.length))}
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Individual category pages
const MenPage = () => <CategoryPage category="Men" title="Men" />;
const WomenPage = () => <CategoryPage category="Women" title="Women" />;
const KidPage = () => <CategoryPage category="Kid" title="Kid" />;

export { CategoryPage, MenPage, WomenPage, KidPage };
