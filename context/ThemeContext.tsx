// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Appearance, useColorScheme as useSystemColorScheme } from 'react-native';
// import asyncStorage from '@/utils/asyncStorage';
// import localStorageKey from '@/constants/localStorageKey';

// type Theme = 'light' | 'dark';

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const systemColorScheme = useSystemColorScheme() ?? 'light';
//   const [theme, setTheme] = useState<Theme>(systemColorScheme);

//   useEffect(() => {
//     const loadTheme = async () => {
//       const storedTheme = await asyncStorage._retrieveData(localStorageKey.theme);
//       if (storedTheme) {
//         setTheme(storedTheme as Theme);
//       } else {
//         setTheme(systemColorScheme);
//       }
//     };
//     loadTheme();

//     // Listen for system theme changes
//     const subscription = Appearance.addChangeListener(({ colorScheme }) => {
//       setTheme(colorScheme === 'dark' ? 'dark' : 'light');
//     });

//     return () => subscription.remove();
//   }, []);

//   const toggleTheme = async () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     await asyncStorage._storeData(localStorageKey.theme, newTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

import asyncStorage from "@/utils/asyncStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({
  children,
  onThemeLoaded,
}: {
  children: React.ReactNode;
  onThemeLoaded?: () => void;
}) {
  const systemTheme = useColorScheme(); // Detect system theme
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Load theme from AsyncStorage
  useEffect(() => {
    (async () => {
      const storedTheme = await asyncStorage._retrieveData("theme");
      if (storedTheme) {
        setTheme(storedTheme as Theme);
      }
      if (onThemeLoaded) {
        onThemeLoaded();
      }
    })();
  }, []);

  // Store selected theme in AsyncStorage
  useEffect(() => {
    if (theme !== "system") {
      asyncStorage._storeData("theme", theme);
    }
  }, [theme]);

  // Ensure `resolvedTheme` updates when `theme` or `systemTheme` changes
  useEffect(() => {
    if (theme === "system") {
      setResolvedTheme(systemTheme || "light");
    } else {
      setResolvedTheme(theme);
    }
  }, [theme, systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme }}>
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
