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
  CloudRain,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Compass,
} from 'lucide-react-native';
import { LocalImages } from '../../assets/images';

interface Props {
  navigation: any;
}

export const AdaptiveScheduleScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'weather' | 'delay'>('weather');
  const [selectedWeatherOption, setSelectedWeatherOption] = useState(1);
  const [selectedDelayOption, setSelectedDelayOption] = useState(1);

  const handleApply = () => {
    Alert.alert(
      'Áp dụng thành công! ✨',
      'Lịch trình đã được AI cập nhật tự động đồng bộ theo thời gian thực!',
      [{ text: 'Xem lịch trình hôm nay', onPress: () => navigation.navigate('TodaySchedule') }]
    );
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
          <Text style={styles.headerTitle}>Lịch trình thích ứng AI</Text>
          <Text style={styles.headerSub}>Tối ưu theo thời gian thực</Text>
        </View>

        <View style={{ width: 38 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'weather' && styles.tabBtnActive]}
          onPress={() => setActiveTab('weather')}
          activeOpacity={0.85}
        >
          <CloudRain size={16} color={activeTab === 'weather' ? '#0A1680' : '#64748B'} />
          <Text style={[styles.tabText, activeTab === 'weather' && styles.tabTextActive]}>
            Thời tiết thay đổi (Mưa)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'delay' && styles.tabBtnActive]}
          onPress={() => setActiveTab('delay')}
          activeOpacity={0.85}
        >
          <Clock size={16} color={activeTab === 'delay' ? '#0A1680' : '#64748B'} />
          <Text style={[styles.tabText, activeTab === 'delay' && styles.tabTextActive]}>
            Trễ giờ (60 phút)
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mascot Banner */}
        <View style={styles.mascotBanner}>
          <Image
            source={LocalImages.lumiWave}
            style={styles.mascotImg}
            resizeMode="contain"
          />
          <View style={styles.mascotTextWrap}>
            <View style={styles.mascotHeader}>
              <Sparkles size={14} color="#D97706" />
              <Text style={styles.mascotTitle}>Bé Sao Lumi phân tích</Text>
            </View>
            <Text style={styles.mascotBody}>
              {activeTab === 'weather'
                ? 'Dự báo chiều nay 16h có mưa rào tại đỉnh Bà Nà. Mình gợi ý đổi lịch để bạn không bị ướt và vẫn ngắm trọn vẹn Cầu Vàng!'
                : 'Bạn đang trễ 60 phút so với dự kiến. Để không bỏ lỡ bữa tối cùng nhóm, mình đề xuất 2 phương án bên dưới.'}
            </Text>
          </View>
        </View>

        {activeTab === 'weather' ? (
          /* WEATHER OPTIONS */
          <View style={styles.optionsWrap}>
            <Text style={styles.optionsTitle}>Gợi ý phương án từ AI:</Text>

            {/* Option 1 */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedWeatherOption === 1 && styles.optionCardSelected,
              ]}
              onPress={() => setSelectedWeatherOption(1)}
              activeOpacity={0.85}
            >
              <View style={styles.optionHeader}>
                <View style={styles.optionRadio}>
                  {selectedWeatherOption === 1 && <View style={styles.radioDot} />}
                </View>
                <View style={styles.optionTag}>
                  <Text style={styles.optionTagText}>Khuyên dùng ⭐</Text>
                </View>
              </View>

              <Text style={styles.optionName}>Đổi Bà Nà sang sáng mai, chiều nay đi Hội An</Text>
              <Text style={styles.optionDesc}>
                Buổi sáng mai trời nắng đẹp, thích hợp chụp ảnh Cầu Vàng. Chiều nay đi Hội An mát mẻ và kịp xem phố đèn lồng lung linh.
              </Text>

              <View style={styles.planChangeBox}>
                <View style={styles.changeRow}>
                  <Text style={styles.changeOld}>Chiều nay: Bà Nà Hills (Mưa 🌧️)</Text>
                  <ArrowRight size={14} color="#0A1680" />
                  <Text style={styles.changeNew}>Phố cổ Hội An (Mát mẻ ☁️)</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Option 2 */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedWeatherOption === 2 && styles.optionCardSelected,
              ]}
              onPress={() => setSelectedWeatherOption(2)}
              activeOpacity={0.85}
            >
              <View style={styles.optionHeader}>
                <View style={styles.optionRadio}>
                  {selectedWeatherOption === 2 && <View style={styles.radioDot} />}
                </View>
                <View style={[styles.optionTag, { backgroundColor: '#F1F5F9' }]}>
                  <Text style={[styles.optionTagText, { color: '#475569' }]}>Trong nhà</Text>
                </View>
              </View>

              <Text style={styles.optionName}>Chuyển sang hoạt động trong nhà tại Đà Nẵng</Text>
              <Text style={styles.optionDesc}>
                Ghé Bảo tàng Điêu khắc Chăm & thưởng thức cà phê ngắm mưa sông Hàn.
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* DELAY OPTIONS */
          <View style={styles.optionsWrap}>
            <Text style={styles.optionsTitle}>Gợi ý xử lý trễ 60 phút:</Text>

            {/* Delay Opt 1 */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedDelayOption === 1 && styles.optionCardSelected,
              ]}
              onPress={() => setSelectedDelayOption(1)}
              activeOpacity={0.85}
            >
              <View style={styles.optionHeader}>
                <View style={styles.optionRadio}>
                  {selectedDelayOption === 1 && <View style={styles.radioDot} />}
                </View>
                <View style={styles.optionTag}>
                  <Text style={styles.optionTagText}>Tối ưu thời gian</Text>
                </View>
              </View>

              <Text style={styles.optionName}>Bỏ qua điểm Sơn Trà, đến thẳng Bãi biển Mỹ Khê</Text>
              <Text style={styles.optionDesc}>
                Tiết kiệm 8 km di chuyển. Bạn sẽ có trọn vẹn 3 giờ tắm biển thư thả và vẫn kịp giờ ăn tối 19h với nhóm.
              </Text>
            </TouchableOpacity>

            {/* Delay Opt 2 */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedDelayOption === 2 && styles.optionCardSelected,
              ]}
              onPress={() => setSelectedDelayOption(2)}
              activeOpacity={0.85}
            >
              <View style={styles.optionHeader}>
                <View style={styles.optionRadio}>
                  {selectedDelayOption === 2 && <View style={styles.radioDot} />}
                </View>
              </View>

              <Text style={styles.optionName}>Rút ngắn thời gian ở Sơn Trà xuống 45 phút</Text>
              <Text style={styles.optionDesc}>
                Vẫn ghé Chùa Linh Ứng chụp ảnh check-in nhanh, sau đó di chuyển ngay để không bị dồn lịch.
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={handleApply}
          activeOpacity={0.85}
        >
          <Sparkles size={18} color="#FFFFFF" />
          <Text style={styles.applyBtnText}>Áp dụng phương án này</Text>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabBtnActive: {
    backgroundColor: '#EFF3FF',
    borderColor: '#0A1680',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0A1680',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 30,
  },
  mascotBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 20,
    padding: 14,
  },
  mascotImg: {
    width: 54,
    height: 54,
  },
  mascotTextWrap: {
    flex: 1,
  },
  mascotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  mascotTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  mascotBody: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  optionsWrap: {
    gap: 12,
  },
  optionsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  optionCardSelected: {
    borderColor: '#0A1680',
    backgroundColor: '#FAFCFF',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0A1680',
  },
  optionTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  optionTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  optionName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  optionDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  planChangeBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 10,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  changeOld: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  changeNew: {
    fontSize: 11,
    color: '#0A1680',
    fontWeight: '700',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  applyBtn: {
    backgroundColor: '#0A1680',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
