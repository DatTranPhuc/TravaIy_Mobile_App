import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/colors';

// Screens Exported from Feature Modules
import {
  WelcomeScreen,
  OnboardingScreen,
  HomeScreen,
  ExploreScreen,
  TripsScreen,
  ProfileScreen,
  WizardDestinationScreen,
  WizardDatesScreen,
  WizardCompanionsScreen,
  WizardBudgetScreen,
  WizardPreferencesScreen,
  AIGeneratingScreen,
  AIItineraryProposalScreen,
  TripOverviewScreen,
  TodayScheduleScreen,
  DayItineraryScreen,
  ItineraryEditScreen,
  AdaptiveScheduleScreen,
  TripPreparationScreen,
  PackingListScreen,
  SearchFilterScreen,
  PlaceDetailScreen,
  MapViewScreen,
  WishlistScreen,
  StaysScreen,
  StayDetailScreen,
  GroupSpaceScreen,
  GroupChatScreen,
  GroupPollScreen,
  GroupLocationScreen,
  GroupExpenseSplitScreen,
  TripExpensesScreen,
  AddExpenseScreen,
  CommunityFeedScreen,
  CreatePostScreen,
  JournalAlbumScreen,
  PhotoboothScreen,
  CreateRecapScreen,
  TripRecapFinalScreen,
  TravelWalletScreen,
  AddTravelDocumentScreen,
  TravelDocumentDetailScreen,
  TripSubscriptionScreen,
} from '../screens';

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
          height: 68,
          paddingBottom: 14,
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
      {/* Onboarding & Welcome */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />

      {/* Trip Wizard Flow */}
      <Stack.Screen name="WizardDestination" component={WizardDestinationScreen} />
      <Stack.Screen name="WizardDates" component={WizardDatesScreen} />
      <Stack.Screen name="WizardCompanions" component={WizardCompanionsScreen} />
      <Stack.Screen name="WizardBudget" component={WizardBudgetScreen} />
      <Stack.Screen name="WizardPreferences" component={WizardPreferencesScreen} />
      <Stack.Screen name="AIGenerating" component={AIGeneratingScreen} />
      <Stack.Screen name="AIItineraryProposal" component={AIItineraryProposalScreen} />
      <Stack.Screen name="TripOverview" component={TripOverviewScreen} />

      {/* Daily Schedule & Details */}
      <Stack.Screen name="TodaySchedule" component={TodayScheduleScreen} />
      <Stack.Screen name="DayItinerary" component={DayItineraryScreen} />
      <Stack.Screen name="ItineraryEdit" component={ItineraryEditScreen} />
      <Stack.Screen name="TripPreparation" component={TripPreparationScreen} />
      <Stack.Screen name="PackingList" component={PackingListScreen} />
      <Stack.Screen name="AdaptiveSchedule" component={AdaptiveScheduleScreen} />

      {/* Explore, Places, Search & Wishlist */}
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      <Stack.Screen name="MapView" component={MapViewScreen} />
      <Stack.Screen name="SearchFilter" component={SearchFilterScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="Stays" component={StaysScreen} />
      <Stack.Screen name="StayDetail" component={StayDetailScreen} />

      {/* Group Space & Social */}
      <Stack.Screen name="GroupSpace" component={GroupSpaceScreen} />
      <Stack.Screen name="GroupChat" component={GroupChatScreen} />
      <Stack.Screen name="GroupPoll" component={GroupPollScreen} />
      <Stack.Screen name="GroupLocation" component={GroupLocationScreen} />
      <Stack.Screen name="GroupExpenseSplit" component={GroupExpenseSplitScreen} />
      <Stack.Screen name="TripExpenses" component={TripExpensesScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />

      {/* Community & Post Creation */}
      <Stack.Screen name="CommunityFeed" component={CommunityFeedScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />

      {/* Photos, Recaps & Photobooth */}
      <Stack.Screen name="Photobooth" component={PhotoboothScreen} />
      <Stack.Screen name="JournalAlbum" component={JournalAlbumScreen} />
      <Stack.Screen name="CreateRecap" component={CreateRecapScreen} />
      <Stack.Screen name="TripRecapFinal" component={TripRecapFinalScreen} />

      {/* Wallet, Documents & Subscription */}
      <Stack.Screen name="TravelWallet" component={TravelWalletScreen} />
      <Stack.Screen name="AddTravelDocument" component={AddTravelDocumentScreen} />
      <Stack.Screen name="TravelDocumentDetail" component={TravelDocumentDetailScreen} />
      <Stack.Screen name="TripSubscription" component={TripSubscriptionScreen} />
    </Stack.Navigator>
  );
}
