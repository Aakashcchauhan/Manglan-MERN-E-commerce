import React from 'react';
import { Outlet } from 'react-router-dom';
// import Footer from '../Footer'; // Import your footer component if you have one

const ShopLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* The Navbar is already included in each category page, 
          so we don't need to include it here */}
      
      {/* Main content area */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer - uncomment if you have a Footer component */}
      {/* <Footer /> */}
    </div>
  );
};

export default ShopLayout;