import { create } from "zustand";

type useStoreDialogStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useStoreDialog = create<useStoreDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
