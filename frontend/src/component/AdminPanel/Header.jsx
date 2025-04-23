// component/AdminPanel/Header.js
import React, { useState, useEffect, useContext } from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('authToken');
        
        const response = await fetch(`http://localhost:8080/user/profile/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch admin profile');
        }
        
        const data = await response.json();
        setAdminProfile(data);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminProfile();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/account/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 mr-4">
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          {loading ? (
            <span className="text-sm font-medium hidden md:inline">Loading...</span>
          ) : error ? (
            <span className="text-sm font-medium hidden md:inline text-red-500">Error</span>
          ) : (
            <span className="text-sm font-medium hidden md:inline">
              {adminProfile?.firstname || user?.firstname || 'Admin'}
            </span>
          )}
        </div>
        <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;