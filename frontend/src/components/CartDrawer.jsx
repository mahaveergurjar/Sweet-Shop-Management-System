import React from "react";
import { useCartStore } from "../store/cartStore";
import { purchaseService } from "../services/api";

export const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } =
    useCartStore();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  if (!isOpen) return null;

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError("");

      const purchaseItems = items.map((item) => ({
        sweet_id: item.id,
        quantity: item.cartQuantity,
        price_per_unit: item.price,
        total_price: (Number(item.price) * item.cartQuantity).toFixed(2),
        sweet_name: item.name,
        sweet_category: item.category,
      }));

      await purchaseService.batchPurchase(purchaseItems);
      clearCart();
      alert("Checkout successful! Thank you for your purchase.");
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.error || "Checkout failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-primary-600 text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              🛒 Your Sweet Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-700 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <div className="text-6xl mb-4">🍭</div>
                <p className="text-lg">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-primary-600 font-semibold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                    🍬
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ₹{Number(item.price).toFixed(2)} each
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cartQuantity - 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        -
                      </button>
                      <span className="font-semibold w-6 text-center">
                        {item.cartQuantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cartQuantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600">
                      ₹{(Number(item.price) * item.cartQuantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Subtotal
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ₹{getTotal().toFixed(2)}
                </span>
              </div>
              <button
                disabled={loading}
                onClick={handleCheckout}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? "Processing..." : "Complete Checkout"}
                {!loading && (
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
