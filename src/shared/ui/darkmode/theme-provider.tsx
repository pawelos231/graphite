/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext } from "react";
import { createContext } from "react";
import { useLocalStorage } from "usehooks-ts";

// Create Theme Context
const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Theme Provider Component
export const ThemeProvider = ({ children }: any) => {
  const [dark, setValue, removeValue] = useLocalStorage("dark", false);

  const toggleDarkMode = () => {
    console.log("toggleDarkMode");
    setValue(!dark);
  };

  return (
    <ThemeContext.Provider value={{ darkMode: dark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
