import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (sweet) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === sweet.id);

        if (existingItem) {
          if (existingItem.cartQuantity >= sweet.quantity) {
            return false; // Indicate failure due to stock
          }
          set({
            items: items.map((item) =>
              item.id === sweet.id
                ? { ...item, cartQuantity: item.cartQuantity + 1 }
                : item,
            ),
          });
        } else {
          if (sweet.quantity < 1) {
            return false; // Indicate failure due to stock
          }
          set({
            items: [...items, { ...sweet, cartQuantity: 1 }],
          });
        }
        return true; // Indicate success
      },

      removeItem: (sweetId) => {
        set({
          items: get().items.filter((item) => item.id !== sweetId),
        });
      },

      updateQuantity: (sweetId, quantity) => {
        const items = get().items;
        const item = items.find((i) => i.id === sweetId);
        if (!item) return;

        // Ensure we don't exceed stock
        const newQuantity = Math.max(0, Math.min(quantity, item.quantity));

        set({
          items: items
            .map((i) =>
              i.id === sweetId ? { ...i, cartQuantity: newQuantity } : i,
            )
            .filter((i) => i.cartQuantity > 0),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + Number(item.price) * item.cartQuantity,
          0,
        );
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.cartQuantity, 0);
      },
    }),
    {
      name: "sweet-shop-cart",
    },
  ),
);
