import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, default to dark
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('portfolio-theme', theme);
    
    // Apply theme class to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update CSS custom properties based on theme
    const root = document.documentElement;
    if (theme === 'light') {
      root.style.setProperty('--bg-primary', '#FFFFFF');
      root.style.setProperty('--bg-secondary', '#F8F9FA');
      root.style.setProperty('--bg-tertiary', '#F1F3F4');
    } else {
      root.style.setProperty('--bg-primary', '#0A0A0F');
      root.style.setProperty('--bg-secondary', '#12121A');
      root.style.setProperty('--bg-tertiary', '#1A1A24');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
