import 'src/global.css';

// ----------------------------------------------------------------------

import ThemeProvider from 'src/theme';
import Router from 'src/routes/sections';
import { LocalizationProvider } from 'src/locales';
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { PropertyProvider } from './context/PropertyContext';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <LocalizationProvider>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light', // 'light' | 'dark'
          themeDirection: 'ltr', //  'rtl' | 'ltr'
          themeColorPresets: 'preset03', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
        }}
      >
        <ThemeProvider>
          <MotionLazy>
            <ProgressBar />
            <SettingsDrawer />
            <PropertyProvider>
              <Router />
            </PropertyProvider>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </LocalizationProvider>
  );
}
