import { useEffect, useRef } from "react";
import colors from "tailwindcss/colors";
import { useTheme } from "~/shared/ui/darkmode/theme-provider";
import type { Color } from "~/types/color";

export type VertexProps = {
  cx: number;
  cy: number;
  value: string;
  onMouseDown?: (event: MouseEvent) => void;
  /** Vertex's color (slate is the default one) */
  color?: Color;
};

export function Vertex({ cx, cy, value, onMouseDown, color }: VertexProps) {
  const { darkMode } = useTheme();
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const vertexElement = ref.current;

    if (!vertexElement) return;
    if (!onMouseDown) return;

    // Registering mousedown event this way is crucial for the app to function properly.
    // The addEventListener method allows for passing the options argument,
    // which will force the event to be delivered in the earlier phase (capture phase)
    vertexElement.addEventListener("mousedown", onMouseDown, true);

    return () => {
      vertexElement.removeEventListener("mousedown", onMouseDown, true);
    };
  }, [onMouseDown]);

  const baseColor = color ?? "slate";

  const fillColor = colors[baseColor][darkMode ? 600 : 100];
  const strokeColor = colors[baseColor][darkMode ? 500 : 100];
  const textColor = colors[baseColor][darkMode ? 50 : 900];

  return (
    <g ref={ref} className="font-[JetBrains]">
      <circle
        className="stroke-1 transition-[fill,_stroke]"
        cx={cx}
        cy={cy}
        r={19}
        fill={fillColor}
        stroke={strokeColor}
      />
      <text
        className="transition-[fill] [dominant-baseline:central] [text-anchor:middle]"
        x={cx}
        y={cy}
        fill={textColor}
      >
        {value}
      </text>
    </g>
  );
}
