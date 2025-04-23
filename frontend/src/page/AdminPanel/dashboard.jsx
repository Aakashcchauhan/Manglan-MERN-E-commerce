import React, { useState } from 'react';
import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { Package, ShoppingBag, DollarSign, Users } from 'lucide-react';

const DashboardPage = () => {
  // Sample data
  const salesData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  const productCategoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Books', value: 15 },
    { name: 'Home', value: 20 },
    { name: 'Other', value: 5 },
  ];

  const statCards = [
    { 
      title: 'Total Products', 
      value: '254', 
      change: '+12%', 
      icon: Package, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Total Orders', 
      value: '128', 
      change: '+18%', 
      icon: ShoppingBag, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Revenue', 
      value: '$12,628', 
      change: '+8%', 
      icon: DollarSign, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Customers', 
      value: '573', 
      change: '+5%', 
      icon: Users, 
      color: 'bg-orange-500' 
    }
  ];


  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-[150px]">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <span className="ml-2 text-xs font-medium text-green-600">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color} flex items-center justify-center`}>
                <Icon size={20} className="text-white" />
              </div>
            </div>
          </div>
          
          );
        })}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Sales Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Product Categories</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent orders */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((order) => (
                <tr key={order} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order + 1000}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Customer {order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-0{order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(order * 25 + 100).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order % 3 === 0 ? 'bg-yellow-100 text-yellow-800' : 
                        order % 2 === 0 ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {order % 3 === 0 ? 'Pending' : order % 2 === 0 ? 'Completed' : 'Processing'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;