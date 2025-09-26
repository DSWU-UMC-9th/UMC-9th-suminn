import clsx from 'clsx';
import { THEME, useTheme } from './context/ThemeProvider';

export default function ThemeContent() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        'p-4 min-h-screen w-full',
        isLightMode ? 'bg-white' : 'bg-[#795548]'
      )}
    >
      <h1
        className={clsx(
          'text-2xl font-bold',
          isLightMode ? 'text-black' : 'text-white'
        )}
      >
        UMC
      </h1>
      <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
        OMG
      </p>
    </div>
  );
}
