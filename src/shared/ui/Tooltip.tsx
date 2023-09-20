import { type RefObject } from "react";

export type TooltipProps = {
  label: string;
  elementRef: RefObject<HTMLElement>;
};

export function Tooltip({ elementRef, label }: TooltipProps) {
  if (!elementRef.current) {
    return null;
  }

  const { top, left, height } = elementRef.current.getBoundingClientRect();

  return (
    <div
      className="absolute z-[100] -translate-y-0.5 whitespace-nowrap rounded-[4px] bg-slate-800 px-3 py-2 text-slate-200"
      style={{
        top: top - height - 38,
        left: left - 75.71875 - 37.86,
      }}
    >
      <span className="absolute -bottom-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-800" />
      <div className="flex text-sm">{label}</div>
    </div>
  );
}
