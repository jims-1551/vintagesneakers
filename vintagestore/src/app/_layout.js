import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import LoginPage from '@/components/loginpage';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [hasEnteredStore, setHasEnteredStore] = useState(false);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {hasEnteredStore ? (
        <AppTabs />
      ) : (
        <LoginPage
          onLogin={() => setHasEnteredStore(true)}
          onBrowseAsGuest={() => setHasEnteredStore(true)}
        />
      )}
    </ThemeProvider>
  );
}
