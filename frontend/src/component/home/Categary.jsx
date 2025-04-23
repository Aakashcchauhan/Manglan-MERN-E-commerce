import React, { useState } from "react";

const Category = () => {
  const items = [
    { id: 1, category: "Jacket" },
    { id: 2, category: "Shirt" },
    { id: 3, category: "Jeans" },
  ];

  // Initialize all items with `false`
  const initialState = items.reduce((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {});

  const [clickedItems, setClickedItems] = useState(initialState);

  const handleClick = (id) => {
    setClickedItems((prev) => ({
      ...prev,
      [id]: true, // Only sets to true, no toggling
    }));
  };

  return (
    <div className="w-full h-auto bg-white mb-10">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative w-full h-32 border-b-2 border-black group transition duration-400 cursor-pointer flex justify-center items-center overflow-hidden"
          onClick={() => handleClick(item.id)}
        >
          <h1 className="text-5xl font-extrabold z-10 text-black relative">
            {item.category}
          </h1>
          <div
            className={`bg-gray-500 absolute top-0 left-0 w-full h-full transition-transform duration-400 transform ${
              clickedItems[item.id] ? "translate-y-0 " : "translate-y-32"
            } group-hover:translate-y-0`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Category;
