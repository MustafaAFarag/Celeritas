// components/HeaderThemeToggle.tsx
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

function ThemeToggle({ isDarkMode, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className="flex transform items-center rounded-lg bg-primary p-2 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:bg-opacity-90"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? (
        <SunIcon className="h-5 w-5 text-white" />
      ) : (
        <MoonIcon className="h-5 w-5 text-white" />
      )}
    </button>
  );
}

export default ThemeToggle;
