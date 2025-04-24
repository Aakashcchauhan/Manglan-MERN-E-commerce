import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
  faPlus,
  faMinus,
  faX,
  faList,
  faMagnifyingGlass,
  faShirt,
  faGear, // Settings icon for mobile menu
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./Cards/Cart";

function Navbar() {
  // Keeping all your existing states and code...
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  // Add search functionality states
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchDebounceTimer, setSearchDebounceTimer] = useState(null);
  const promoCodes = [
    { code: "SAVE5", discount: "5% off", description: "Save 5% on orders up to ₹500", upTo: 500 },
    { code: "FREESHIP75", discount: "Free Shipping", description: "Get Free Shipping on orders up to ₹750", upTo: 750 },
    { code: "DEAL10", discount: "10% off", description: "10% discount on orders up to ₹1000", upTo: 1000 },
    { code: "SPRING15", discount: "15% off", description: "Spring offer: 15% off on orders up to ₹1500", upTo: 1500 },
    { code: "MEGA20", discount: "20% off", description: "Huge savings! 20% off on orders up to ₹2000", upTo: 2000 },
  ];
  const currentPromo = promoCodes[currentIndex];
  const nextPromo = promoCodes[(currentIndex + 1) % promoCodes.length];

  // Added mobile menu state
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [navState, setNavState] = useState({
    isOpen: false,
    isSearch: false,
    isCartOpen: false,
    searchQuery: "",
    openSubcategories: {},
  });

  const navigate = useNavigate();

  // Search functionality
  const fetchProducts = async (search = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/product/all?&search=${search}&limit=10`;
      
      const response = await axios.get(url);
      // Axios automatically parses JSON and checks content type
      setProducts(response.data.products);
    } catch (err) {
      // Get specific error message from server if available
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    setNavState({ ...navState, searchQuery: query });
    
    // Add debouncing to prevent too many API calls
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    
    if (query.trim().length > 1) {
      // Only search if there are at least 2 characters
      const timer = setTimeout(() => {
        fetchProducts(query);
      }, 300); // 300ms delay
      setSearchDebounceTimer(timer);
    } else if (query.trim().length === 0) {
      // Clear results if search box is empty
      setProducts([]);
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      fetchProducts(searchTerm);
    }
  };

  const toggleNav = (key) => {
    setNavState((prev) => ({ ...prev, [key]: !prev[key] }));
    // Clear search results when closing search
    if (key === "isSearch" && navState.isSearch) {
      setProducts([]);
      setSearchTerm("");
      setNavState(prev => ({ ...prev, searchQuery: "" }));
    }
  };

  const uniqueItemCount = useSelector((state) => {
    const uniqueItems = state.cart.cartItems.filter(
      (value, index, self) =>
        index === self.findIndex((item) => item._id === value._id)
    );
    return uniqueItems.length;
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowMobileMenu(false); 
    navigate("/account/login");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Rest of your code remains the same...
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    document.body.style.overflow = navState.isOpen || navState.isSearch || navState.isCartOpen ? "hidden" : "auto";
  }, [navState.isOpen, navState.isSearch, navState.isCartOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % promoCodes.length);
        setAnimating(false);
      }, 500); // animation duration
    }, 3000); // delay between promos
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (index) => {
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  // Navigation menu structure
  const menuItems = [
    {
      name: "Shop by category",
      submenu: [
        { 
          title: "Categories",
          links: ["New Arrival", "Men", "Women", "Kid", "Sale"]
        },
        {
          title: "Clothing Type",
          links: ["Shirts", "Polo", "Bottoms", "Winter Wear", "Luxury"]
        },
        {
          title: "Featured",
          links: ["Best Sellers", "New Collections", "Summer Essentials", "Limited Edition"]
        }
      ]
    },
    {
      name: "Shop by collection",
      submenu: [
        {
          title: "Seasonal",
          links: ["Summer 2025", "Spring 2025", "Holiday Collection", "Classic Collection"]
        },
        {
          title: "Special Lines",
          links: ["Premium Collection", "Eco-Friendly", "Limited Edition", "Collaborations"]
        }
      ]
    },
    {
      name: "Fit Guide",
      submenu: [
        {
          title: "Resources",
          links: ["Size Charts", "Body Measurement Guide", "How to Measure", "Find Your Size"]
        },
        {
          title: "Style Advice",
          links: ["Casual Styling", "Formal Looks", "Seasonal Fashion", "Mix & Match"]
        }
      ]
    }
  ];
  
  return (
    <>
      {/* All your existing code remains the same... */}
      {/* Top Bar */}
      <div className="top-bar bg-gray-700 h-10 overflow-hidden flex justify-center items-center text-white z-80 relative">
        {/* Your existing promo code display */}
        <div className="relative h-10 w-full flex justify-center items-center">
          <div
            className={`absolute transition-all duration-500 ${
              animating ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
            }`}
            key={currentPromo.code}
          >
            <p className=" cursor-pointer font-semibold text-center ">{currentPromo.code} - {currentPromo.discount}</p>
             
          </div>

          <div
            className={`absolute transition-all duration-500 ${
              animating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
            key={nextPromo.code}
          >
            <p className="font-semibold text-center">{nextPromo.code} - {nextPromo.discount}</p>
          </div>
        </div>
      </div>

      {/* Overlay for closing sidebar */}
      {(navState.isOpen || navState.isSearch || navState.isCartOpen || showMobileMenu) && (
        <div
          className="fixed top-0 left-0 w-full h-full backdrop-blur-md bg-white/30 bg-opacity-50 z-60"
          onClick={() => {
            setNavState({
              ...navState,
              isOpen: false,
              isSearch: false,
              isCartOpen: false,
            });
            setShowMobileMenu(false);
          }}
        ></div>
      )}

      {/* Your existing navigation and search code... */}
      {/* Sidebar Navigation (Mobile) */}
      <nav 
        className={`fixed w-[80%] h-screen bg-white p-10 z-70 text-2xl transition-all duration-500 transform scroll-auto  ${
          navState.isOpen ? "left-0" : "-left-full"
        }`}
      >
        {/* Your existing code for the mobile sidebar */}
        {/* Close Button */}
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faX}
            className="cursor-pointer text-3xl text-black"
            onClick={() => toggleNav("isOpen")}
          />
        </div>

        {/* Mobile Menu */}
        <div className="mt-6">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-6 ">
              <div
                className="flex justify-between items-center cursor-pointer  font-semibold text-black mb-3 "
                onClick={() => {
                  setNavState(prev => ({
                    ...prev,
                    openSubcategories: {
                      ...prev.openSubcategories,
                      [index]: !prev.openSubcategories[index]
                    }
                  }));
                }}
              >
                {item.name}
                <FontAwesomeIcon
                  icon={navState.openSubcategories && navState.openSubcategories[index] ? faMinus : faPlus}
                />
              </div>

              {navState.openSubcategories && navState.openSubcategories[index] && (
                <div className="ml-4">
                  {item.submenu.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-4">
                      <h3 className="text-gray-500 text-lg mb-2">{section.title}</h3>
                      <ul>
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex} className="mb-2">
                            <Link
                              to={`/shopcategory/${link.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-black hover:text-gray-600 text-lg"
                              onClick={() => setNavState(prev => ({ ...prev, isOpen: false }))}
                            >
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Search Slide NavBar - UPDATED WITH SEARCH FUNCTIONALITY */}
      <nav
        className={`absolute w-[80%] lg:w-[30%] h-screen bg-white z-70 text-2xl transition-all duration-500 transform scroll-auto ${
          navState.isSearch ? "left-0" : "-left-full"
        }`}
      >
        <div className="flex items-center h-20 border-b pl-5">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-gray-600 text-xl mr-3 cursor-pointer"
            onClick={handleSearchSubmit}
          />
          <input
           type="text"
           placeholder="What are you looking for?"
           className="outline-none text-[20px] px-5 text-black w-[80%]"
           value={searchTerm}
           onChange={handleSearchChange}
            onKeyPress={handleSearchSubmit}
          />
          <FontAwesomeIcon
            icon={faX}
            className="cursor-pointer text-2xl text-black"
            onClick={() => toggleNav("isSearch")}
          />
        </div>
        
        {/* Search Results */}
        <div className="p-5 overflow-y-auto max-h-[calc(100vh-80px)]">
          {loading && <p className="text-center text-lg">Loading...</p>}
          
          {error && <p className="text-center text-red-500 text-lg">{error}</p>}
          
          {!loading && !error && products.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Search Results</h3>
              <div className="space-y-4">
                {products.map((product) => (
                  <Link 
                    key={product._id} 
                    to={`/product/${product._id}`}
                    className="flex items-center p-3 border-b hover:bg-gray-50 transition-colors"
                    onClick={() => setNavState(prev => ({ ...prev, isSearch: false }))}
                  >
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-16 h-16 object-cover mr-4"
                      />
                    )}
                    <div>
                      <h4 className="text-lg font-medium">{product.title}</h4>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-sm font-semibold">₹{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {!loading && !error && searchTerm && products.length === 0 && (
            <p className="text-center text-lg mt-10">No products found matching "{searchTerm}"</p>
          )}
          
          {!searchTerm && !products.length && (
            <div className="text-center mt-10">
              <p className="text-lg">Type what you're looking for and press Enter</p>
            </div>
          )}
        </div>
      </nav>

      {/* Cart */}
      <nav 
        className={`fixed w-[90%] lg:w-[30%] h-screen bg-white p-1 z-70 text-2xl transition-all duration-500 transform scroll-auto ${
          navState.isCartOpen ? "right-0" : "-right-full"
        }`}
      >
        <div className="relative p-5">
          <div className="absolute text-3xl font-extrabold">Cart</div>
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon={faX}
              className="cursor-pointer text-3xl text-black"
              onClick={() => toggleNav("isCartOpen")}
            />
          </div>
        </div>
        <Cart />
      </nav>

      {/* Mobile Settings Menu - UPDATED to show only login/signup or logout */}
      <div className={`fixed right-0 top-14 w-48 bg-white shadow-lg rounded-bl-md z-70 transition-all duration-300 ${
        showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {isLoggedIn ? (
          <div className="py-2">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="py-2">
            <Link
              to="/account/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMobileMenu(false)}
            >
              Login
            </Link>
            <Link
              to="/account/signup"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMobileMenu(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Main Navbar */}
      <div className="relative z-50">
        <nav className="w-full h-14 lg:h-16 flex items-center bg-white bg-opacity-90 backdrop-blur-sm text-black px-5 lg:px-10 shadow-sm transition-all duration-300">
          {/* Mobile Sidebar Toggle */}
          <button
            className="p-2 rounded cursor-pointer lg:hidden"
            onClick={() => toggleNav("isOpen")}
          >
            <FontAwesomeIcon icon={faList} />
          </button>

          {/* Brand Logo (optional) */}
          <Link to={"/"}><div className="text-xl font-semibold mx-4">Manglan Cloting</div></Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className="relative h-16 flex items-center cursor-pointer"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="text-md lg:ml-10 2xl:ml-25 font-bold hover:opacity-70 transition-opacity">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-1 justify-end items-center gap-4">
            {/* Search Icon */}
            <div
              className="cursor-pointer"
              onClick={() => toggleNav("isSearch")}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>

            {/* Login & Signup Buttons (Desktop) */}
            <div className="hidden md:flex gap-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border font-bold border-black text-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 rounded"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/account/login"
                    className="px-4 py-2 border font-bold border-black text-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 rounded"
                  >
                    Login
                  </Link>
                  <Link
                    to="/account/signup"
                    className="px-4 py-2 border font-bold border-black text-black cursor-pointer hover:bg-black hover:text-white transition-all duration-300 rounded"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Settings Icon (Mobile only) */}
            <div className="md:hidden cursor-pointer" onClick={toggleMobileMenu}>
              <FontAwesomeIcon icon={faGear} />
            </div>

            {/* Cart Icon */}
            <div
              className="relative cursor-pointer"
              onClick={() => toggleNav("isCartOpen")}
            >
              <FontAwesomeIcon icon={faShirt} className="text-lg" />
              {uniqueItemCount > 0 && (
                <div className="w-4 h-4 rounded-full absolute -top-1 -right-1 bg-red-600 border border-white flex items-center justify-center text-white text-xs">
                  {uniqueItemCount}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Dropdown Menus */}
        {activeMenu !== null && (
          <div 
            className="absolute left-0 right-0 bg-white text-black shadow-lg pt-6 pb-8 z-40 border-t border-gray-200"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-6xl mx-auto px-12 grid grid-cols-3 gap-12">
              {menuItems[activeMenu].submenu.map((section, sectionIndex) => (
                <div key={sectionIndex} className="flex flex-col">
                  <h3 className="text-sm font-semibold mb-4 text-gray-500">{section.title}</h3>
                  <ul>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="mb-3">
                        <Link 
                          to={`/shopcategory/${link.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm hover:text-blue-500 transition-colors"
                          onClick={() => setActiveMenu(null)}
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
