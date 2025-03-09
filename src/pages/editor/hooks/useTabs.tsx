import { useMemo } from "react";
import { CommandLineIcon, PlayIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { CodeEditor } from "~/features/code-editor/CodeEditor";
import { useTheme } from "~/shared/ui/darkmode/theme-provider";
import { Tab } from "~/shared/layout/model";
import { AlgorithmPicker } from "../components/AlgorithmPicker";

/**
 * Builds and returns the editor tabs based on the current theme.
 */
export function useEditorTabs() {
  const { darkMode, toggleDarkMode } = useTheme();

  const tabs: Tab[] = useMemo(
    () => [
      {
        type: "ELEMENT",
        id: "edit",
        icon: <CommandLineIcon className={darkMode ? "text-slate-100" : ""} />,
        element: <CodeEditor />,
      },
      {
        type: "ELEMENT",
        id: "algorithm",
        icon: <PlayIcon className={darkMode ? "text-slate-100" : ""} />,
        element: <AlgorithmPicker />,
      },
      {
        type: "FUNCTIONAL",
        id: "darkMode",
        icon: darkMode ? <SunIcon className="text-slate-100" /> : <MoonIcon />,
        func: () => toggleDarkMode(),
      },
    ],
    [darkMode, toggleDarkMode]
  );

  const initialTab = tabs.find((tab) => tab.id === "edit");

  return { tabs, initialTab };
}
