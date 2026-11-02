import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../theme/colors';
import { useTravel } from '../features/travel/TravelContext';
import { buildWizardPlan } from '../features/travel/wizardPlan';
import { LocalImages } from '../assets/images';
import { CheckCircle2 } from 'lucide-react-native';

const STEPS = [
  'Thu thập dữ liệu điểm đến và địa danh nổi tiếng...',
  'Tính toán tuyến đường và khung giờ di chuyển tối ưu...',
  'Đề xuất quán ăn và điểm check-in chuẩn sở thích...',
  'Hoàn thiện lịch trình du lịch thông minh của bạn!',
];

interface AIGeneratingScreenProps {
  navigation: any;
}

export const AIGeneratingScreen: React.FC<AIGeneratingScreenProps> = ({ navigation }) => {
  const { wizardData, setPlan } = useTravel();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStepIndex(1), 1200);
    const timer2 = setTimeout(() => setCurrentStepIndex(2), 2400);
    const timer3 = setTimeout(() => setCurrentStepIndex(3), 3600);
    const timer4 = setTimeout(() => {
      const newPlan = buildWizardPlan(wizardData);
      setPlan(newPlan);
      navigation.replace('TripOverview');
    }, 4600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [wizardData, navigation, setPlan]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top App Icon Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI đang tạo lịch trình</Text>
        <Image
          source={LocalImages.appIconDark}
          style={styles.headerIcon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        {/* Mascot Center Spinner */}
        <View style={styles.mascotSpinnerWrap}>
          <View style={styles.haloRing} />
          <ActivityIndicator
            size="large"
            color="#F1B94C"
            style={styles.spinnerIndicator}
          />
          <View style={styles.mascotCircle}>
            <Image
              source={currentStepIndex >= 2 ? LocalImages.mascotCool : LocalImages.mascotMap}
              style={styles.mascotImg}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.title}>Bé Sao Lumi đang chuẩn bị...</Text>
        <Text style={styles.destination}>
          Chuyến đi {wizardData.destination} ({wizardData.durationText || '3 ngày 2 đêm'})
        </Text>

        <View style={styles.stepsCard}>
          {STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <View key={step} style={styles.stepRow}>
                {isDone ? (
                  <CheckCircle2 size={20} color="#10B981" />
                ) : (
                  <View
                    style={[
                      styles.stepDot,
                      isCurrent ? styles.stepDotActive : styles.stepDotPending,
                    ]}
                  />
                )}
                <Text
                  style={[
                    styles.stepText,
                    isDone && styles.stepTextDone,
                    isCurrent && styles.stepTextActive,
                  ]}
                >
                  {step}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1680',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  mascotSpinnerWrap: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  haloRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: 'rgba(251, 237, 176, 0.3)',
  },
  spinnerIndicator: {
    position: 'absolute',
    transform: [{ scale: 2.2 }],
  },
  mascotCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FBEDB0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F1B94C',
  },
  mascotImg: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  destination: {
    fontSize: 14,
    color: '#FBEDB0',
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: '600',
  },
  stepsCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 18,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
  stepDotActive: {
    borderColor: '#F1B94C',
    backgroundColor: 'rgba(241, 185, 76, 0.4)',
  },
  stepDotPending: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  stepText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.55)',
    flex: 1,
  },
  stepTextDone: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  stepTextActive: {
    color: '#FBEDB0',
    fontWeight: '700',
  },
});
