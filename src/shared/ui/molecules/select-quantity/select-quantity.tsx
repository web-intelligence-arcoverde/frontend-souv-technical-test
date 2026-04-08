'use client';

import React, { useId } from "react";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import { DropdownIndicator } from "../../atoms/custom-select/dropdown-indicator";
import { onlyNumbers } from "@/shared/utils/only-numbers";
import { optionsQuantity } from "@/shared/mock/option-quantity";
import { Controller } from "react-hook-form";

type SelectQuantityProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string
};

export const SelectQuantity = ({ name, control }: SelectQuantityProps) => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="group max-w-[150px] w-full flex flex-col gap-2">
          <Label className="text-white">Quantidade</Label>
          <div className="flex rounded-md h-10 border border-gray-300">
            <input
              title="Quantidade"
              type="text"
              id="quantity"
              className="w-full h-10 rounded-l-md p-3 bg-gray-500 text-white outline-none focus:border focus:border-purple-light"
              autoComplete="off"
              maxLength={3}
              onKeyDown={onlyNumbers}
              onChange={(e) => {
                const quantity = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
                onChange({ ...value, quantity });
              }}
              value={value.quantity}
            />
            <Select
              instanceId={id}
              placeholder="Selecione"

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
                  "bg-gray-400 text-gray-200 flex items-center justify-between w-[72px] h-10 px-3 rounded-r-md text-xs uppercase border border-gray-300 focus-within:border-purple-light",
                dropdownIndicator: () =>
                  `${value.unit ? "rotate-180 text-purple-light" : "rotate-0"}`,
                option: () =>
                  "p-3 bg-gray-500 text-sm tracking-[0.42px] hover:bg-gray-300 text-white",
                menuList: () =>
                  "divide-y-[1px] divide-gray-300 border border-gray-300 rounded-md mt-1",
                indicatorsContainer: () => "pointer-events-none",
              }}
              value={optionsQuantity.find((option) => option.value === value.unit)}
            />
          </div>
        </div>)}
    />
  );
};