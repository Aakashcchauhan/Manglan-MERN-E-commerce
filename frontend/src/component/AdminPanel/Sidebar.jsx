import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Star, 
  Settings, 
  Users, 
  BarChart 
} from 'lucide-react';
const Sidebar = ({ isOpen }) => {
const NavItem = ({ to, icon: Icon, label, active }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
        active 
          ? 'bg-blue-100 text-blue-600 ' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
     <Icon size={20} />
     {isOpen && <span className="font-medium">{label}</span>}
    </Link>
  );
};


  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/admin/features', icon: Star, label: 'Features' },
    { to: '/admin/customers', icon: Users, label: 'Customers' },
    { to: '/admin/reports', icon: BarChart, label: 'Reports' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={`bg-white border-r border-gray-200 h-screen fixed top-0 left-0 z-20 pt-16 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
      }`}>  
      <div className="h-full overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.to} 
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              active={pathname === item.to} 
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;