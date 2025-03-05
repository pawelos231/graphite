import { CommandLineIcon, PlayIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CodeEditor } from "~/features/code-editor/CodeEditor";
import { DynamicSplit } from "~/shared/layout/Split";
import { Tab, VerticalTabs } from "~/shared/layout/VerticalTab";
import { AlgorithmPicker } from "./components/AlgorithmPicker";
import { Visualizer } from "./components/Visualizer";
import { EditorStoreProvider } from "./context/editor";
import { useTheme } from "~/shared/ui/darkmode/theme-provider";
import DarkModePicker from "./components/DarkModePicker";

//split it into functional tabs (this tabs do not have an element) and into element tabs, ex: ActionTab and ComponentTab
const tabs: Tab[] = [
  { id: "edit", icon: <CommandLineIcon />, element: <CodeEditor /> },
  { id: "algorithm", icon: <PlayIcon />, element: <AlgorithmPicker /> },
  { id: "darkMode", icon: <MoonIcon />, element: <DarkModePicker /> },
];

// The CodeEditor component is responsible for setting the graph value,
// so setting it as a default tab will automatically set the graph value.
// This way we avoid a weird behavior of a graph magically appearing
// after clicking on the code editor icon.
const initialTab = tabs.find((it) => it.id === "edit");

export function Editor() {
  const [currentTab, setCurrentTab] = useState<Tab | undefined>(initialTab);
  const { darkMode } = useTheme();

  const handleTabChange = (newTab: Tab) => {
    setCurrentTab(currentTab === newTab ? undefined : newTab);
  };

  return (
    <EditorStoreProvider projectId={""} loadingFallback={<>Loading ...</>}>
      <div className={`${darkMode ? "dark" : ""} `}>
        <main className="flex h-screen w-screen overflow-y-auto ">
          <VerticalTabs tabs={tabs} onTabChange={handleTabChange} currentTab={currentTab} />
          <DynamicSplit
            active={currentTab !== undefined}
            dynamicPane={currentTab?.element}
            orientation="vertical"
            staticPane={<Visualizer />}
          />
        </main>
      </div>
    </EditorStoreProvider>
  );
}
