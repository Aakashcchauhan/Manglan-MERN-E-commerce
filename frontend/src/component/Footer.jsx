import React from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gray-800 text-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main footer sections */}
        <div className="flex flex-wrap justify-between">
          {/* Company section */}
          <div className="w-full md:w-1/4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Manglan</h2>
            <p className="mb-4 text-gray-400 pr-4">
              Your premier destination for quality fashion and accessories for the entire family.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Shop categories */}
          <div className="w-full md:w-1/5 mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Shop by Category</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Men's Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women's Fashion</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kids' Apparel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale Items</a></li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="w-full md:w-1/5 mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Stores</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Customer policies */}
          <div className="w-full md:w-1/5 mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Customer Policies</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Orders</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="w-full md:w-1/5 mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Delhi Fashion Street, Style City, SC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>+91 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>support@mangl.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter subscription - optional */}
        <div className="border-t border-gray-700 pt-8 pb-6 mt-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h4>
              <p className="text-gray-400 text-sm">Stay updated with our latest trends and products</p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="p-2 w-full rounded-l text-gray-800 focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 mt-6 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Manglan. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            All trademarks and registered trademarks are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;