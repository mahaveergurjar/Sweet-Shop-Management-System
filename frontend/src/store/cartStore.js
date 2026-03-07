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
          set({
            items: items.map((item) =>
              item.id === sweet.id
                ? { ...item, cartQuantity: item.cartQuantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            items: [...items, { ...sweet, cartQuantity: 1 }],
          });
        }
      },

      removeItem: (sweetId) => {
        set({
          items: get().items.filter((item) => item.id !== sweetId),
        });
      },

      updateQuantity: (sweetId, quantity) => {
        set({
          items: get()
            .items.map((item) =>
              item.id === sweetId ? { ...item, cartQuantity: quantity } : item,
            )
            .filter((item) => item.cartQuantity > 0),
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
