import React from "react";
import { useNavigate } from "react-router-dom";

const PriceCard = ({ image, price, name, category, _id }) => {
  const navigate = useNavigate();
  const productId = _id;
  
  const handleCardClick = () => {
    navigate(`/shopcategory/category=${category}/${productId}`);
  };
  
  return (
    <div className="w-64 h-96 mx- my-6 transition-transform duration-300 hover:scale-105 cursor-pointer  rounded-lg overflow-hidden">
      <div 
        className="w-full h-80 bg-gray-100 overflow-hidden" 
        onClick={handleCardClick}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
      </div>
      <div className="px-4 py-3 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-gray-600 font-medium">Rs. {Math.trunc(price)}</p>
      </div>
    </div>
  );
};

export default PriceCard;