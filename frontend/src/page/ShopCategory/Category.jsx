// src/pages/category/index.js
import React, { useState, useEffect } from "react";
import Heading from "../../component/other/Heading";
import ShopingCard from "../../component/Cards/ShopingCard";
import Loader from "../../component/other/Loader";
import Navbar from "../../component/navbar";
import axios from "axios";
import Banner from '../../component/home/banner'
// Product Loading Card Component
const ProductLoadingCard = ({Images}) => {
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
      <Navbar />
      <Banner Images="Images" />
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
              products.slice(0, visibleItems).map((item, index) => (
                <ShopingCard key={item.id || index} item={item} index={index} />
              ))
            )}
          </div>
          
          {/* Only show pagination and load more when not loading */}
          {!loading && (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

const menImages = [
  {
    id: 1,
    url: "https://via.placeholder.com/300x400?text=Image+1"
  },
  {
    id: 2,
    title: "Image 2",
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w16/start-page/MS21LH9-4x5-Startpage-Teaser-1-Week16.jpg?imwidth=768"
  },
  {
    id: 3,
    title: "Image 3",
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w17/MS21LH8-4x5-Startpage-Teaser-3-w17.jpg?imwidth=768"
  }
];


const womenImages = [
  {
    id: 1,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk17/WS21K-16x9-wk17-option.mp4"
  },
  {
    id: 2,
    title: "Image 2",
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk17/DS21H-4x5-women-startpage-wk17.jpg?imwidth=768"
  },
  {
    id: 3,
    title: "Image 3",
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk17/WS21L-4x5-women-startpage-wk17.jpg?imwidth=768"
  }
];



const KidImages = [
  {
    id: 1,
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/kids/start-page-assets/w-17/4081B-16x9-NS-kids-start-page-prio-week-17.jpg?imwidth=1660"
  },
  {
    id: 2,
    title: "Image 2",
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk17/DS21H-4x5-women-startpage-wk17.jpg?imwidth=768"
  },
  {
    id: 3,
    title: "Image 3",
    url: "https://image.hm.com/content/dam/global_campaigns/season_01/kids/start-page-assets/w-17/4081A-4x5-NS-kids-start-page-prio-week-17.jpg?imwidth=768"
  }
];




// Individual category pages
const MenPage = () => <CategoryPage category="Men" title="Men" menImages="Images"  />;
const WomenPage = () => <CategoryPage category="Women" title="Women" womenImages="Images" />;
const KidPage = () => <CategoryPage category="Kid" title="Kid" KidImages="Images" />;

export { CategoryPage, MenPage, WomenPage, KidPage };
