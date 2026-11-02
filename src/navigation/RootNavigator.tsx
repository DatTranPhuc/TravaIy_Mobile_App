import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/colors';

// Screens Phase 1
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { TripsScreen } from '../screens/TripsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { WizardDestinationScreen } from '../screens/WizardDestinationScreen';
import { WizardDatesScreen } from '../screens/WizardDatesScreen';
import { WizardCompanionsScreen } from '../screens/WizardCompanionsScreen';
import { WizardBudgetScreen } from '../screens/WizardBudgetScreen';
import { WizardPreferencesScreen } from '../screens/WizardPreferencesScreen';
import { AIGeneratingScreen } from '../screens/AIGeneratingScreen';
import { TripOverviewScreen } from '../screens/TripOverviewScreen';

// Screens Phase 2
import { StaysScreen } from '../screens/StaysScreen';
import { StayDetailScreen } from '../screens/StayDetailScreen';
import { TripExpensesScreen } from '../screens/TripExpensesScreen';
import { AddExpenseScreen } from '../screens/AddExpenseScreen';
import { GroupSpaceScreen } from '../screens/GroupSpaceScreen';
import { GroupChatScreen } from '../screens/GroupChatScreen';
import { TravelWalletScreen } from '../screens/TravelWalletScreen';
import { AddTravelDocumentScreen } from '../screens/AddTravelDocumentScreen';
import { JournalAlbumScreen } from '../screens/JournalAlbumScreen';

import { Home, Compass, MapPin, User } from 'lucide-react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Khám phá',
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="TripsTab"
        component={TripsScreen}
        options={{
          tabBarLabel: 'Chuyến đi',
          tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Phase 1 */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="WizardDestination" component={WizardDestinationScreen} />
      <Stack.Screen name="WizardDates" component={WizardDatesScreen} />
      <Stack.Screen name="WizardCompanions" component={WizardCompanionsScreen} />
      <Stack.Screen name="WizardBudget" component={WizardBudgetScreen} />
      <Stack.Screen name="WizardPreferences" component={WizardPreferencesScreen} />
      <Stack.Screen name="AIGenerating" component={AIGeneratingScreen} />
      <Stack.Screen name="TripOverview" component={TripOverviewScreen} />

      {/* Phase 2 */}
      <Stack.Screen name="Stays" component={StaysScreen} />
      <Stack.Screen name="StayDetail" component={StayDetailScreen} />
      <Stack.Screen name="TripExpenses" component={TripExpensesScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="GroupSpace" component={GroupSpaceScreen} />
      <Stack.Screen name="GroupChat" component={GroupChatScreen} />
      <Stack.Screen name="TravelWallet" component={TravelWalletScreen} />
      <Stack.Screen name="AddTravelDocument" component={AddTravelDocumentScreen} />
      <Stack.Screen name="JournalAlbum" component={JournalAlbumScreen} />
    </Stack.Navigator>
  );
}
