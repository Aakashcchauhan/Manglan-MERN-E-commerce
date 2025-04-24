import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, deletes } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { ShoppingCart, Eye } from "lucide-react";

/**
 * ShoppingCard component displays a product card with image, details, 
 * and interaction options like add to cart and view details
 * 
 * - The product item data
 * @param {number} index - The index of the item in the list
 */
const ShoppingCard = ({ item, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInCart, setIsInCart] = useState(false);
  
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(deletes(item));
    } else {
      dispatch(addToCart(item));
    }
    setIsInCart(!isInCart);
  };

  const navigateToDetails = () => {
    navigate(`/shopcategory/category=${item.category}/product?${item._id || item.id}`, {
      state: {
        name: item.name,
        desc: item.description,
        cost: item.price,
        sizes: item.sizes,
        colors: item.colors,
        category: item.category,
        stock: item.stock,
        image: item.image,
        rating: item.rating
      },
    });
  };

  // Calculate a default rating if none exists
  const rating = item.rating?.rate || 4.2;
  const displayPrice = Math.trunc(item.price);

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative group">
        {/* Product Image */}
        <div className="h-64 bg-gray-50 p-4 flex items-center justify-center">
          <img
              loading="lazy"
            src={item.image}
            alt={item.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={handleCartAction}
              className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center w-10 h-10"
              aria-label={isInCart ? "Remove from cart" : "Add to cart"}
              title={isInCart ? "Remove from cart" : "Add to cart"}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={navigateToDetails}
              className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center w-10 h-10"
              aria-label="View details"
              title="View details"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900 truncate mb-1">
          {item.name}
        </h3>
        
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={classNames(
                rating > i ? "text-yellow-500" : "text-gray-300",
                "w-4 h-4"
              )}
              aria-hidden="true"
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating}
          </span>
        </div>
        
        <p className="text-lg font-semibold text-gray-900 mb-4">
          ₹{displayPrice}
        </p>
        
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleCartAction}
            className={classNames(
              "w-full px-4 py-2 rounded text-sm font-medium transition-colors duration-200 flex items-center justify-center",
              isInCart 
                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200" 
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={navigateToDetails}
              className="w-1/2 px-4 py-2 bg-gray-50 text-gray-800 rounded text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              View Details
            </button>
            
            <button
              onClick={() => navigate('/Shipping')}
              className="w-1/2 px-4 py-2 bg-gray-800 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;
