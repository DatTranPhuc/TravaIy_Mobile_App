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
  ArrowRight,
  Sparkles,
  Check,
  Utensils,
  Mountain,
  Landmark,
  Camera,
  Coffee,
  Heart,
} from 'lucide-react-native';
import { LocalImages } from '../assets/images';

interface Props {
  navigation: any;
}

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Ăn uống & Cà phê',
    'Thiên nhiên & Biển đảo',
  ]);
  const [selectedStyle, setSelectedStyle] = useState('Thong thả & Thư giãn');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    'Quán ngon chuẩn vị',
    'View chụp ảnh đẹp',
  ]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(['Buổi sáng', 'Buổi tối']);

  const interestsList = [
    { id: 'Ăn uống & Cà phê', label: 'Ăn uống & Cà phê', icon: '🍜' },
    { id: 'Thiên nhiên & Biển đảo', label: 'Thiên nhiên & Biển đảo', icon: '🏖️' },
    { id: 'Văn hóa & Di sản', label: 'Văn hóa & Di sản', icon: '🏮' },
    { id: 'Nghỉ dưỡng & Tắm biển', label: 'Nghỉ dưỡng & Tắm biển', icon: '🌴' },
    { id: 'Chụp ảnh & Sống ảo', label: 'Chụp ảnh & Sống ảo', icon: '📸' },
    { id: 'Phiêu lưu & Leo núi', label: 'Phiêu lưu & Leo núi', icon: '🧗' },
  ];

  const stylesList = [
    { id: 'Thong thả & Thư giãn', label: 'Thong thả & Thư giãn', desc: '1-2 điểm mỗi ngày, không vội vã' },
    { id: 'Khám phá tối đa', label: 'Khám phá tối đa', desc: 'Đi thật nhiều nơi, trải nghiệm trọn vẹn' },
    { id: 'Tiết kiệm & Thực tế', label: 'Tiết kiệm & Thực tế', desc: 'Tối ưu ngân sách, món ngon đường phố' },
    { id: 'Nghỉ dưỡng sang trọng', label: 'Nghỉ dưỡng sang trọng', desc: 'Resort cao cấp, dịch vụ tiện nghi' },
  ];

  const prioritiesList = [
    'Quán ngon chuẩn vị bản địa',
    'View chụp ảnh check-in đẹp',
    'Chi phí tối ưu & hợp lý',
    'Chỗ nghỉ tiện nghi & sạch sẽ',
    'Lịch trình linh hoạt không gò bó',
  ];

  const timesList = [
    { id: 'Buổi sáng', label: 'Sáng sớm (06:00 - 10:00)', sub: 'Săn mây, dạo biển ngắm bình minh' },
    { id: 'Buổi chiều', label: 'Chiều tà (15:00 - 18:00)', sub: 'Ngắm hoàng hôn, tắm biển' },
    { id: 'Buổi tối', label: 'Buổi tối (18:00 - 23:00)', sub: 'Chợ đêm, phố đi bộ, acoustic bar' },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleTime = (id: string) => {
    setSelectedTimes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      navigation.replace('MainTabs');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.8}>
          <ChevronLeft size={22} color="#0A1680" />
        </TouchableOpacity>

        {step <= 4 ? (
          <View style={styles.stepIndicator}>
            {[1, 2, 3, 4].map((s) => (
              <View
                key={s}
                style={[styles.stepDot, s <= step && styles.stepDotActive]}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.headerTitle}>Hoàn tất hồ sơ</Text>
        )}

        <TouchableOpacity onPress={() => navigation.replace('MainTabs')} activeOpacity={0.8}>
          <Text style={styles.skipBtnText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && (
          /* STEP 1: SỞ THÍCH */
          <View style={styles.stepContent}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepBadge}>BƯỚC 1/4 · DNA DU LỊCH</Text>
              <Text style={styles.stepTitle}>Bạn hào hứng với trải nghiệm nào nhất?</Text>
              <Text style={styles.stepSub}>Chọn những sở thích mà bạn muốn Bé Sao Lumi ưu tiên gợi ý.</Text>
            </View>

            <View style={styles.interestsGrid}>
              {interestsList.map((item) => {
                const isSelected = selectedInterests.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.interestCard, isSelected && styles.interestCardSelected]}
                    onPress={() => toggleInterest(item.id)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.interestIcon}>{item.icon}</Text>
                    <Text style={[styles.interestLabel, isSelected && styles.interestLabelSelected]}>
                      {item.label}
                    </Text>
                    {isSelected && (
                      <View style={styles.checkedCircle}>
                        <Check size={11} color="#FFFFFF" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {step === 2 && (
          /* STEP 2: PHONG CÁCH */
          <View style={styles.stepContent}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepBadge}>BƯỚC 2/4 · NHỊP ĐIỆU CHUYẾN ĐI</Text>
              <Text style={styles.stepTitle}>Phong cách du lịch của bạn là gì?</Text>
              <Text style={styles.stepSub}>Giúp Bé Sao Lumi sắp xếp số lượng điểm đến mỗi ngày vừa vặn nhất.</Text>
            </View>

            <View style={styles.optionsList}>
              {stylesList.map((item) => {
                const isSelected = selectedStyle === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.styleCard, isSelected && styles.styleCardSelected]}
                    onPress={() => setSelectedStyle(item.id)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.styleContent}>
                      <Text style={[styles.styleName, isSelected && styles.styleNameSelected]}>
                        {item.label}
                      </Text>
                      <Text style={styles.styleDesc}>{item.desc}</Text>
                    </View>
                    <View style={[styles.radio, isSelected && styles.radioSelected]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {step === 3 && (
          /* STEP 3: TIÊU CHÍ ƯU TIÊN */
          <View style={styles.stepContent}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepBadge}>BƯỚC 3/4 · TIÊU CHÍ ƯU TIÊN</Text>
              <Text style={styles.stepTitle}>Điều gì quan trọng nhất với bạn?</Text>
              <Text style={styles.stepSub}>Chọn từ 1 đến 3 tiêu chí để AI căn chỉnh lịch trình chuẩn xác.</Text>
            </View>

            <View style={styles.optionsList}>
              {prioritiesList.map((item) => {
                const isSelected = selectedPriorities.includes(item);
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.priorityCard, isSelected && styles.priorityCardSelected]}
                    onPress={() => togglePriority(item)}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.priorityText, isSelected && styles.priorityTextSelected]}>
                      {item}
                    </Text>
                    <View style={[styles.checkSquare, isSelected && styles.checkSquareActive]}>
                      {isSelected && <Check size={12} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {step === 4 && (
          /* STEP 4: THỜI ĐIỂM */
          <View style={styles.stepContent}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepBadge}>BƯỚC 4/4 · THỜI GIAN HOẠT ĐỘNG</Text>
              <Text style={styles.stepTitle}>Khung giờ bạn tràn đầy năng lượng nhất?</Text>
              <Text style={styles.stepSub}>Bé Sao Lumi sẽ xếp các hoạt động thú vị nhất vào khung giờ này.</Text>
            </View>

            <View style={styles.optionsList}>
              {timesList.map((item) => {
                const isSelected = selectedTimes.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.timeCard, isSelected && styles.timeCardSelected]}
                    onPress={() => toggleTime(item.id)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.timeInfo}>
                      <Text style={[styles.timeTitle, isSelected && styles.timeTitleSelected]}>
                        {item.label}
                      </Text>
                      <Text style={styles.timeSub}>{item.sub}</Text>
                    </View>
                    <View style={[styles.checkSquare, isSelected && styles.checkSquareActive]}>
                      {isSelected && <Check size={12} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {step === 5 && (
          /* STEP 5: CELEBRATION */
          <View style={styles.celebrationWrap}>
            <Image source={LocalImages.lumiWave} style={styles.celebrationMascot} resizeMode="contain" />

            <Text style={styles.celebrationTitle}>Sẵn sàng rồi, Hoàng Nam!</Text>
            <Text style={styles.celebrationSub}>
              Bé Sao Lumi đã ghi nhớ trọn vẹn DNA du lịch của bạn và sẵn sàng lên kế hoạch thông minh!
            </Text>

            <View style={styles.dnaCard}>
              <View style={styles.dnaRow}>
                <Text style={styles.dnaLabel}>Phong cách:</Text>
                <Text style={styles.dnaValue}>{selectedStyle}</Text>
              </View>
              <View style={styles.dnaDivider} />
              <View style={styles.dnaRow}>
                <Text style={styles.dnaLabel}>Sở thích:</Text>
                <Text style={styles.dnaValue}>{selectedInterests.join(', ')}</Text>
              </View>
              <View style={styles.dnaDivider} />
              <View style={styles.dnaRow}>
                <Text style={styles.dnaLabel}>Khung giờ:</Text>
                <Text style={styles.dnaValue}>{selectedTimes.join(' · ')}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextBtnCta}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnCtaText}>
            {step === 4 ? 'Xem hồ sơ của tôi' : step === 5 ? 'Bắt đầu khám phá ✨' : 'Tiếp tục'}
          </Text>
          <ArrowRight size={18} color="#FFFFFF" />
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
    paddingTop: 38,
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
  stepIndicator: {
    flexDirection: 'row',
    gap: 6,
  },
  stepDot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
  },
  stepDotActive: {
    backgroundColor: '#0A1680',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0A1680',
  },
  skipBtnText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  stepContent: {
    gap: 20,
  },
  stepHeader: {
    gap: 6,
  },
  stepBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: 1.2,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
    lineHeight: 28,
  },
  stepSub: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  interestCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 8,
    position: 'relative',
  },
  interestCardSelected: {
    borderColor: '#0A1680',
    backgroundColor: '#EFF3FF',
  },
  interestIcon: {
    fontSize: 28,
  },
  interestLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  interestLabelSelected: {
    color: '#0A1680',
  },
  checkedCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsList: {
    gap: 12,
  },
  styleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  styleCardSelected: {
    borderColor: '#0A1680',
    backgroundColor: '#EFF3FF',
  },
  styleContent: {
    flex: 1,
    gap: 4,
  },
  styleName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  styleNameSelected: {
    color: '#0A1680',
  },
  styleDesc: {
    fontSize: 11,
    color: '#64748B',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#0A1680',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0A1680',
  },
  priorityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  priorityCardSelected: {
    borderColor: '#0A1680',
    backgroundColor: '#EFF3FF',
  },
  priorityText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  priorityTextSelected: {
    color: '#0A1680',
  },
  checkSquare: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkSquareActive: {
    backgroundColor: '#0A1680',
    borderColor: '#0A1680',
  },
  timeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  timeCardSelected: {
    borderColor: '#0A1680',
    backgroundColor: '#EFF3FF',
  },
  timeInfo: {
    flex: 1,
    gap: 3,
  },
  timeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  timeTitleSelected: {
    color: '#0A1680',
  },
  timeSub: {
    fontSize: 11,
    color: '#64748B',
  },
  celebrationWrap: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 20,
  },
  celebrationMascot: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  celebrationTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0A1680',
    textAlign: 'center',
  },
  celebrationSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  dnaCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    marginTop: 10,
  },
  dnaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dnaLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  dnaValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A1680',
    maxWidth: 200,
    textAlign: 'right',
  },
  dnaDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  nextBtnCta: {
    backgroundColor: '#0A1680',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextBtnCtaText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
