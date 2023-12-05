import { create } from "zustand";

export type modalType = "createServer";

interface modalStore {
  type: modalType | null;
  isOpen: boolean;
  onOpen: (type: modalType) => void;
  onClose: () => void;
}

export const useModal = create<modalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
