import React from "react";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";

export const SweetCard = ({ sweet }) => {
  const { addItem } = useCartStore();
  const isOutOfStock = sweet.quantity === 0;

  const handleAddToCart = () => {
    const success = addItem(sweet);
    if (success) {
      toast.success(`We've added ${sweet.name} to your sweet box!`);
    } else {
      toast.error(
        `Apologies! We've reached our current stock limit for ${sweet.name}.`,
      );
    }
  };

  return (
    <div className="group bg-white rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(255,193,7,0.2)] overflow-hidden transition-all duration-500 border border-amber-100/50 transform hover:-translate-y-2 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
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

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100">
            <span
              className={`w-1.5 h-1.5 rounded-full ${sweet.quantity > 10 ? "bg-green-500" : sweet.quantity > 0 ? "bg-amber-500" : "bg-red-500"}`}
            ></span>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
              {isOutOfStock
                ? "Out of Stock"
                : `${sweet.quantity} ${sweet.unit || "piece"} Available`}
            </span>
          </div>
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
