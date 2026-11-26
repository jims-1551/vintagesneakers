import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import LoginPage from '@/components/loginpage';
import { UserAccountContext } from '@/components/user-account-context';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [hasEnteredStore, setHasEnteredStore] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const signOut = () => {
    setUserEmail('');
    setHasEnteredStore(false);
  };

  return (
    <UserAccountContext.Provider value={{ email: userEmail, onSignOut: signOut }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        {hasEnteredStore ? (
          <AppTabs />
        ) : (
          <LoginPage
            onLogin={(email) => {
              setUserEmail(email);
              setHasEnteredStore(true);
            }}
            onBrowseAsGuest={() => setHasEnteredStore(true)}
          />
        )}
      </ThemeProvider>
    </UserAccountContext.Provider>
  );
}
