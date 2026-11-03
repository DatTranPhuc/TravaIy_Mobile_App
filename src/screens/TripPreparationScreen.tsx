import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ChevronLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Luggage,
  CloudSun,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import { LocalImages } from '../assets/images';

interface Props {
  navigation: any;
}

export const TripPreparationScreen: React.FC<Props> = ({ navigation }) => {
  const [checklist, setChecklist] = useState([
    { id: '1', label: 'CCCD / Hộ chiếu bản gốc', checked: true, category: 'Giấy tờ' },
    { id: '2', label: 'Vé máy bay khứ hồi (Check-in online trước 24h)', checked: true, category: 'Vé & Đặt chỗ' },
    { id: '3', label: 'Xác nhận đặt phòng khách sạn ven biển', checked: true, category: 'Vé & Đặt chỗ' },
    { id: '4', label: 'Tiền mặt lẻ 20k - 50k ăn vặt & tip', checked: false, category: 'Tài chính' },
    { id: '5', label: 'Bảo hiểm du lịch nội địa', checked: false, category: 'Bảo hiểm' },
    { id: '6', label: 'Thuốc say xe / say sóng khi đi cano Cù Lao Chàm', checked: true, category: 'Y tế' },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const doneCount = checklist.filter((c) => c.checked).length;
  const progressPercent = Math.round((doneCount / checklist.length) * 100);

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
          <Text style={styles.headerTitle}>Chuẩn bị chuyến đi</Text>
          <Text style={styles.headerSub}>Đà Nẵng · 16/10/2026</Text>
        </View>

        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Countdown Hero Card */}
        <View style={styles.countdownCard}>
          <View style={styles.countdownLeft}>
            <View style={styles.countdownBadge}>
              <Calendar size={14} color="#0A1680" />
              <Text style={styles.countdownBadgeText}>Đếm ngược</Text>
            </View>
            <Text style={styles.countdownTitle}>Còn 3 ngày nữa</Text>
            <Text style={styles.countdownSub}>Chuyến bay VJ128 cất cánh lúc 06:15 sáng</Text>
          </View>
          <Image
            source={LocalImages.lumiWave}
            style={styles.countdownMascot}
            resizeMode="contain"
          />
        </View>

        {/* Packing List Quick Banner CTA */}
        <TouchableOpacity
          style={styles.packingBanner}
          onPress={() => navigation.navigate('PackingList')}
          activeOpacity={0.85}
        >
          <View style={styles.packingIconBg}>
            <Luggage size={22} color="#0A1680" />
          </View>
          <View style={styles.packingTextWrap}>
            <Text style={styles.packingTitle}>Danh sách đồ dùng mang theo</Text>
            <Text style={styles.packingSub}>18 món đồ · 4 danh mục · Chưa soạn 6 món</Text>
          </View>
          <ChevronRight size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Tiến độ chuẩn bị</Text>
            <Text style={styles.progressPercent}>{progressPercent}% hoàn tất</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressMeta}>
            Đã sẵn sàng {doneCount}/{checklist.length} mục quan trọng
          </Text>
        </View>

        {/* Weather Forecast Banner */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherIconBg}>
            <CloudSun size={22} color="#D97706" />
          </View>
          <View style={styles.weatherTextWrap}>
            <Text style={styles.weatherTitle}>Dự báo thời tiết khi đến nơi</Text>
            <Text style={styles.weatherDesc}>
              Đà Nẵng 28°C - 31°C, nắng đẹp vào buổi sáng, chiều mát. Nhớ mang kem chống nắng và mũ rộng vành!
            </Text>
          </View>
        </View>

        {/* Pre-trip Checklist */}
        <View style={styles.checklistSection}>
          <Text style={styles.sectionHeading}>Mục cần kiểm tra trước khi đi</Text>

          <View style={styles.checklistCard}>
            {checklist.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.checkItem,
                  index < checklist.length - 1 && styles.checkItemBorder,
                ]}
                onPress={() => toggleCheck(item.id)}
                activeOpacity={0.8}
              >
                {item.checked ? (
                  <CheckCircle2 size={20} color="#10B981" />
                ) : (
                  <Circle size={20} color="#CBD5E1" />
                )}
                <View style={styles.checkTextWrap}>
                  <Text
                    style={[
                      styles.checkLabel,
                      item.checked && styles.checkLabelChecked,
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Text style={styles.checkCat}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mascot Advice */}
        <View style={styles.mascotAdvice}>
          <View style={styles.mascotAdviceHeader}>
            <Sparkles size={14} color="#D97706" />
            <Text style={styles.mascotAdviceTitle}>Lời khuyên từ Bé Sao Lumi</Text>
          </View>
          <Text style={styles.mascotAdviceText}>
            Đừng quên lưu vé máy bay và đặt phòng vào Ví giấy tờ TravAIy để có thể mở xem ngoại tuyến kể cả khi không có mạng nhé!
          </Text>
        </View>
      </ScrollView>
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
  countdownCard: {
    backgroundColor: '#EFF3FF',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  countdownLeft: {
    flex: 1,
    gap: 4,
  },
  countdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 4,
  },
  countdownBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0A1680',
  },
  countdownTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0A1680',
  },
  countdownSub: {
    fontSize: 11,
    color: '#475569',
  },
  countdownMascot: {
    width: 64,
    height: 64,
  },
  packingBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  packingIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  packingTextWrap: {
    flex: 1,
    gap: 2,
  },
  packingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  packingSub: {
    fontSize: 11,
    color: '#64748B',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '800',
    color: '#10B981',
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressMeta: {
    fontSize: 11,
    color: '#64748B',
  },
  weatherCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
    flexDirection: 'row',
    gap: 12,
  },
  weatherIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherTextWrap: {
    flex: 1,
    gap: 4,
  },
  weatherTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#B45309',
  },
  weatherDesc: {
    fontSize: 11,
    color: '#78350F',
    lineHeight: 16,
  },
  checklistSection: {
    gap: 10,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  checklistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  checkItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  checkTextWrap: {
    flex: 1,
    gap: 2,
  },
  checkLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  checkLabelChecked: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  checkCat: {
    fontSize: 10,
    color: '#94A3B8',
  },
  mascotAdvice: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  mascotAdviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mascotAdviceTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  mascotAdviceText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
});
