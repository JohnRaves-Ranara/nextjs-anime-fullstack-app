"use client"
import { useGlobalStore } from "@/utils/stores/globalStore";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React from "react";
import { useShallow } from "zustand/react/shallow";

export default function GlobalDialog() {
  const [isDialogOpen, dialogContent, toggleOpenDialog] =
    useGlobalStore(
      useShallow((state) => [
        state.isDialogOpen,
        state.dialogContent,
        state.toggleOpenDialog,
      ])
    );

  return (
    <Transition appear show={isDialogOpen} as={React.Fragment}>
      <Dialog
        open={isDialogOpen}
        onClose={() => toggleOpenDialog(null)}
        className="relative z-[99999999]"
      >
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 w-dvw bg-black/70"></div>
        </TransitionChild>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-50"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-50"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 grid place-items-center font-montserrat">
            <DialogPanel className="min-w-fit">{dialogContent}</DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
