import { useTheme } from "~/shared/ui/darkmode/theme-provider";

export default function DarkModePicker() {
  const { darkMode, toggleDarkMode } = useTheme();

  return <div onClick={toggleDarkMode}>DarkModePicker</div>;
}
