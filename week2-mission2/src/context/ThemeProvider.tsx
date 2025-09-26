import { createContext, type PropsWithChildren, useContext, useState } from 'react';

export enum THEME {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
export type TTHEME = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTHEME;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTHEME>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme(prev => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context
};