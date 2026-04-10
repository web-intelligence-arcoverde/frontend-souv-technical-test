"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

interface CategoryOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface SelectCategoryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  options: CategoryOption[];
  error?: string;
  className?: string;
}

export const SelectCategory = ({
  control,
  name,
  label,
  placeholder = "Selecione",
  options,
  error,
  className,
}: SelectCategoryProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className={cn("group flex flex-col gap-2 w-full", className)}>
          <div className="flex justify-between items-center px-1">
            <label
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] transition-colors group-focus-within:text-primary",
                error ? "text-red-400" : "text-on-surface-variant/60",
              )}
            >
              {label}
            </label>
            {error && (
              <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider animate-in fade-in">
                {error}
              </span>
            )}
          </div>
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger
              className={cn(
                "w-full !h-14 bg-surface-container-low border rounded-xl text-sm font-bold transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                error ? "border-red-500/50" : "border-white/5",
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-surface-container-highest border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="focus:bg-primary/10 focus:text-primary transition-colors py-3 font-bold"
                >
                  <div className="flex items-center gap-3">
                    <span className="opacity-50 italic">
                      {option.icon}
                    </span>
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};
