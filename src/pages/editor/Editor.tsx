import { useState } from "react";
import { DynamicSplit } from "~/shared/layout/Split";
import { VerticalTabs } from "~/shared/layout/VerticalTab";
import { Visualizer } from "./components/Visualizer";
import { EditorStoreProvider } from "./context/editor";
import { useTheme } from "~/shared/ui/darkmode/theme-provider";
import { Tab } from "~/shared/layout/model";
import { useEditorTabs } from "./hooks/useTabs";

// The CodeEditor component is responsible for setting the graph value,
// so setting it as a default tab will automatically set the graph value.
// This way we avoid a weird behavior of a graph magically appearing
// after clicking on the code editor icon.
export function Editor() {
  const { darkMode } = useTheme();
  const { tabs, initialTab } = useEditorTabs();
  const [currentTab, setCurrentTab] = useState<Tab | undefined>(initialTab);

  const handleTabChange = (newTab: Tab) => {
    setCurrentTab(currentTab?.id === newTab.id ? undefined : newTab);
  };

  return (
    <EditorStoreProvider projectId={""} loadingFallback={<>Loading ...</>}>
      <div className={`${darkMode ? "dark" : ""} `}>
        <main className="flex h-screen w-screen overflow-y-auto ">
          <VerticalTabs tabs={tabs} onTabChange={handleTabChange} currentTab={currentTab} />

          <DynamicSplit
            active={currentTab !== undefined}
            dynamicPane={currentTab?.type === "ELEMENT" ? currentTab.element : null}
            orientation="vertical"
            staticPane={<Visualizer />}
          />
        </main>
      </div>
    </EditorStoreProvider>
  );
}
