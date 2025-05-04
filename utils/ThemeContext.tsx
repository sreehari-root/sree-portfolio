import React, { createContext, useContext } from 'react';

// Light theme colors for now
const lightTheme = {
  background: '#f0f2f5',
  card: '#FFFFFF',
  text: '#333333',
  subText: '#666666',
  accent: '#4A90E2',
  border: '#EEEEEE',
};

// Create context with default theme
const ThemeContext = createContext({
  colors: lightTheme,
});

// Simple provider that just provides light theme for now
export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ colors: lightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for components to access theme
export const useTheme = () => useContext(ThemeContext);