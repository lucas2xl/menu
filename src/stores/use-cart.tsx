import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Order = {
  product: {
    id: string;
    quantity: number;
    price: number;
    name: string;
    description?: string | null;
    observation?: string | null;
    categories: {
      id: string;
      items: {
        id: string;
        quantity: number;
        price: number;
        name: string;
      }[];
    }[];
  };
};
type useCartStore = {
  data: Order[] | null;
  setData: (data: Order) => void;
  updateData: (id: string, quantity: number) => void;
  removeData: (id: string) => void;
  clearData: () => void;
};

export const useCart = create<useCartStore>()(
  devtools(
    persist(
      (set, get) => ({
        data: null,
        setData: (data) => set({ data: [...(get().data || []), data] }),
        removeData: (id) =>
          set({
            data: (get().data || []).filter((order) => order.product.id !== id),
          }),
        updateData: (id, quantity) => {
          const newData = (get().data || []).map((order) => {
            if (order.product.id === id) {
              return {
                ...order,
                product: {
                  ...order.product,
                  quantity: Number(quantity),
                },
              };
            }
            return order;
          });
          set({ data: newData });
        },
        clearData: () => set({ data: null }),
      }),

      {
        name: "2xl@menu@cart",
      }
    )
  )
);
