import React, { useState, useEffect } from "react";

const ProductForm = ({
  initialProduct = {},
  isEditing = false,
  onSubmit,
  onCancel,
}) => {
  // Debug logging to verify what's being received
  console.log("initialProduct received:", initialProduct);
  console.log("isEditing:", isEditing);

  const [product, setProduct] = useState({
    name: initialProduct?.name || "",
    description: initialProduct?.description || "",
    price: initialProduct?.price || "",
    sizes: initialProduct?.sizes || [],
    colors: initialProduct?.colors || [],
    category: initialProduct?.category || "",
    stock: initialProduct?.stock || "",
    featured: initialProduct?.featured || false,
  });

  const [tags, setTags] = useState(initialProduct?.tags || []);
  const [inputText, setInputText] = useState("");
  const predefinedTags = ["JavaScript", "React", "Node.js", "CSS", "HTML"];

  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [currentTab, setCurrentTab] = useState("basic"); // For tab navigation
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Comprehensive effect to handle all initialProduct properties when component mounts or initialProduct changes
  useEffect(() => {
    if (isEditing && initialProduct) {
      console.log("Updating form with initialProduct:", initialProduct);
      
      // Update the product state with all initialProduct properties
      setProduct({
        name: initialProduct.name || "",
        description: initialProduct.description || "",
        price: initialProduct.price || "",
        sizes: initialProduct.sizes || [],
        colors: initialProduct.colors || [],
        category: initialProduct.category || "",
        stock: initialProduct.stock || "",
        featured: initialProduct.featured || false,
      });
      
      // Handle tags if available
      if (initialProduct.tags) {
        setTags(initialProduct.tags);
      }
      
      // Update preview image if there is one
      if (initialProduct.image) {
        // Check if image already includes the base URL
        if (initialProduct.image.startsWith('http')) {
          setPreview(initialProduct.image);
        } else {
          setPreview(`http://localhost:8080${initialProduct.image}`);
        }
      }
      
      // Handle sizes
      if (initialProduct.sizes && initialProduct.sizes.length > 0) {
        const initialSelectedSizes = initialProduct.sizes.map(size => 
          typeof size === 'object' ? size.name : size
        );
        setSelectedSizes(initialSelectedSizes);
        console.log("Setting selected sizes:", initialSelectedSizes);
      }
    }
  }, [isEditing, initialProduct]);

  const handleTagClick = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newTag = value.replace(",", "").trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputText("");
    } else {
      setInputText(value);
    }
  };

  // Available sizes configuration
  const availableSizes = [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setImageUrl("");
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreview(url);
    setImage(null);
  };

  const handleCheckboxChange = (sizeName) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeName)
        ? prev.filter((name) => name !== sizeName)
        : [...prev, sizeName]
    );
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...product.colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setProduct({ ...product, colors: updatedColors });
  };

  const addColor = () => {
    setProduct({
      ...product,
      colors: [...product.colors, { name: "", hexCode: "" }],
    });
  };

  const removeColor = (index) => {
    const updatedColors = product.colors.filter((_, i) => i !== index);
    setProduct({ ...product, colors: updatedColors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert selected sizes into the format expected by the backend
    const formattedSizes = selectedSizes.map((sizeName) => {
      const sizeObj = availableSizes.find((s) => s.name === sizeName);
      return {
        name: sizeName,
        inStock: sizeObj ? sizeObj.inStock : true,
      };
    });

    // Update the product with formatted sizes and image URL
    const updatedProduct = {
      ...product,
      sizes: formattedSizes,
      tags: tags,
      image: imageUrl || null,
    };

    console.log("Submitting product:", updatedProduct);

    const formData = new FormData();

    // Add all product properties to formData
    for (let key in updatedProduct) {
      if (key === "sizes" || key === "colors" || key === "tags") {
        formData.append(key, JSON.stringify(updatedProduct[key]));
      } else {
        formData.append(key, updatedProduct[key]);
      }
    }

    // If editing, preserve the product ID
    if (isEditing && initialProduct._id) {
      formData.append("_id", initialProduct._id);
    }

    if (image) formData.append("image", image);
    onSubmit(formData);
    setMessage(isEditing ? "Product updated successfully!" : "Product added successfully!");
    setTimeout(() => setMessage(""), 3000);

    if (!isEditing) {
      // Reset the form if adding a new product
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        featured: false,
        sizes: [],
        colors: [],
      });
      setImage(null);
      setPreview("");
      setSelectedSizes([]);
      setImageUrl("");
      setTags([]);
    }
  };

  // Define tab content render functions
  const renderBasicInfoTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Describe your product in detail"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg shadow-sm p-3 pl-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            min="0"
            className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
            placeholder="Enter stock quantity"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        >
          <option value="">Select a category</option>
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

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={product.featured}
          onChange={handleChange}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="featured" className="text-sm text-gray-700">
          Feature this product on homepage
        </label>
      </div>
    </div>
  );

  const renderImagesTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto object-contain"
            />
            <button
              type="button"
              onClick={() => {
                setPreview("");
                setImage(null);
                setImageUrl("");
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center py-10">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-500">
              Upload a product image or provide a URL
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>
    </div>
  );

  const renderVariantsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Sizes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {availableSizes.map((size) => (
            <div
              key={size.name}
              onClick={() => handleCheckboxChange(size.name)}
              className={`cursor-pointer p-3 rounded-lg text-center border transition ${
                selectedSizes.includes(size.name)
                  ? "bg-blue-50 border-blue-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <span className="block font-medium">{size.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Colors</h3>
        {product.colors.map((color, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 mb-3 p-3 bg-gray-50 rounded-lg"
          >
            {color.hexCode && (
              <div
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: color.hexCode }}
              ></div>
            )}
            <input
              type="text"
              placeholder="Color Name"
              value={color.name}
              onChange={(e) => handleColorChange(index, "name", e.target.value)}
              className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Hex Code (e.g. #FF5733)"
              value={color.hexCode}
              onChange={(e) =>
                handleColorChange(index, "hexCode", e.target.value)
              }
              className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => removeColor(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addColor}
          className="flex items-center space-x-2 mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Add Color</span>
        </button>
      </div>
    </div>
  );

  const renderTagsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Product Tags
        </h3>
        <div className="border border-gray-300 rounded-lg p-3 min-h-32 bg-white">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full cursor-pointer transition hover:bg-blue-200"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag}{" "}
                <span className="ml-1 text-xs text-blue-600 font-bold">×</span>
              </span>
            ))}
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type tag and press comma to add..."
              className="flex-1 border-none focus:outline-none min-w-32 bg-transparent p-1"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Press comma (,) after each tag to add it.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Suggested Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {predefinedTags.map((tag, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      encType="multipart/form-data"
    >
      <div className="p-6 bg-gray-800 text-white">
        <h2 className="text-xl font-bold">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-gray-300 mt-1">
          {isEditing
            ? "Update your product information"
            : "Fill in the details to add a new product"}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          type="button"
          onClick={() => setCurrentTab("basic")}
          className={`px-6 py-3 font-medium text-sm ${
            currentTab === "basic"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Basic Info
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab("images")}
          className={`px-6 py-3 font-medium text-sm ${
            currentTab === "images"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Images
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab("variants")}
          className={`px-6 py-3 font-medium text-sm ${
            currentTab === "variants"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Variants
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab("tags")}
          className={`px-6 py-3 font-medium text-sm ${
            currentTab === "tags"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Tags
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {currentTab === "basic" && renderBasicInfoTab()}
        {currentTab === "images" && renderImagesTab()}
        {currentTab === "variants" && renderVariantsTab()}
        {currentTab === "tags" && renderTagsTab()}

        {message && (
          <div className="mt-6 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {message}
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;