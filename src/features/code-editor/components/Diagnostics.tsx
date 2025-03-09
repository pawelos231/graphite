import { ErrorDescription } from "./ErrorDescription";

export type DiagnosticsSummaryProps = {
  errors: Error[];
};

export function DiagnosticsSummary({ errors }: DiagnosticsSummaryProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-10 flex-shrink-0 items-center border-b border-slate-300 bg-slate-50 px-4 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50">
        Diagnostic
      </div>
      <div className="flex-1 bg-slate-50 p-4 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        {errors.length === 0 && (
          <p className="text-center text-sm text-slate-500">
            You will see any errors in your graph definition here. For now you are good to go!
          </p>
        )}
        {errors.map((error, i) => (
          <ErrorDescription key={i} error={error} />
        ))}
      </div>
    </div>
  );
}
