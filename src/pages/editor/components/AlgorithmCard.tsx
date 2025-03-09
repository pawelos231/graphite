import { Algorithm } from "~/core/simulator/algorithm";

type AlgorithmCardProps = {
  algorithm: Algorithm<object>;
  onClick: () => void;
};

export function AlgorithmCard({ algorithm, onClick }: AlgorithmCardProps) {
  return (
    <div
      className="flex flex-col gap-2 border-b border-slate-300 bg-slate-50 p-4 hover:cursor-pointer hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
      onClick={onClick}
    >
      <span className="font-normal text-slate-800 dark:text-slate-50">{algorithm.name}</span>
      <p className="text-slate-600 dark:text-slate-400">{algorithm.description}</p>
      <div className="flex gap-2">
        {algorithm.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}

type TagProps = {
  tag: string;
};

function Tag({ tag }: TagProps) {
  return (
    <div className="rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50">
      {tag}
    </div>
  );
}
