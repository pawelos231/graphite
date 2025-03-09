// VerticalTabs.tsx
import { Tab } from "./model";

type TabIconProps = {
  tab: Tab;
  highlight: boolean;
  onClick: () => void;
};

function TabIcon({ tab, highlight, onClick }: TabIconProps) {
  return (
    <div
      className={`flex aspect-square w-full cursor-pointer items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 ${
        highlight ? "bg-slate-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="h-6 w-6 text-slate-800">{tab.icon}</div>
    </div>
  );
}

export type VerticalTabsProps = {
  tabs: Tab[];
  currentTab?: Tab;
  onTabChange: (tab: Tab) => void;
};

export function VerticalTabs({ tabs, currentTab, onTabChange }: VerticalTabsProps) {
  return (
    <div className="flex h-full w-12 flex-shrink-0 flex-col border-r border-r-slate-300 bg-slate-50 dark:bg-slate-900">
      {tabs.map((tab) => {
        // If the tab is an element type tab, we change the current tab to the new tab.
        const handleClick = () => {
          if (tab.type === "ELEMENT") {
            onTabChange(tab);
          } else {
            tab.func();
          }
        };

        return (
          <TabIcon
            key={tab.id}
            tab={tab}
            highlight={currentTab?.id === tab.id}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
}
