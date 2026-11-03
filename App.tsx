import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TravelProvider } from './src/features/travel/TravelContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { LumiAlertHost } from './src/components/LumiAlertHost';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <TravelProvider>
        <NavigationContainer>
          <RootNavigator />
          <LumiAlertHost />
        </NavigationContainer>
      </TravelProvider>
    </SafeAreaProvider>
  );
}

export default App;
