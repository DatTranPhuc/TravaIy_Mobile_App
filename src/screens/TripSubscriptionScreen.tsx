import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  Check,
  Sparkles,
  Zap,
  Users,
  ShieldCheck,
  Crown,
} from 'lucide-react-native';
import { LocalImages } from '../assets/images';

interface Props {
  navigation: any;
}

export const TripSubscriptionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedTier, setSelectedTier] = useState<'plus' | 'group'>('plus');

  const tiers = [
    {
      id: 'plus',
      name: 'TravAIy Plus ✨',
      tag: 'Phổ biến nhất',
      price: '49.000đ',
      period: '/ chuyến đi',
      sub: 'Dành cho du lịch cá nhân & cặp đôi',
      features: [
        'Không giới hạn lượt tạo và tối ưu AI',
        'Tự động thích ứng khi trời mưa hoặc trễ giờ',
        'Đề xuất quán ngon & góc check-in địa phương',
        'Lưu vé & tài liệu du lịch ngoại tuyến không giới hạn',
      ],
    },
    {
      id: 'group',
      name: 'TravAIy Nhóm Đi 👥',
      tag: 'Tiết kiệm nhất',
      price: '129.000đ',
      period: '/ chuyến đi (tối đa 10 người)',
      sub: 'Dành cho nhóm bạn bè & gia đình',
      features: [
        'Toàn bộ tính năng của gói Plus',
        'Radar định vị các thành viên theo thời gian thực',
        'Tự động cấn trừ & chia tiền nhóm thông minh',
        'Tạo bình chọn quán ăn & điểm đến không giới hạn',
        'Khung photobooth nhóm độc quyền',
      ],
    },
  ];

  const handleCheckout = () => {
    Alert.alert('Thành công! 🎉', 'Chúc mừng bạn đã nâng cấp thành công gói TravAIy!', [
      { text: 'Trải nghiệm ngay', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ChevronLeft size={22} color="#0A1680" />
        </TouchableOpacity>

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Gói hội viên TravAIy</Text>
          <Text style={styles.headerSub}>Mở khóa toàn bộ sức mạnh AI</Text>
        </View>

        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mascot Banner */}
        <View style={styles.mascotBanner}>
          <Image source={LocalImages.lumiWave} style={styles.mascotImg} resizeMode="contain" />
          <View style={styles.mascotText}>
            <View style={styles.mascotHeadingRow}>
              <Crown size={15} color="#D97706" />
              <Text style={styles.mascotHeading}>Du lịch thảnh thơi cùng Lumi</Text>
            </View>
            <Text style={styles.mascotBody}>
              Nâng cấp để Bé Sao Lumi luôn đồng hành, chủ động điều chỉnh lịch trình và chăm sóc nhóm bạn suốt chuyến đi!
            </Text>
          </View>
        </View>

        {/* Tier Cards */}
        {tiers.map((t) => {
          const isSelected = selectedTier === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              style={[styles.tierCard, isSelected && styles.tierCardSelected]}
              onPress={() => setSelectedTier(t.id as any)}
              activeOpacity={0.85}
            >
              {isSelected && (
                <View style={styles.topRibbon}>
                  <Text style={styles.topRibbonText}>{t.tag}</Text>
                </View>
              )}

              <View style={styles.tierHeader}>
                <Text style={styles.tierName}>{t.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.tierPrice}>{t.price}</Text>
                  <Text style={styles.tierPeriod}>{t.period}</Text>
                </View>
                <Text style={styles.tierSub}>{t.sub}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.featuresList}>
                {t.features.map((feat, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <View style={styles.checkCircle}>
                      <Check size={11} color="#10B981" />
                    </View>
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={handleCheckout}
          activeOpacity={0.85}
        >
          <Sparkles size={18} color="#FFFFFF" />
          <Text style={styles.checkoutBtnText}>
            Nâng cấp gói {selectedTier === 'plus' ? 'Plus (49.000đ)' : 'Nhóm (129.000đ)'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A1680',
  },
  headerSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  mascotBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  mascotImg: {
    width: 54,
    height: 54,
  },
  mascotText: {
    flex: 1,
  },
  mascotHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  mascotHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  mascotBody: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  tierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
  },
  tierCardSelected: {
    borderColor: '#0A1680',
    backgroundColor: '#FAFCFF',
  },
  topRibbon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#0A1680',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
  },
  topRibbonText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EFF3FF',
  },
  tierHeader: {
    gap: 6,
  },
  tierName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  tierPrice: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0A1680',
  },
  tierPeriod: {
    fontSize: 11,
    color: '#64748B',
  },
  tierSub: {
    fontSize: 11,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  featuresList: {
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  checkoutBtn: {
    backgroundColor: '#0A1680',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  checkoutBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
