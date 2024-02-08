import { create } from "zustand";

export enum ModalType {
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  CREATE_CATEGORY = "CREATE_CATEGORY",
  UPDATE_CATEGORY = "UPDATE_PRODUCT",
}

type ModalState = {
  isOpen: boolean;
  type: ModalType;
  open: (type: ModalType) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: ModalType.CREATE_PRODUCT,
  open: (type) => set({ isOpen: true, type }),
  close: () => set({ isOpen: false }),
}));
