import React from 'react';
import { useParams } from 'react-router-dom';

function Category() {
  const { categoryName } = useParams(); // Get the category name from the URL

  return (
    <div>
      <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Category</h2>
      <p>Displaying products for the {categoryName} category.</p>
    </div>
  );
}

export default Category;
