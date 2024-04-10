import React from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
interface IDisabledProps {
  disabled: boolean;
  spinner: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Disabled({
  disabled,
  spinner = true,
  children,
  className,
}: IDisabledProps) {
  if (disabled) {
    return (
      <div
        className={`pointer-events-none ${
          spinner && `relative flex items-center justify-center`
        }`}
      >
        <div className={cn(className, "z-0 opacity-50")}>{children}</div>
        {spinner && (
          <div className="absolute z-10">
            <Icons.spinner className="w-10 h-10 animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}
