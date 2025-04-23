import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-15'
      }`}>
        <div className="p-6">
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default Layout;