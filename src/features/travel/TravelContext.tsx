import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INITIAL_PLAN } from './fixtures';
import type { ActivePlan } from './model';
import { INITIAL_WIZARD_DATA } from '../../data/mockData';
import type { TripWizardData } from '../../types/travel';

interface TravelContextType {
  plan: ActivePlan;
  setPlan: (plan: ActivePlan) => void;
  wizardData: TripWizardData;
  setWizardData: React.Dispatch<React.SetStateAction<TripWizardData>>;
  userName: string;
  setUserName: (name: string) => void;
  preferences: {
    travelStyle: string;
    timeOfDay: string[];
    interests: string[];
    priorities: string[];
  };
  trips: ActivePlan[];
  resetToInitial: () => void;
}

const TravelContext = createContext<TravelContextType | null>(null);

export function TravelProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlanState] = useState<ActivePlan>(INITIAL_PLAN);
  const [wizardData, setWizardData] = useState<TripWizardData>(INITIAL_WIZARD_DATA);
  const [userName, setUserName] = useState<string>('Hoàng Nam');
  const [preferences] = useState({
    travelStyle: 'Thong thả & Thư giãn',
    timeOfDay: ['Buổi sáng', 'Buổi tối'],
    interests: ['Cà phê & Ẩm thực', 'Biển đảo', 'Chụp ảnh'],
    priorities: ['Lịch trình hợp lý', 'Địa điểm check-in hot'],
  });
  const trips = [plan];

  useEffect(() => {
    (async () => {
      try {
        const savedPlan = await AsyncStorage.getItem('travaiy-plan');
        if (savedPlan) setPlanState(JSON.parse(savedPlan));
        const savedUser = await AsyncStorage.getItem('travaiy-user');
        if (savedUser) setUserName(savedUser);
      } catch (err) {
        console.warn('Failed to load storage:', err);
      }
    })();
  }, []);

  const setPlan = (newPlan: ActivePlan) => {
    setPlanState(newPlan);
    AsyncStorage.setItem('travaiy-plan', JSON.stringify(newPlan)).catch(() => {});
  };

  const handleSetUserName = (name: string) => {
    setUserName(name);
    AsyncStorage.setItem('travaiy-user', name).catch(() => {});
  };

  const resetToInitial = () => {
    setPlan(INITIAL_PLAN);
    setWizardData(INITIAL_WIZARD_DATA);
  };

  return (
    <TravelContext.Provider
      value={{
        plan,
        setPlan,
        wizardData,
        setWizardData,
        userName,
        setUserName: handleSetUserName,
        preferences,
        trips,
        resetToInitial,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const ctx = useContext(TravelContext);
  if (!ctx) throw new Error('useTravel must be used within TravelProvider');
  return ctx;
}

