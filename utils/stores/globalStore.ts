import { create } from "zustand";
import { ReactNode } from "react";

type GlobalStoreValues = {
  isDialogOpen: boolean;
  dialogContent: ReactNode | null;
};

type GlobalStoreActions = {
  toggleOpenDialog: (dialogContent: ReactNode) => void;
};

type GlobalStore = GlobalStoreValues & GlobalStoreActions;

const globalStoreDefaultValues: GlobalStoreValues = {
  isDialogOpen: false,
  dialogContent: null,
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  ...globalStoreDefaultValues,
  toggleOpenDialog: (dialogContent: ReactNode | null) => {
    if (dialogContent) {
      set({
        dialogContent: dialogContent,
        isDialogOpen: true,
      });
    } else {
      set({ isDialogOpen: false });
      setTimeout(() => {
        set({ dialogContent: null });
      }, 150);
    }
  },
}));
