"use client";

import React, { useId, useState, useEffect } from "react";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import { DropdownIndicator } from "../../atoms/custom-select/dropdown-indicator";
import { onlyNumbers } from "@/shared/utils/only-numbers";
import { optionsQuantity } from "@/shared/mock/option-quantity";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

type SelectQuantityProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  error?: string;
};

export const SelectQuantity = ({ name, control, error }: SelectQuantityProps) => {
  const id = useId();
  const [isMounted, setIsMounted] = useState(false);

  // Solução para Hydration Mismatch em componentes SSR que usam react-select
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="group w-fit flex flex-col gap-2 relative z-50">
          <div className="flex justify-between w-full items-center px-1">
            <Label className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em] transition-colors group-focus-within:text-primary",
              error ? "text-red-400" : "text-on-surface-variant/60"
            )}>
              Qtd:
            </Label>
            {error && (
              <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider animate-in fade-in ml-2">
                {error}
              </span>
            )}
          </div>
          <div className={cn(
            "flex h-14 border rounded-xl transition-all focus-within:ring-2 focus-within:ring-offset-0",
            error 
              ? "border-red-500/50 bg-surface-container-low focus-within:ring-red-500/20 focus-within:border-red-500" 
              : "border-white/5 bg-surface-container-low focus-within:ring-primary/20 focus-within:border-primary/50"
          )}>
            <input
              title="Quantidade"
              type="text"
              id="quantity"
              className="w-16 h-full px-3 bg-transparent text-on-surface font-bold text-sm outline-none placeholder:text-on-surface-variant/30 text-center border-r border-white/5 rounded-l-xl"
              autoComplete="off"
              maxLength={3}
              onKeyDown={onlyNumbers}
              onChange={(e) => {
                const quantity =
                  e.target.value === "" ? 0 : parseInt(e.target.value, 10);
                onChange({ ...value, quantity });
              }}
              value={value.quantity}
            />
            {isMounted ? (
              <Select
                instanceId={id}
                placeholder="Un"
                options={optionsQuantity}
                onChange={(e) => {
                  if (e) {
                    onChange({ ...value, unit: e.value });
                  }
                }}
                components={{ DropdownIndicator }}
                unstyled={true}
                classNames={{
                  control: () =>
                    "bg-transparent text-on-surface flex items-center justify-between w-[70px] h-full px-3 text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-white/5 transition-colors rounded-r-xl",
                  dropdownIndicator: () =>
                    `transition-transform duration-300 ${
                      value.unit
                        ? "text-primary scale-110"
                        : "text-on-surface-variant/40"
                    }`,
                  option: ({ isFocused, isSelected }) =>
                    `p-3 text-sm tracking-widest font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-primary text-on-primary"
                        : isFocused
                          ? "bg-primary/10 text-primary"
                          : "bg-surface-container-highest text-on-surface"
                    }`,
                  menu: () => "z-[100] min-w-[120px]",
                  menuList: () =>
                    "bg-surface-container-highest border border-white/10 rounded-xl mt-1 overflow-hidden shadow-2xl",
                  placeholder: () => "text-on-surface-variant/30",
                  valueContainer: () => "p-0",
                  singleValue: () => "text-on-surface font-black",
                }}
                value={optionsQuantity.find(
                  (option) => option.value === value.unit,
                )}
              />
            ) : (
              <div className="w-[70px] h-full" /> // Placeholder durante SSR
            )}
          </div>
        </div>
      )}
    />
  );
};
