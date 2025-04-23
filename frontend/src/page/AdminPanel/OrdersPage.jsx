import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Download, Eye } from 'lucide-react';

const OrdersPage = () => {
  // Sample orders data
  const orders = [
    { 
      id: 1001, 
      customer: 'John Smith', 
      date: '2025-04-05', 
      amount: 128.99, 
      status: 'Completed',
      items: 3 
    },
    { 
      id: 1002, 
      customer: 'Sarah Johnson', 
      date: '2025-04-04', 
      amount: 79.95, 
      status: 'Processing',
      items: 2 
    },
    { 
      id: 1003, 
      customer: 'Michael Brown', 
      date: '2025-04-03', 
      amount: 214.50, 
      status: 'Pending',
      items: 4 
    },
    { 
      id: 1004, 
      customer: 'Emily Davis', 
      date: '2025-04-02', 
      amount: 56.75, 
      status: 'Completed',
      items: 1 
    },
    { 
      id: 1005, 
      customer: 'David Wilson', 
      date: '2025-04-01', 
      amount: 149.99, 
      status: 'Shipped',
      items: 2 
    },
    { 
      id: 1006, 
      customer: 'Lisa Miller', 
      date: '2025-03-31', 
      amount: 89.99, 
      status: 'Cancelled',
      items: 1 
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Download size={16} />
          Export Orders
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md">
            <Filter size={16} />
            Filters
          </button>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>All Status</option>
            <option>Completed</option>
            <option>Processing</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Cancelled</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Today</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Order ID
                  <ChevronDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Date
                  <ChevronDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Amount
                  <ChevronDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye size={18} /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">24</span> orders
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;