// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home/home";
import Man from "./page/ShopCategory/men";
import Women from "./page/ShopCategory/women";
import Kid from "./page/ShopCategory/kid";
import Detailed from "./page/detailed";
import SignupPage from "./page/Auth/Signup";
import LoginPage from "./page/Auth/Login";
import Shipping from "./page/Shipping";
import AdminLayout from "./component/AdminPanel/layout";
import AdminDashboard from "./page/AdminPanel/dashboard";
import AdminOrders from "./page/AdminPanel/OrdersPage";
import AdminProducts from "./page/AdminPanel/ProductPage";
import AdminFeatures from "./page/AdminPanel/FeaturesPage";
import AdminCustomer from "./page/AdminPanel/CustomersPage";
import Account from "./component/Auth/Auth";
import CheckAuth from "./page/CheckAuth/check-auth";
import NotFound from "./page/ErrorPage/NotFound";
import UnauthorizedPage from "./page/ErrorPage/UnauthorizedPage";
import AuthContext from "./context/AuthContext";

function App() {
  // Authentication state management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  // Check authentication on load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
     
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
     
      if (userData) {
        try {
          const userObj = JSON.parse(userData);
          setUser(userObj);
        } catch (e) {
          console.error("Error parsing user data:", e);
          localStorage.removeItem('user'); // Clear invalid data
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Authentication methods to be shared across components
  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shopcategory/men" element={<Man />} />
          <Route path="/shopcategory/women" element={<Women />} />
          <Route path="/shopcategory/kid" element={<Kid />} />
          <Route path="/details" element={<Detailed />} />
          <Route path="/shopcategory/:category/:title" element={<Detailed />} />
         
          {/* Authentication routes */}
          <Route path="/account" element={<Account />}>
            <Route path="signup" element={
              <CheckAuth allowIfAuthenticated={false}>
                <SignupPage />
              </CheckAuth>
            } />
            <Route path="login" element={
              <CheckAuth allowIfAuthenticated={false}>
                <LoginPage />
              </CheckAuth>
            } />
          </Route>
          
          {/* Protected routes */}
          <Route path="/shipping" element={
            <CheckAuth>
              <Shipping />
            </CheckAuth>
          } />
         
          {/* Admin routes */}
          <Route path="/admin" element={
            <CheckAuth requireAdmin={true}>
              <AdminLayout />
            </CheckAuth>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="features" element={<AdminFeatures />} />
            <Route path="customers" element={<AdminCustomer />} />
          </Route>
         
          {/* Error pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;