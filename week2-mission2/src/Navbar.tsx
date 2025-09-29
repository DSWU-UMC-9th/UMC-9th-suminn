import clsx from 'clsx';
import { useTheme, THEME } from './context/ThemeProvider';
import ThemeToggleButton from './ThemeToggleButton';

export default function Navbar() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        'p-4 w-full flex justify-end',
        isLightMode ? 'bg-white' : 'bg-[#795548]'
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}
