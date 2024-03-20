import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Order = {
  id: string;
  quantity: number;
  subCategory: {
    id: string;
    items: {
      id: string;
      quantity: number;
      price: number;
    }[];
  }[];
};
type useCartStore = {
  data: Order[] | null;
  setData: (data: Order[]) => void;
  clearData: () => void;
};

export const useAuthStore = create<useCartStore>()(
  devtools(
    persist(
      (set) => ({
        data: null,
        setData: (data) => set({ data }),
        clearData: () => set({ data: null }),
      }),

      {
        name: "menu:cart",
      }
    )
  )
);
