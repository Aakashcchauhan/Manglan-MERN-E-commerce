import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Printer,
  Download,
  Truck,
  Package,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { orderId } = useParams(); // Get order ID from URL params
  const [order, setOrder] = useState(null); // State for order data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Simulate fetching order data from an API
    const fetchOrder = async () => {
      try {
        setLoading(true);
        // Simulated API call
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              id: 1001,
              date: "2025-04-05",
              status: "Completed",
              customer: {
                name: "John Smith",
                email: "john.smith@example.com",
                phone: "(555) 123-4567",
              },
              shipping: {
                address: "123 Main Street",
                city: "Anytown",
                state: "CA",
                zip: "12345",
                country: "USA",
              },
              billing: {
                address: "123 Main Street",
                city: "Anytown",
                state: "CA",
                zip: "12345",
                country: "USA",
              },
              payment: {
                method: "Credit Card",
                card: "**** **** **** 4242",
                subtotal: 119.97,
                shipping: 9.99,
                tax: 10.8,
                total: 140.76,
              },
              items: [
                {
                  id: 1,
                  name: "Wireless Headphones",
                  sku: "WH-001",
                  price: 59.99,
                  quantity: 1,
                },
                {
                  id: 2,
                  name: "Smart Watch",
                  sku: "SW-003",
                  price: 199.99,
                  quantity: 1,
                },
                {
                  id: 3,
                  name: "USB-C Cable",
                  sku: "UC-010",
                  price: 14.99,
                  quantity: 2,
                },
              ],
              timeline: [
                {
                  id: 1,
                  status: "Order Placed",
                  date: "2025-04-05 09:15 AM",
                  icon: Package,
                },
                {
                  id: 2,
                  status: "Payment Confirmed",
                  date: "2025-04-05 09:18 AM",
                  icon: CreditCard,
                },
                {
                  id: 3,
                  status: "Shipped",
                  date: "2025-04-06 11:42 AM",
                  icon: Truck,
                },
                {
                  id: 4,
                  status: "Delivered",
                  date: "2025-04-08 02:30 PM",
                  icon: CheckCircle,
                },
              ],
            });
          }, 1000)
        );

        setOrder(response);
      } catch (err) {
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="text-center py-10">Loading order details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/admin/orders" className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Order #{order.id}</h1>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {order.status}
          </span>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md">
            <Printer size={16} />
            Print
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md">
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info, Customer Info, and Shipping */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Order Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">#{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Placed</p>
                <p className="font-medium">{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{order.payment.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{order.status}</p>
              </div>
            </div>
          </div>

          {/* Customer and Shipping Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Customer Information</h2>
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-sm text-gray-500">{order.customer.email}</p>
              <p className="text-sm text-gray-500">{order.customer.phone}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-sm text-gray-500">{order.shipping.address}</p>
              <p className="text-sm text-gray-500">
                {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
              </p>
              <p className="text-sm text-gray-500">{order.shipping.country}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Order Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Summary and Timeline */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${order.payment.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>${order.payment.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span>${order.payment.tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between font-medium">
                <span>Total</span>
                <span>${order.payment.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Order Timeline</h2>
            <div className="space-y-6">
              {order.timeline.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                        <Icon size={16} />
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className="h-full w-px bg-blue-200 my-1"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;