// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Appearance, useColorScheme as useSystemColorScheme } from 'react-native'; 
// // import asyncStorage from '@/utils/asyncStorage';
// // import Constants from '@/constants/Constants';

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
//       const storedTheme = await asyncStorage._retrieveData(Constants.localStorageKey.theme);
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
//     await asyncStorage._storeData(Constants.localStorageKey.theme, newTheme);
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