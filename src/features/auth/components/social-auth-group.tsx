import React from "react";
import { Button } from "@/shared/ui/atoms/Button/Button";

export const SocialAuthGroup = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="premium-social" className="gap-3">
        <span className="material-symbols-outlined text-xl">brand_family</span>
        <span className="uppercase tracking-wider text-[10px] font-bold">
          Google
        </span>
      </Button>
      <Button variant="premium-social" className="gap-3">
        <span className="material-symbols-outlined text-xl">shield_person</span>
        <span className="uppercase tracking-wider text-[10px] font-bold">
          Apple
        </span>
      </Button>
    </div>
  );
};
