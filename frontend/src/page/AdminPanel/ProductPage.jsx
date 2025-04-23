import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Filter, X } from "lucide-react";
import ProductForm from "../../component/forms/ProductForm";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async (page = 1, search = "", category = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/product/all?page=${page}&limit=10`;
      if (search) url += `&search=${search}`;
      if (category) url += `&category=${category}`;

      const response = await fetch(url);
      const contentType = response.headers.get("content-type");
      if (!response.ok) throw new Error("Failed to fetch products");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 10));
        setCurrentPage(page);
      } else {
        throw new Error("Invalid JSON response");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, searchTerm, selectedCategory);
  }, [currentPage, searchTerm, selectedCategory]);

  const handleAddProduct = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/product/add", {
        method: "POST",
        body: formData, // FormData for multipart/form-data
      });

      if (!response.ok) throw new Error("Failed to add product");

      const data = await response.json();
      console.log("Product added:", data);

      // Refresh product list
      fetchProducts(currentPage, searchTerm, selectedCategory);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch a single product by ID for editing
  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/product/${productId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product details`);
      }

      const productData = await response.json();
      return productData;
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message);
      return null;
    }
  };

  const handleUpdateProductSubmit = async (formData) => {
    try {
      const productId = currentProduct._id;
      const response = await fetch(
        `http://localhost:8080/product/update/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update product: ${errorText}`);
      }

      // Fixed the variable name from getResponse to response

      // Refresh product list
      fetchProducts(currentPage, searchTerm, selectedCategory);

      setCurrentProduct(null);
      setShowForm(false);
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/product/delete/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to delete product: ${productId}`);
        }

        // Refresh product list
        fetchProducts(currentPage, searchTerm, selectedCategory);
      } catch (err) {
        console.error("Delete error:", err);
        setError(err.message);
      }
    }
  };

  const handleEditClick = async (productId) => {
    try {
      const productData = await fetchProductById(productId);
      console.log(productData)
      if (productData) {
        setCurrentProduct(productData);
        setIsEditing(true);
        setShowForm(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchProducts(1, searchTerm, selectedCategory);
  };

  const handleClearForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setIsEditing(false);
            setCurrentProduct(null);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 items-center">
        <form onSubmit={handleSearch} className="flex flex-1 items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Search
          </button>
        </form>

        <div className="flex items-center">
          <Filter size={18} className="mr-2 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // Reset to first page on new category selection
              fetchProducts(1, searchTerm, e.target.value);
            }}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="New Arrival">New Arrival</option>
            <option value="Men">Men</option>
            <option value="Shirts">Shirts</option>
            <option value="Kid">Kid</option>
            <option value="Polo">Polo</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Winter Wear">Winter Wear</option>
            <option value="Luxury">Luxury</option>
            <option value="Women">Women</option>
            <option value="Sale">Sale</option>
          </select>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={handleClearForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <ProductForm
              onSubmit={
                isEditing ? handleUpdateProductSubmit : handleAddProduct
              }
              initialProduct={currentProduct}
              isEditing={isEditing}
              onCancel={handleClearForm}
            />
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError("")}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No img
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {product._id.substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Rs:- {parseFloat(product.price).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(product._id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium 
                  ${
                    currentPage === page
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
