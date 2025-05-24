// import asyncStorage from "@/utils/asyncStorage";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useColorScheme } from "react-native";

// type Theme = "light" | "dark" | "system";

// interface ThemeContextProps {
//   theme: "light" | "dark";
//   setTheme: (theme: Theme) => void;
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export function ThemeProvider({
//   children,
//   onThemeLoaded,
// }: {
//   children: React.ReactNode;
//   onThemeLoaded?: () => void;
// }) {
//   const systemTheme = useColorScheme(); // Detect system theme
//   const [theme, setTheme] = useState<Theme>("system");
//   const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

//   // Load theme from AsyncStorage
//   useEffect(() => {
//     (async () => {
//       const storedTheme = await asyncStorage._retrieveData("theme");
//       if (storedTheme) {
//         setTheme(storedTheme as Theme);
//       }
//       if (onThemeLoaded) {
//         onThemeLoaded();
//       }
//     })();
//   }, []);

//   // Store selected theme in AsyncStorage
//   useEffect(() => {
//     if (theme !== "system") {
//       asyncStorage._storeData("theme", theme);
//     }
//   }, [theme]);

//   // Ensure `resolvedTheme` updates when `theme` or `systemTheme` changes
//   useEffect(() => {
//     if (theme === "system") {
//       setResolvedTheme(systemTheme || "light");
//     } else {
//       setResolvedTheme(theme);
//     }
//   }, [theme, systemTheme]);

//   return (
//     <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// }



// import asyncStorage from "@/utils/asyncStorage";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useColorScheme } from "react-native";

// type Theme = "light" | "dark" | "system";
// type ResolvedTheme = "light" | "dark";

// interface ThemeContextProps {
//   theme: ResolvedTheme;
//   setTheme: (theme: Theme) => void;
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const systemColorScheme = useColorScheme(); // "light" | "dark" | null
//   const [userTheme, setUserTheme] = useState<Theme>("system");
//   const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

//   // Load theme from storage on mount
//   useEffect(() => {
//     (async () => {
//       const storedTheme = await asyncStorage._retrieveData("theme");
//       if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
//         setUserTheme(storedTheme);
//       }
//     })();
//   }, []);

//   // Save user-selected theme
//   useEffect(() => {
//     asyncStorage._storeData("theme", userTheme);
//   }, [userTheme]);

//   // Resolve actual theme based on user selection or system preference
//   useEffect(() => {
//     if (userTheme === "system") {
//       setResolvedTheme(systemColorScheme === "dark" ? "dark" : "light");
//     } else {
//       setResolvedTheme(userTheme);
//     }
//   }, [userTheme, systemColorScheme]);

//   return (
//     <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme: setUserTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// }



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
