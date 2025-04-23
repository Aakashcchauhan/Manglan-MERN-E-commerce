import { useState } from "react";
import {
  CreditCard,
  Truck,
  ShoppingBag,
  ChevronRight,
  Check,
} from "lucide-react";
import Navbar from "../component/navbar";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const [chance, setChance] = useState(1);
  const [promo, setPromo] = useState(null);
  const [message, setMessage] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const promoCodes = [
    {
      code: "SAVE5",
      discount: "5% off",
      description: "Save 5% on orders up to ₹500",
      upTo: 500,
      value: 0.05, // 5%
    },
    {
      code: "FREESHIP75",
      discount: "Free Shipping",
      description: "Get Free Shipping on orders up to ₹750",
      upTo: 750,
      value: "shipping", // Special case for free shipping
    },
    {
      code: "DEAL10",
      discount: "10% off",
      description: "10% discount on orders up to ₹1000",
      upTo: 1000,
      value: 0.10, // 10%
    },
    {
      code: "SPRING15",
      discount: "15% off",
      description: "Spring offer: 15% off on orders up to ₹1500",
      upTo: 1500,
      value: 0.15, // 15%
    },
    {
      code: "MEGA20",
      discount: "20% off",
      description: "Huge savings! 20% off on orders up to ₹2000",
      upTo: 2000,
      value: 0.20, // 20%
    },
  ];
  
  function applyPromoCode(num) {
    switch (num) {
      case "1":
        return promoCodes[0];
      case "2":
        return promoCodes[1];
      case "3":
        return promoCodes[2];
      case "4":
        return promoCodes[3];
      case "5":
        return promoCodes[4];
      default:
        return promoCodes[0];
    }
  }
  
  const handleGetPromoCode = () => {
    if (chance !== 1) {
      setMessage("Congratulations! You already received a PromoCode.");
      return;
    } else {
      const randomNum = Math.floor(Math.random() * 5 + 1).toString();
      const newPromo = applyPromoCode(randomNum);
      setPromo(newPromo);
      setChance(0); // Decrease chance to 0
      
      // Calculate discount based on the promo code
      calculateDiscount(newPromo);
    }
  };

  const calculateDiscount = (promoCode) => {
    if (!promoCode) return 0;
    
    const subtotalValue = subtotal;
    
    if (promoCode.value === "shipping") {
      setDiscountAmount(shipping);
      setMessage(`Applied "${promoCode.code}": Free shipping (₹${shipping.toFixed(2)} off)`);
    } else {
      // Calculate percentage discount
      const maxDiscount = Math.min(subtotalValue * promoCode.value, promoCode.upTo);
      setDiscountAmount(maxDiscount);
      setMessage(`Applied "${promoCode.code}": ₹${maxDiscount.toFixed(2)} off`);
    }
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  
  // Calculate total with discount applied
  const total = subtotal + shipping + tax - discountAmount;

  const uniqueItemCount = useSelector((state) => {
    const uniqueItems = state.cart.cartItems.filter(
      (value, index, self) =>
        index === self.findIndex((item) => item._id === value._id)
    );
    return uniqueItems.length;
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("Order placed successfully!");
    }
  };

  const StepIndicator = ({ currentStep, totalSteps }) => {
    return (
      <div className="flex items-center mb-8">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
          (stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  stepNumber < currentStep
                    ? "bg-green-500"
                    : stepNumber === currentStep
                    ? "bg-blue-500"
                    : "bg-gray-300"
                } text-white`}
              >
                {stepNumber < currentStep ? <Check size={16} /> : stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`w-12 h-1 ${
                    stepNumber < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
            <div className="flex items-center">
              <ShoppingBag className="text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">
                {uniqueItemCount} items
              </span>
            </div>
          </div>

          <StepIndicator currentStep={step} totalSteps={3} />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow">
              {step === 1 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="bg-blue-500 text-white p-1 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                      1
                    </span>
                    Customer Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center"
                    >
                      Continue <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="bg-blue-500 text-white p-1 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                      2
                    </span>
                    Shipping Address
                    <Truck className="ml-2 text-blue-500" size={20} />
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="IN">India</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center"
                    >
                      Continue <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="bg-blue-500 text-white p-1 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                      3
                    </span>
                    Payment Details
                    <CreditCard className="ml-2 text-blue-500" size={20} />
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="lg:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow mb-4">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <div>
                        <p className="font-medium ">
                          {" "}
                          {item.name.split(" ").slice(0, 5).join(" ") + "..."}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        Rs :- {item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p>Rs :- {subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p>Rs :- {shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Tax</p>
                    <p>Rs :- {discountAmount - tax.toFixed(2)}</p>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Discount</p>
                      <p>- Rs :- {discountAmount.toFixed(2)}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <p>Total</p>
                    <p>Rs :- {total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mb-4">
                <h2 className="text-xl font-bold mb-4">Promo Code Generator</h2>

                <button
                  className={`${
                    chance === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
                  } text-white px-6 py-2 rounded-md flex items-center justify-center w-full mb-4`}
                  onClick={handleGetPromoCode}
                  disabled={chance !== 1}
                >
                  {chance === 1 ? "Get Promo Code" : "Already Used"}
                </button>

                {message && (
                  <p className="text-green-600 font-medium">{message}</p>
                )}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-700 mb-2">
                  Secure Checkout
                </h3>
                <p className="text-sm text-blue-600">
                  All transactions are secure and encrypted. Your personal
                  information is never shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}