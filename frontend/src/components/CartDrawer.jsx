import React from "react";
import { useCartStore } from "../store/cartStore";
import { purchaseService } from "../services/api";
import toast from "react-hot-toast";

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
      toast.success("Checkout successful! Thank you for your purchase.");
      onClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Checkout failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
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
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-primary-100">
          {/* Header */}
          <div className="px-8 py-8 border-b border-primary-50 flex justify-between items-center bg-white relative">
            {/* Decorative Header Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-20"></div>

            <h2 className="text-2xl font-serif font-black flex items-center gap-4 text-royal-chocolate">
              <div className="bg-primary-500 p-2.5 rounded-2xl shadow-premium">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              Your Sweet Box
            </h2>
            <button
              onClick={onClose}
              className="p-3 hover:bg-primary-50 rounded-2xl transition-all text-gray-300 hover:text-primary-600"
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
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 bg-white/50">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm mb-6 font-bold border border-red-100 flex items-center gap-3 animate-shake">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                {error}
              </div>
            )}

            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="bg-gray-50 p-10 rounded-[3rem] mb-8 opacity-40">
                  <svg
                    className="w-24 h-24 text-primary-200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L4 5v14l8 3 8-3V5l-8-3zm0 2.18L18.15 6.5 12 8.82 5.85 6.5 12 4.18z" />
                  </svg>
                </div>
                <p className="text-xl font-serif font-black text-gray-300 mb-2">
                  The box is empty
                </p>
                <p className="text-gray-400 font-medium mb-10">
                  Start your sweet journey now
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary-50 text-primary-600 px-8 py-3 rounded-full font-bold hover:bg-primary-100 transition-all border border-primary-100"
                >
                  Explore Sweets
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-5 items-center group">
                  <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center border border-gray-100 group-hover:bg-primary-50 transition-colors shrink-0">
                    <svg
                      className="w-10 h-10 text-primary-200"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L4 5v14l8 3 8-3V5l-8-3zm0 2.18L18.15 6.5 12 8.82 5.85 6.5 12 4.18z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-black text-gray-900 leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs font-black text-primary-500 uppercase tracking-widest mb-3">
                      ₹{Number(item.price).toFixed(2)} / {item.unit || "piece"}
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cartQuantity - 1)
                        }
                        className="w-8 h-8 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-white hover:border-primary-200 hover:shadow-sm transition-all text-gray-400 font-black"
                      >
                        -
                      </button>
                      <span className="font-serif font-black w-8 text-center text-gray-700">
                        {item.cartQuantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cartQuantity + 1)
                        }
                        disabled={item.cartQuantity >= item.quantity}
                        className={`w-8 h-8 rounded-xl border border-gray-100 flex items-center justify-center transition-all font-black ${
                          item.cartQuantity >= item.quantity
                            ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                            : "hover:bg-white hover:border-primary-200 hover:shadow-sm text-gray-400"
                        }`}
                        title={
                          item.cartQuantity >= item.quantity
                            ? "Max stock reached"
                            : ""
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-lg font-serif font-black text-royal-chocolate leading-none">
                      ₹{(Number(item.price) * item.cartQuantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => {
                        removeItem(item.id);
                        toast.success("Shanti! Item removed");
                      }}
                      className="text-[10px] font-black uppercase tracking-tighter text-red-400 hover:text-red-500 transition-colors"
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
            <div className="p-8 border-t border-primary-50 bg-primary-50/30 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-white opacity-50"></div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                  Total Delight
                </span>
                <span className="text-3xl font-serif font-black text-royal-chocolate">
                  ₹{getTotal().toFixed(2)}
                </span>
              </div>

              <button
                disabled={loading}
                onClick={handleCheckout}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-5 rounded-[2rem] font-bold text-lg shadow-premium hover:shadow-premium-hover transition-all disabled:opacity-50 flex items-center justify-center gap-4 transform active:scale-98"
              >
                <span className="uppercase tracking-[0.1em]">
                  {loading ? "Preparing Box..." : "Confirm & Deliver"}
                </span>
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
                      strokeWidth="3"
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
