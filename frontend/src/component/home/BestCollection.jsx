import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  ShoppingCartIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addToCart , deletes} from "../../redux/action";
import { useNavigate } from "react-router-dom";

const ProductPage = ({
  names,
  cost,
  desc,
  rating,
  image,
  sizes = [],
  colors = [],
  stock,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);
  


  // Get Tailwind color class based on color name
  function getColorClass(colorName) {
    const colorMap = {
      white: "bg-white",
      black: "bg-gray-900",
      gray: "bg-gray-200",
      red: "bg-red-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      yellow: "bg-yellow-400",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
    };
    return colorMap[colorName.toLowerCase()] || "bg-gray-200";
  }

  // Process incoming colors data
  const processColors = () => {
    if (colors && colors.length > 0) {
      return colors
        .map((color) => {
          // If color is an object with name property
          if (typeof color === "object" && color.name) {
            return {
              name: color.name,
              class: getColorClass(color.name),
              hexCode: color.hexCode || "",
              selectedClass: "ring-blue-500",
            };
          }
          // If color is a string
          else if (typeof color === "string") {
            return {
              name: color,
              class: getColorClass(color),
              selectedClass: "ring-blue-500",
            };
          }
          return null;
        })
        .filter(Boolean);
    }
    return [
      { name: "White", class: "bg-white", selectedClass: "ring-blue-500" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-blue-500" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-blue-500" },
    ];
  };

  // Process incoming sizes data
  const processSizes = () => {
    if (sizes && sizes.length > 0) {
      return sizes
        .map((size) => {
          // If size is an object with name and inStock properties
          if (typeof size === "object" && size.name) {
            return {
              name: size.name,
              inStock: typeof size.inStock === "boolean" ? size.inStock : true,
            };
          }
          // If size is a string
          else if (typeof size === "string") {
            return { name: size, inStock: true };
          }
          return null;
        })
        .filter(Boolean);
    }
    return [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
    ];
  };

  // Initialize product with provided props or defaults - ONCE
  const productData = {
    name: names || "Regular Fit Linen-blend trousers",
    price: cost || 1999,
    href: "#",
    image:
      image ||
      "https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w15/category-entries/Trousers-CE-Wk15-17-2x3.jpg?imwidth=1536", // Ensure image is at the top level
    images: {
      src:
        image ||
        "https://image.hm.com/assets/hm/da/8b/da8bdeaee1c3a128beaf91494fc30461daa834bc.jpg?imwidth=564",
      alt: "Product image",
    },
    colors: processColors(),
    sizes: processSizes(),
    description:
      desc ||
      "Trousers in an airy cotton and linen weave featuring covered elastication and a drawstring at the waist, a zip fly and button, side pockets and a welt back pocket. Regular fit for comfortable wear and a classic silhouette. Cotton and linen blends combine the softness of cotton with the sturdiness of linen, creating a beautiful, textured fabric that is breathable and drapes perfectly.",
    stock: stock || 10,
  };

  const reviews = {
    href: "#",
    average: rating?.rate || rating || 4,
    totalCount: rating?.count || 12 + "k",
  };

  // Set initial selected color and size
  const initialColor =
    productData.colors.length > 0 ? productData.colors[0] : null;
  const initialSize =
    productData.sizes.find((size) => size.inStock) ||
    (productData.sizes.length > 0 ? productData.sizes[0] : null);

  const [product] = useState(productData);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(1);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleQuantityChange = (action) => {
    if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (action === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      selectedColor: selectedColor?.name,
      selectedSize: selectedSize?.name,
      quantity: quantity,
      id: Date.now(), // Temporary ID for cart item
      // Ensure image is properly included for the cart
      image: product.image,
    };
  if (isInCart) {
      dispatch(deletes(itemToAdd));
    } else {
      dispatch(addToCart(itemToAdd));
    }
    setIsInCart(!isInCart);
    console.log("Adding item to cart:", itemToAdd);
    dispatch(addToCart(itemToAdd));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm font-medium text-gray-500">
          <a href="/" className="hover:text-gray-900">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/" className="hover:text-gray-900">
            Category
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product image */}
          <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={product.images.src}
              alt={product.images.alt}
              className="h-full w-full object-cover object-center cursor-pointer"
            />
          </div>

          {/* Product details */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* Price and reviews */}
            <div className="mt-3 flex items-center justify-between">
              <div>
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  ₹{Math.trunc(product.price)}
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((ratingValue) => (
                    <StarIcon
                      key={ratingValue}
                      className={classNames(
                        reviews.average > ratingValue
                          ? "text-yellow-500"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <a
                  href="#reviews"
                  className="ml-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              {/* Color selector */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-3 flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        className={classNames(
                          color.class,
                          selectedColor?.name === color.name
                            ? "ring-2 ring-indigo-500"
                            : "ring-1 ring-gray-200",
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                        )}
                        onClick={() => setSelectedColor(color)}
                      >
                        <span className="sr-only">{color.name}</span>
                        <span className="h-8 w-8 rounded-full border border-black border-opacity-10" />
                      </button>
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="mt-1 text-sm text-gray-500">
                      Selected: {selectedColor.name}
                    </p>
                  )}
                </div>
              )}

              {/* Size selector */}
              {product.sizes.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-8">
                    {product.sizes.map((size) => (
                      <button
                        key={size.name}
                        type="button"
                        className={classNames(
                          selectedSize?.name === size.name
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 bg-white text-gray-900",
                          !size.inStock
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:bg-gray-50",
                          "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase"
                        )}
                        disabled={!size.inStock}
                        onClick={() => size.inStock && setSelectedSize(size)}
                      >
                        {size.name}
                        {!size.inStock && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="sr-only">Out of stock</span>
                            <div className="h-px w-full bg-gray-200 transform rotate-45" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="mt-2 flex items-center border border-gray-300 rounded-md w-32">
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleQuantityChange("decrease")}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="w-full text-center border-0 focus:ring-0"
                    value={quantity}
                    readOnly
                  />
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleQuantityChange("increase")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Left side: Add to Cart + Buy */}
                <div className="flex flex-col flex-1 gap-4">
                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className={classNames(
                      "w-full px-4 py-2 rounded text-sm font-medium transition-colors duration-200 flex items-center justify-center",
                      isInCart
                        ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    )}
                  >
                    <ShoppingCartIcon className="w-4 h-4 mr-2" />
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                  {/* <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button> */}

                  {/* Buy */}
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={() => navigate("/Shipping")}
                  >
                    Buy
                  </button>
                </div>

                {/* Right side: Wishlist */}
                <div className="flex-1">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <HeartIcon className="h-5 w-5 mr-2" />
                    Wishlist
                  </button>
                </div>
              </div>

              {/* Product benefits */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="flex items-center">
                    <TruckIcon className="h-5 w-5 text-green-500" />
                    <span className="ml-2 text-sm text-gray-500">
                      Free shipping on orders over ₹999
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                    <span className="ml-2 text-sm text-gray-500">
                      1-year warranty
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
