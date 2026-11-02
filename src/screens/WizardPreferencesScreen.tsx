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
import {
  ArrowLeft,
  Sparkles,
  Utensils,
  Camera,
  Trees,
  Landmark,
  Compass,
  ShoppingBag,
  Check,
} from 'lucide-react-native';

const PREFERENCE_OPTIONS = [
  { id: 'food', label: 'Ẩm thực & Cà phê', icon: Utensils, desc: 'Thưởng thức món ngon đặc sản' },
  { id: 'photo', label: 'Chụp ảnh & Check-in', icon: Camera, desc: 'Góc sống ảo và ngắm hoàng hôn' },
  { id: 'nature', label: 'Thiên nhiên & Thư giãn', icon: Trees, desc: 'Bãi biển, đồi thông, không khí mát' },
  { id: 'culture', label: 'Văn hóa & Di sản', icon: Landmark, desc: 'Phố cổ, di tích lịch sử, chùa chiền' },
  { id: 'adventure', label: 'Khám phá & Trải nghiệm', icon: Compass, desc: 'Đi bộ, săn mây, khám phá mới lạ' },
  { id: 'shopping', label: 'Chợ đêm & Mua sắm', icon: ShoppingBag, desc: 'Quà đặc sản, phố đi bộ sầm uất' },
];

interface WizardPreferencesScreenProps {
  navigation: any;
}

export const WizardPreferencesScreen: React.FC<WizardPreferencesScreenProps> = ({
  navigation,
}) => {
  const { wizardData, setWizardData } = useTravel();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    wizardData.interests || ['Ẩm thực & Cà phê', 'Chụp ảnh & Check-in', 'Thiên nhiên & Thư giãn']
  );

  const toggleInterest = (label: string) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const handleCreateTrip = () => {
    setWizardData((prev) => ({
      ...prev,
      interests: selectedInterests,
    }));
    navigation.navigate('AIGenerating');
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
          <Text style={styles.stepText}>Bước 5 / 5</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Sở thích của bạn</Text>
          <Text style={styles.subtitle}>
            Chọn những trải nghiệm bạn muốn ưu tiên trong chuyến đi này.
          </Text>
        </View>

        <View style={styles.list}>
          {PREFERENCE_OPTIONS.map((item) => {
            const isSelected = selectedInterests.includes(item.label);
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, isSelected && styles.selectedCard]}
                onPress={() => toggleInterest(item.label)}
                activeOpacity={0.8}
              >
                <View
                  style={[styles.iconCircle, isSelected && styles.selectedIconCircle]}
                >
                  <Icon size={20} color={isSelected ? Colors.white : Colors.primary} />
                </View>

                <View style={styles.cardInfo}>
                  <Text style={[styles.cardTitle, isSelected && styles.selectedCardTitle]}>
                    {item.label}
                  </Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>

                <View
                  style={[styles.checkCircle, isSelected && styles.selectedCheckCircle]}
                >
                  {isSelected && <Check size={14} color={Colors.white} strokeWidth={3} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.generateButton, selectedInterests.length === 0 && styles.disabledButton]}
          disabled={selectedInterests.length === 0}
          onPress={handleCreateTrip}
          activeOpacity={0.85}
        >
          <Sparkles size={20} color={Colors.white} />
          <Text style={styles.generateButtonText}>Tạo lịch trình cùng AI</Text>
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
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 14,
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIconCircle: {
    backgroundColor: Colors.primary,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  selectedCardTitle: {
    color: Colors.primary,
  },
  cardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckCircle: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
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
  generateButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 14,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  generateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
