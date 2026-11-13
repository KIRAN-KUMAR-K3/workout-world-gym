import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getTheme, type Theme, type ThemeId } from '@/config/themes';
import { theme as themeConfig } from '@/config/siteConfig';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (id: ThemeId) => void;
}

const STORAGE_KEY = 'wwg-theme';

const ThemeContext = createContext<ThemeContextValue>({
  theme: getTheme(themeConfig.default),
  setTheme: () => undefined,
});

/** Read a visitor's saved choice (only when switching is enabled). */
function readSaved(): string | null {
  if (!themeConfig.showSwitcher) return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    getTheme(readSaved() ?? themeConfig.default),
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme.id;
  }, [theme]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(getTheme(id));
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
