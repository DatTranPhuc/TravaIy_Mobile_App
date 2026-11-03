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
import { ArrowLeft, User, Users, Plus, Minus, Heart, Shield } from 'lucide-react-native';

interface WizardCompanionsScreenProps {
  navigation: any;
}

export const WizardCompanionsScreen: React.FC<WizardCompanionsScreenProps> = ({ navigation }) => {
  const { wizardData, setWizardData } = useTravel();
  const [type, setType] = useState<'solo' | 'group'>(wizardData.companionType || 'group');
  const [count, setCount] = useState<number>(wizardData.companionCount || 4);

  const handleNext = () => {
    setWizardData((prev) => ({
      ...prev,
      companionType: type,
      companionCount: type === 'solo' ? 1 : count,
    }));
    navigation.navigate('WizardBudget');
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
          <Text style={styles.stepText}>Bước 3 / 5</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Bạn đi cùng ai?</Text>
          <Text style={styles.subtitle}>
            Điều chỉnh lịch trình phù hợp cho chuyến đi một mình hay theo nhóm.
          </Text>
        </View>

        {/* Companion Types */}
        <View style={styles.typeCards}>
          <TouchableOpacity
            style={[styles.typeCard, type === 'solo' && styles.selectedTypeCard]}
            onPress={() => setType('solo')}
            activeOpacity={0.8}
          >
            <View
              style={[styles.iconCircle, type === 'solo' && styles.selectedIconCircle]}
            >
              <User size={24} color={type === 'solo' ? Colors.white : Colors.primary} />
            </View>
            <Text style={[styles.typeTitle, type === 'solo' && styles.selectedTypeTitle]}>
              Một mình
            </Text>
            <Text style={styles.typeSub}>Trải nghiệm tự do, theo nhịp sống riêng của bạn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeCard, type === 'group' && styles.selectedTypeCard]}
            onPress={() => setType('group')}
            activeOpacity={0.8}
          >
            <View
              style={[styles.iconCircle, type === 'group' && styles.selectedIconCircle]}
            >
              <Users size={24} color={type === 'group' ? Colors.white : Colors.primary} />
            </View>
            <Text style={[styles.typeTitle, type === 'group' && styles.selectedTypeTitle]}>
              Đi theo nhóm
            </Text>
            <Text style={styles.typeSub}>Bạn bè, gia đình, chia tiền & biểu quyết tiện lợi</Text>
          </TouchableOpacity>
        </View>

        {/* Counter for Group */}
        {type === 'group' && (
          <View style={styles.counterBox}>
            <Text style={styles.counterLabel}>Số lượng thành viên</Text>
            <View style={styles.counterControls}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setCount((c) => Math.max(2, c - 1))}
              >
                <Minus size={20} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{count} người</Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setCount((c) => Math.min(20, c + 1))}
              >
                <Plus size={20} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.tipBox}>
          <Shield size={20} color={Colors.primary} />
          <Text style={styles.tipText}>
            TravAIy tự động gợi ý nhà hàng và các hoạt động phù hợp nhất với quy mô đoàn của bạn.
          </Text>
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
  typeCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  typeCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  selectedTypeCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  selectedIconCircle: {
    backgroundColor: Colors.primary,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  selectedTypeTitle: {
    color: Colors.primary,
  },
  typeSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  counterBox: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  counterLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  tipBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#1E40AF',
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
