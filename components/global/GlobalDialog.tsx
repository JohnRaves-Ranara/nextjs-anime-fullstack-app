"use client";

import Providers from "@/lib/Providers";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useShallow } from "zustand/react/shallow";

export default function GlobalDialog() {
  const [isDialogOpen, dialogContent, toggleOpenDialog] = useGlobalStore(
    useShallow((state) => [
      state.isDialogOpen,
      state.dialogContent,
      state.toggleOpenDialog,
    ])
  );

  return (
    <Providers>
      <Dialog
        open={isDialogOpen}
        onClose={() => toggleOpenDialog(null)}
        className="relative z-[200]"
      >
        <div className="fixed font-montserrat inset-0 grid place-items-center w-dvw overflow-x-hidden hide-scrollbar overflow-y-auto bg-black/85 backdrop-blur-[1px]">
          <DialogPanel
            transition
            className="duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {dialogContent}
          </DialogPanel>
        </div>
      </Dialog>
    </Providers>
  );
}
