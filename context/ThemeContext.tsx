import asyncStorage from "@/utils/asyncStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextProps {
  theme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [userTheme, setUserTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(
    Appearance.getColorScheme() === "dark" ? "dark" : "light"
  );

  // Load stored theme on mount
  useEffect(() => {
    (async () => {
      const storedTheme = await asyncStorage._retrieveData("theme");
      if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
        setUserTheme(storedTheme);
      }
    })();
  }, []);

  // Save user theme to storage
  useEffect(() => {
    asyncStorage._storeData("theme", userTheme);
  }, [userTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const listener = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      setSystemTheme(colorScheme === "dark" ? "dark" : "light");
    };

    const subscription = Appearance.addChangeListener(listener);

    return () => subscription.remove();
  }, []);

  // Resolve final theme
  useEffect(() => {
    if (userTheme === "system") {
      setResolvedTheme(systemTheme);
    } else {
      setResolvedTheme(userTheme);
    }
  }, [userTheme, systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme: setUserTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
