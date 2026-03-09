import React from "react";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";

export const SweetCard = ({ sweet }) => {
  const { addItem } = useCartStore();
  const isOutOfStock = sweet.quantity === 0;

  const handleAddToCart = () => {
    const success = addItem(sweet);
    if (success) {
      toast.success(`Added ${sweet.name} to cart!`);
    } else {
      toast.error(`Cannot add more ${sweet.name}. Stock limit reached!`);
    }
  };

  return (
    <div className="group bg-white/70 backdrop-blur-sm rounded-[2.5rem] shadow-premium hover:shadow-premium-hover overflow-hidden transition-all duration-500 border border-white/50 transform hover:-translate-y-2">
      {/* Image Area */}
      <div className="relative h-52 overflow-hidden bg-gray-50">
        {sweet.image_url ? (
          <img
            src={sweet.image_url}
            alt={sweet.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <svg
              className="w-20 h-20 text-primary-200"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L4 5v14l8 3 8-3V5l-8-3zm0 2.18L18.15 6.5 12 8.82 5.85 6.5 12 4.18z" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-primary-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-gray-50">
            {sweet.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif font-black text-royal-chocolate mb-2 truncate">
          {sweet.name}
        </h3>

        <div className="flex items-center gap-1 mb-6">
          <span className="text-sm font-bold text-primary-600">₹</span>
          <span className="text-3xl font-serif font-black text-royal-chocolate">
            {Math.floor(sweet.price)}
          </span>
          <span className="text-xs font-bold text-gray-400 mt-2">
            .{(sweet.price % 1).toFixed(2).split(".")[1]}
          </span>
          <span className="text-xs font-bold text-gray-400 mt-2 ml-1">
            / {sweet.unit || "piece"}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-3.5 px-6 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg active:scale-95"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
