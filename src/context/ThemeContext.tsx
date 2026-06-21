// We import Hooks from React. Hooks are functions that let us "hook into" React state and lifecycle features.
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// We define a TypeScript type so the theme can only be "dark" or "light"
type Theme = "dark" | "light";

// This interface defines what data our ThemeContext will hold and share across the app
interface ThemeContextValue {
  theme: Theme; // The current theme string
  toggleTheme: () => void; // A function to switch between dark and light
}

// createContext creates a "global" state object that can be accessed by any component.
// We give it some default placeholder values here.
const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

// A custom hook so other components can easily grab the theme by calling `useTheme()`
export const useTheme = () => useContext(ThemeContext);

// The ThemeProvider wraps around our App (see App.tsx) and actually holds the state.
// Any component inside `{children}` will have access to this state.
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // useState holds the current theme. We initialize it by checking localStorage so the user's preference is remembered!
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if the user previously visited and saved a theme setting in their browser storage
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    // Default to "dark" if they haven't saved anything yet
    return stored === "light" ? "light" : "dark";
  });

  // useEffect runs a piece of code every time the variable in its dependency array `[theme]` changes.
  useEffect(() => {
    // We add a 'data-theme' attribute to the root HTML document. 
    // This allows our globals.css to change the colors globally based on the theme!
    document.documentElement.setAttribute("data-theme", theme);
    // Save the new theme to the browser's localStorage
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // A helper function that toggles the theme from dark to light, or light to dark
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // We wrap the children in the Context Provider and pass down the real values we just created.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
