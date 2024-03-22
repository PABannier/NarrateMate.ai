import React from "react";
import { Icons } from "@/components/icons";

interface IDisabledProps {
  disabled: boolean;
  children: React.ReactNode;
}

export function Disabled({ disabled, children }: IDisabledProps) {
  if (disabled) {
    return (
      <div className="relative pointer-events-none flex items-center justify-center">
        <div className="z-0 opacity-50">{children}</div>
        <div className="absolute z-10">
          <Icons.spinner className="w-10 h-10 animate-spin" />
        </div>
      </div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}
