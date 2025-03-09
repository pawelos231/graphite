import { useEffect, useState } from "react";
import { Interpreter } from "~/core/graphene/interpreter";
import { Lexer } from "~/core/graphene/lexer";
import { Parser } from "~/core/graphene/parser";
import { Split } from "~/shared/layout/Split";
import { useEditorStore } from "../../pages/editor/context/editor";
import { DiagnosticsSummary } from "./components/Diagnostics";
import "./editor-styles.css";
import { editorOnChange, useEditor } from "./hooks/useEditor";
import { useTheme } from "~/shared/ui/darkmode/theme-provider";

export function CodeEditor() {
  const { mode, setGraph } = useEditorStore(({ mode, setGraph }) => ({ mode, setGraph }));
  const [code, setCode] = useEditorStore((store) => [store.code, store.setCode]);
  const [errors, setErrors] = useState<Error[]>([]);
  const { darkMode } = useTheme();

  const isEditorReadonly = mode.type === "SIMULATION";

  const { view, ref, setTheme } = useEditor<HTMLDivElement>(
    [editorOnChange((value) => setCode(value))],
    isEditorReadonly
  );

  // TODO: It might be a good idea to extract code-mirrors specific logic.
  useEffect(() => {
    if (!view) {
      return;
    }

    const currentValue = view.state.doc.toString();

    if (code === currentValue) {
      return;
    }

    view.dispatch({
      changes: {
        from: 0,
        to: currentValue.length,
        insert: code,
      },
    });
  }, [view, code]);

  useEffect(() => {
    // Do we want to parse graph here?
    try {
      const tokens = new Lexer(code).lex();
      const stmts = new Parser(tokens).parse();
      const graph = new Interpreter(stmts).forge();

      setGraph(graph);
      setErrors([]);
    } catch (err) {
      if (err instanceof Error) setErrors([err]);
      else console.error("Unexpected error");
    }
  }, [setGraph, code]);

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode, setTheme]);

  const editorClassName = isEditorReadonly ? "h-full opacity-75 grayscale" : "h-full";

  return (
    <Split
      initialShare={75}
      orientation="horizontal"
      first={<div className={editorClassName} ref={ref} />}
      second={<DiagnosticsSummary errors={errors} />}
    />
  );
}
