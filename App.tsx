import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TravelProvider } from './src/features/travel/TravelContext';
import { RootNavigator } from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <TravelProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </TravelProvider>
    </SafeAreaProvider>
  );
}

export default App;
