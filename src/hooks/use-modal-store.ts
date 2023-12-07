import { Server } from "@prisma/client";
import { create } from "zustand";

export type modalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer";

interface modalData {
  server?: Server;
}

interface modalStore {
  type: modalType | null;
  data: modalData;
  isOpen: boolean;
  onOpen: (type: modalType, data?: modalData) => void;
  onClose: () => void;
}

export const useModal = create<modalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
