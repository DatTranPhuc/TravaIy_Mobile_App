import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../theme/colors';
import { useTravel } from '../features/travel/TravelContext';
import { ArrowLeft, Calendar, Clock, Check } from 'lucide-react-native';

const DURATIONS = [
  { label: '2 ngày 1 đêm', days: 2, text: '2N1Đ', start: '17/10/2026', end: '18/10/2026' },
  { label: '3 ngày 2 đêm', days: 3, text: '3N2Đ (Lý tưởng)', start: '17/10/2026', end: '19/10/2026' },
  { label: '4 ngày 3 đêm', days: 4, text: '4N3Đ', start: '17/10/2026', end: '20/10/2026' },
  { label: '5 ngày 4 đêm', days: 5, text: '5N4Đ', start: '17/10/2026', end: '21/10/2026' },
];

const DEPARTURE_TIMES = ['07:00 (Sáng sớm)', '09:00 (Buổi sáng)', '13:30 (Đầu giờ chiều)'];

interface WizardDatesScreenProps {
  navigation: any;
}

export const WizardDatesScreen: React.FC<WizardDatesScreenProps> = ({ navigation }) => {
  const { wizardData, setWizardData } = useTravel();
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[1]);
  const [departureTime, setDepartureTime] = useState('08:00');

  const handleSelectDuration = (item: (typeof DURATIONS)[0]) => {
    setSelectedDuration(item);
    setWizardData((prev) => ({
      ...prev,
      startDate: item.start,
      endDate: item.end,
      durationText: item.label,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Bước 2 / 5</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '40%' }]} />
          </View>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Thời gian chuyến đi</Text>
          <Text style={styles.subtitle}>
            Chuyến đi đến {wizardData.destination || 'Đà Nẵng'} sẽ kéo dài trong bao lâu?
          </Text>
        </View>

        {/* Thời lượng */}
        <Text style={styles.sectionHeading}>Chọn thời lượng</Text>
        <View style={styles.durationList}>
          {DURATIONS.map((item) => {
            const isSelected = selectedDuration.label === item.label;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.durationCard, isSelected && styles.selectedDurationCard]}
                onPress={() => handleSelectDuration(item)}
                activeOpacity={0.8}
              >
                <View style={styles.durationCardLeft}>
                  <Calendar
                    size={20}
                    color={isSelected ? Colors.primary : Colors.textSecondary}
                  />
                  <View>
                    <Text
                      style={[styles.durationTitle, isSelected && styles.selectedDurationTitle]}
                    >
                      {item.label}
                    </Text>
                    <Text style={styles.durationSub}>
                      {item.start} - {item.end}
                    </Text>
                  </View>
                </View>
                {isSelected && (
                  <View style={styles.checkCircle}>
                    <Check size={14} color={Colors.white} strokeWidth={3} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Giờ khởi hành */}
        <Text style={[styles.sectionHeading, { marginTop: 24 }]}>Khung giờ khởi hành mong muốn</Text>
        <View style={styles.timeOptionList}>
          {DEPARTURE_TIMES.map((time) => {
            const isSelected = departureTime === time;
            return (
              <TouchableOpacity
                key={time}
                style={[styles.timeChip, isSelected && styles.selectedTimeChip]}
                onPress={() => setDepartureTime(time)}
                activeOpacity={0.8}
              >
                <Clock size={16} color={isSelected ? Colors.primary : Colors.textSecondary} />
                <Text style={[styles.timeChipText, isSelected && styles.selectedTimeChipText]}>
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('WizardCompanions')}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicator: {
    alignItems: 'center',
    width: 140,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.primaryLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  durationList: {
    gap: 10,
  },
  durationCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  selectedDurationCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  durationCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  durationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  selectedDurationTitle: {
    color: Colors.primary,
  },
  durationSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeOptionList: {
    gap: 10,
  },
  timeChip: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  selectedTimeChip: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  timeChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  selectedTimeChipText: {
    color: Colors.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
  },
  nextButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
