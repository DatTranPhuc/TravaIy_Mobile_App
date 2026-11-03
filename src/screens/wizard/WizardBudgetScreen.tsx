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
import { Colors } from '../../theme/colors';
import { useTravel } from '../../features/travel/TravelContext';
import { ArrowLeft, Wallet, Check, Sparkles } from 'lucide-react-native';

const BUDGET_TIERS = [
  {
    tier: 'Tiết kiệm' as const,
    amount: 1500000,
    amountText: '1.500.000đ / người',
    desc: 'Homestay ấm cúng, quán ăn dân dã ngon rẻ, trải nghiệm địa phương',
  },
  {
    tier: 'Vừa túi tiền' as const,
    amount: 2500000,
    amountText: '2.500.000đ / người',
    desc: 'Khách sạn 3 sao tiện nghi, thưởng thức hải sản & nhà hàng nổi bật',
    popular: true,
  },
  {
    tier: 'Thoải mái' as const,
    amount: 4500000,
    amountText: '4.500.000đ / người',
    desc: 'Resort/Khách sạn cao cấp, nhà hàng view đẹp, trải nghiệm trọn vẹn',
  },
];

interface WizardBudgetScreenProps {
  navigation: any;
}

export const WizardBudgetScreen: React.FC<WizardBudgetScreenProps> = ({ navigation }) => {
  const { wizardData, setWizardData } = useTravel();
  const [selectedTier, setSelectedTier] = useState(
    BUDGET_TIERS.find((t) => t.tier === wizardData.budgetTier) || BUDGET_TIERS[1]
  );

  const handleNext = () => {
    setWizardData((prev) => ({
      ...prev,
      budgetTier: selectedTier.tier,
      budgetAmount: selectedTier.amount,
    }));
    navigation.navigate('WizardPreferences');
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
          <Text style={styles.stepText}>Bước 4 / 5</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Ngân sách dự kiến</Text>
          <Text style={styles.subtitle}>
            AI sẽ chọn lọc điểm ăn uống và hoạt động phù hợp mức chi tiêu của bạn.
          </Text>
        </View>

        <View style={styles.list}>
          {BUDGET_TIERS.map((item) => {
            const isSelected = selectedTier.tier === item.tier;
            return (
              <TouchableOpacity
                key={item.tier}
                style={[styles.card, isSelected && styles.selectedCard]}
                onPress={() => setSelectedTier(item)}
                activeOpacity={0.8}
              >
                {item.popular && (
                  <View style={styles.popularBadge}>
                    <Sparkles size={12} color={Colors.primary} />
                    <Text style={styles.popularText}>Phổ biến nhất</Text>
                  </View>
                )}

                <View style={styles.cardHeader}>
                  <View>
                    <Text style={[styles.cardTier, isSelected && styles.selectedCardTier]}>
                      {item.tier}
                    </Text>
                    <Text style={styles.cardAmount}>{item.amountText}</Text>
                  </View>

                  <View
                    style={[styles.checkCircle, isSelected && styles.selectedCheckCircle]}
                  >
                    {isSelected && <Check size={14} color={Colors.white} strokeWidth={3} />}
                  </View>
                </View>

                <Text style={styles.cardDesc}>{item.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
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
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: Colors.border,
    position: 'relative',
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: Colors.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  popularText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTier: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  selectedCardTier: {
    color: Colors.primary,
  },
  cardAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 2,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckCircle: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
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
