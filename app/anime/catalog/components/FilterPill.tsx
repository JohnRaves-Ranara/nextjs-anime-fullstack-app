"use client"

import React from "react";
import { cn } from "@/lib/utils";

type FilterPillProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected: boolean;
  label: string;
  className?: string
};

export default function FilterPill({
  isSelected,
  label,
  className,
  ...props
}: FilterPillProps) {
  return (
    <button
      {...props}
      className={cn(
       
        `px-5 py-3 rounded-full border transition-colors duration-200`,
        isSelected
          ? "text-white bg-mainAccent border-mainAccent"
          : "text-gray-400 bg-transparent border-gray-400",
        className,
      )}
    >
      {label}
    </button>
  );
}
