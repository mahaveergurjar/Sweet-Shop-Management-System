import React from "react";
import { useCartStore } from "../store/cartStore";

export const SweetCard = ({ sweet }) => {
  const { addItem } = useCartStore();
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-500 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2">
      {/* Decorative Image/Emoji Area */}
      <div className="h-40 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
        🍬
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
            {sweet.name}
          </h3>
          <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg">
            {sweet.category}
          </span>
        </div>

        <p className="text-3xl font-black text-primary-600 dark:text-primary-400 mb-4">
          ₹{Number(sweet.price).toFixed(2)}
        </p>

        <div className="flex justify-between items-center mb-6">
          <span
            className={`text-xs font-bold flex items-center gap-1.5 ${isOutOfStock ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}
          >
            {isOutOfStock ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Out of Stock
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {sweet.quantity} Available
              </>
            )}
          </span>
        </div>

        <button
          onClick={() => addItem(sweet)}
          disabled={isOutOfStock}
          className={`w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 shadow-lg shadow-primary-200 dark:shadow-none hover:shadow-primary-300 active:scale-95"
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
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {isOutOfStock ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
