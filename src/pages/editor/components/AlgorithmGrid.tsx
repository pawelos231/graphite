import { AlgorithmCard } from "./AlgorithmCard";
import { Algorithm } from "~/core/simulator/algorithm";

export type AlgorithmGridProps = {
  algorithms: Algorithm<object>[];
  onAlgorithmSelect?: (algorithm: Algorithm<object>) => void;
};

export function AlgorithmGrid({ algorithms, onAlgorithmSelect }: AlgorithmGridProps) {
  return (
    <div className="dark: flex h-full w-full flex-col bg-slate-50 dark:bg-slate-900">
      {algorithms.map((algorithm) => (
        <AlgorithmCard
          key={algorithm.name}
          algorithm={algorithm}
          onClick={() => onAlgorithmSelect?.(algorithm)}
        />
      ))}
    </div>
  );
}
