import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {
  MapPin,
  Clock,
  Sun,
  AlertTriangle,
  CheckCircle,
  Navigation,
  ChevronRight,
  Bell,
  X,
  Users,
  Compass,
  Sparkles,
} from 'lucide-react-native';
import { LocalImages } from '../assets/images';

interface Props {
  navigation: any;
}

export const TodayScheduleScreen: React.FC<Props> = ({ navigation }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showDelayBanner, setShowDelayBanner] = useState(true);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setShowDelayBanner(false);
    Alert.alert('Thành công', 'Đã đánh dấu đã đến Bán đảo Sơn Trà!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.locationSelector}
          onPress={() => navigation.navigate('TripOverview')}
          activeOpacity={0.8}
        >
          <View style={styles.locIconWrap}>
            <MapPin size={18} color="#0A1680" />
          </View>
          <View>
            <View style={styles.locRow}>
              <Text style={styles.locCity}>Đà Nẵng</Text>
              <Text style={styles.locArrow}>▾</Text>
            </View>
            <Text style={styles.locSub}>Lịch trình hôm nay · Ngày 2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => Alert.alert('Thông báo', 'Bạn có 1 thông báo mới về lịch trình')}
          activeOpacity={0.8}
        >
          <Bell size={20} color="#454652" />
          <View style={styles.bellBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Compact Weather Bar */}
        <TouchableOpacity
          style={styles.weatherBar}
          onPress={() => setShowWeatherModal(true)}
          activeOpacity={0.85}
        >
          <View style={styles.weatherLeft}>
            <View style={styles.weatherIconBg}>
              <Sun size={20} color="#D97706" />
            </View>
            <Text style={styles.weatherTemp}>28°C</Text>
            <Text style={styles.weatherDesc}>Nắng nhẹ · Chiều tối có mưa rào</Text>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* Adaptive Delay Warning Banner */}
        {showDelayBanner && (
          <View style={styles.delayBanner}>
            <View style={styles.delayLeft}>
              <View style={styles.delayIconBg}>
                <Clock size={18} color="#B45309" />
              </View>
              <View style={styles.delayInfo}>
                <View style={styles.delayBadgeRow}>
                  <View style={styles.delayBadge}>
                    <Text style={styles.delayBadgeText}>Đã trễ 60 phút</Text>
                  </View>
                  <Text style={styles.delayTimeText}>Lịch 09:30 • Hiện tại 10:30</Text>
                </View>
                <Text style={styles.delayHeadline}>Bạn vẫn muốn đến Sơn Trà chứ?</Text>
              </View>
            </View>

            <View style={styles.delayActions}>
              <TouchableOpacity
                style={styles.delayActionBtn}
                onPress={() => setShowDelayModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.delayActionText}>Tùy chọn ›</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.delayCloseBtn}
                onPress={() => setShowDelayBanner(false)}
                activeOpacity={0.7}
              >
                <X size={15} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Hero Current Stop Card */}
        <View style={styles.heroStopCard}>
          <Image
            source={LocalImages.bridge}
            style={styles.heroStopImg}
            resizeMode="cover"
          />
          <View style={styles.heroStopScrim} />

          <View style={styles.heroStopBadges}>
            <View style={[styles.statusBadge, isCheckedIn && styles.statusBadgeDone]}>
              <Text style={styles.statusBadgeText}>
                {isCheckedIn ? '✓ Đã đến nơi' : 'Điểm hiện tại'}
              </Text>
            </View>
            <View style={styles.sampleBadge}>
              <Text style={styles.sampleBadgeText}>Lịch mẫu</Text>
            </View>
          </View>

          <View style={styles.heroStopInfo}>
            <Text style={styles.heroStopTitle}>Bán đảo Sơn Trà & Chùa Linh Ứng</Text>
            <Text style={styles.heroStopDistance}>Khoảng 8 km · 20 phút di chuyển</Text>

            <View style={styles.heroStopBtns}>
              <TouchableOpacity
                style={[styles.checkInBtn, isCheckedIn && styles.checkInBtnDone]}
                onPress={handleCheckIn}
                activeOpacity={0.85}
              >
                <CheckCircle size={16} color={isCheckedIn ? '#059669' : '#0A1680'} />
                <Text style={[styles.checkInBtnText, isCheckedIn && styles.checkInBtnTextDone]}>
                  {isCheckedIn ? 'Đã check-in' : 'Đánh dấu đến nơi'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.directBtn}
                onPress={() => navigation.navigate('MapView')}
                activeOpacity={0.85}
              >
                <Navigation size={15} color="#FFFFFF" />
                <Text style={styles.directBtnText}>Chỉ đường</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Mascot Tip Banner */}
        <View style={styles.mascotTip}>
          <Image
            source={LocalImages.lumiWave}
            style={styles.mascotImg}
            resizeMode="contain"
          />
          <View style={styles.mascotTextWrap}>
            <View style={styles.mascotHeader}>
              <Sparkles size={14} color="#D97706" />
              <Text style={styles.mascotTitle}>Gợi ý từ Bé Sao Lumi</Text>
            </View>
            <Text style={styles.mascotBody}>
              Nắng buổi trưa ở Sơn Trà khá gắt. Nếu cảm thấy mệt, bạn có thể dời sang bãi biển Mỹ Khê nghỉ ngơi trước nhé!
            </Text>
          </View>
        </View>

        {/* Upcoming Stops Today */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Clock size={16} color="#0A1680" />
            <Text style={styles.sectionTitle}>Điểm tiếp theo hôm nay</Text>
          </View>
          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>2 chặng</Text>
          </View>
        </View>

        {/* Stop 1 */}
        <TouchableOpacity
          style={styles.stopCard}
          onPress={() => navigation.navigate('PlaceDetail', { placeId: 'tiem-tu-lung' })}
          activeOpacity={0.85}
        >
          <Image
            source={LocalImages.beach}
            style={styles.stopThumb}
            resizeMode="cover"
          />
          <View style={styles.stopContent}>
            <View style={styles.stopTimeRow}>
              <Text style={styles.stopTime}>15:00</Text>
              <View style={styles.catBadge}>
                <Text style={styles.catBadgeText}>Nghỉ ngơi</Text>
              </View>
            </View>
            <Text style={styles.stopName}>Bãi biển Mỹ Khê</Text>
            <Text style={styles.stopSub}>Tắm biển, dạo bờ cát & ngắm hoàng hôn</Text>
          </View>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>

        {/* Stop 2 */}
        <TouchableOpacity
          style={styles.stopCard}
          onPress={() => navigation.navigate('GroupSpace')}
          activeOpacity={0.85}
        >
          <Image
            source={LocalImages.food}
            style={styles.stopThumb}
            resizeMode="cover"
          />
          <View style={styles.stopContent}>
            <View style={styles.stopTimeRow}>
              <Text style={styles.stopTime}>19:00</Text>
              <View style={[styles.catBadge, { backgroundColor: '#FEF3C7' }]}>
                <Text style={[styles.catBadgeText, { color: '#B45309' }]}>Cả nhóm</Text>
              </View>
            </View>
            <Text style={styles.stopName}>Ăn tối cùng nhóm</Text>
            <Text style={styles.stopSub}>Hải sản Năm Đảnh & ngắm Cầu Rồng phun lửa</Text>
          </View>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>

        {/* Toggle Full Schedule Accordion */}
        <TouchableOpacity
          style={styles.toggleScheduleBtn}
          onPress={() => setShowFullSchedule(!showFullSchedule)}
          activeOpacity={0.8}
        >
          <Text style={styles.toggleScheduleText}>
            {showFullSchedule ? 'Thu gọn lịch trình' : 'Xem toàn bộ lịch trình ngày 2 (5 điểm)'}
          </Text>
          <Text style={styles.toggleScheduleArrow}>{showFullSchedule ? '▴' : '▾'}</Text>
        </TouchableOpacity>

        {showFullSchedule && (
          <View style={styles.fullScheduleList}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDotDone} />
              <View style={styles.timelineBody}>
                <Text style={styles.timelineTime}>08:00 · Đã qua</Text>
                <Text style={styles.timelineTitle}>Ăn sáng mì Quảng Bà Mua</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDotActive} />
              <View style={styles.timelineBody}>
                <Text style={styles.timelineTime}>09:30 · Đang diễn ra</Text>
                <Text style={styles.timelineTitle}>Bán đảo Sơn Trà & Chùa Linh Ứng</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineBody}>
                <Text style={styles.timelineTime}>12:30</Text>
                <Text style={styles.timelineTitle}>Ăn trưa cơm gà A Hải</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineBody}>
                <Text style={styles.timelineTime}>15:00</Text>
                <Text style={styles.timelineTitle}>Bãi biển Mỹ Khê</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineBody}>
                <Text style={styles.timelineTime}>19:00</Text>
                <Text style={styles.timelineTitle}>Hải sản Năm Đảnh & Cầu Rồng</Text>
              </View>
            </View>
          </View>
        )}

        {/* Quick Nav Tools */}
        <View style={styles.toolsRow}>
          <TouchableOpacity
            style={styles.toolBtn}
            onPress={() => navigation.navigate('MapView')}
            activeOpacity={0.85}
          >
            <Compass size={20} color="#0A1680" />
            <Text style={styles.toolBtnText}>Bản đồ lộ trình</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toolBtn}
            onPress={() => navigation.navigate('GroupSpace')}
            activeOpacity={0.85}
          >
            <Users size={20} color="#0A1680" />
            <Text style={styles.toolBtnText}>Không gian nhóm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Delay Options Modal */}
      <Modal
        visible={showDelayModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDelayModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Lựa chọn xử lý trễ giờ</Text>
              <TouchableOpacity onPress={() => setShowDelayModal(false)}>
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDesc}>
              Bé Sao Lumi nhận thấy bạn đã trễ 60 phút so với lịch ban đầu. Hãy chọn cách điều chỉnh phù hợp:
            </Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setShowDelayModal(false);
                setShowDelayBanner(false);
                Alert.alert('Đã cập nhật', 'Đã lùi toàn bộ lịch trình 60 phút!');
              }}
            >
              <Text style={styles.optionTitle}>1. Lùi lịch trình thêm 60 phút</Text>
              <Text style={styles.optionSub}>Giữ nguyên Sơn Trà, dời điểm tiếp theo sang 16:00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setShowDelayModal(false);
                setShowDelayBanner(false);
                Alert.alert('Đã bỏ qua', 'Đã bỏ qua Sơn Trà, chuyển thẳng đến Bãi biển Mỹ Khê!');
              }}
            >
              <Text style={styles.optionTitle}>2. Bỏ qua điểm này</Text>
              <Text style={styles.optionSub}>Đi thẳng đến Bãi biển Mỹ Khê nghỉ ngơi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, styles.modalOptionAI]}
              onPress={() => {
                setShowDelayModal(false);
                navigation.navigate('AdaptiveSchedule');
              }}
            >
              <Text style={[styles.optionTitle, { color: '#0A1680' }]}>✨ 3. Để AI tối ưu lại lịch trình</Text>
              <Text style={styles.optionSub}>Tự động tính toán lại thời gian và tuyến đường thông minh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Weather Modal */}
      <Modal
        visible={showWeatherModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWeatherModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Dự báo thời tiết Đà Nẵng</Text>
              <TouchableOpacity onPress={() => setShowWeatherModal(false)}>
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.weatherForecastList}>
              <View style={styles.forecastItem}>
                <Text style={styles.forecastTime}>Sáng 09:00</Text>
                <Text style={styles.forecastIcon}>☀️</Text>
                <Text style={styles.forecastTemp}>28°C · Nắng nhẹ</Text>
              </View>
              <View style={styles.forecastItem}>
                <Text style={styles.forecastTime}>Trưa 12:00</Text>
                <Text style={styles.forecastIcon}>⛅</Text>
                <Text style={styles.forecastTemp}>31°C · Nhiều mây</Text>
              </View>
              <View style={styles.forecastItem}>
                <Text style={styles.forecastTime}>Chiều 16:00</Text>
                <Text style={styles.forecastIcon}>🌧️</Text>
                <Text style={styles.forecastTemp}>26°C · Mưa rào nhẹ</Text>
              </View>
              <View style={styles.forecastItem}>
                <Text style={styles.forecastTime}>Tối 20:00</Text>
                <Text style={styles.forecastIcon}>✨</Text>
                <Text style={styles.forecastTemp}>25°C · Mát mẻ</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setShowWeatherModal(false)}
            >
              <Text style={styles.closeModalBtnText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locCity: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0A1680',
  },
  locArrow: {
    fontSize: 14,
    color: '#64748B',
  },
  locSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  weatherBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  weatherLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weatherIconBg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherTemp: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0A1680',
  },
  weatherDesc: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  delayBanner: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  delayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  delayIconBg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delayInfo: {
    flex: 1,
  },
  delayBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  delayBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  delayBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#DC2626',
  },
  delayTimeText: {
    fontSize: 10,
    color: '#64748B',
  },
  delayHeadline: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  delayActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  delayActionBtn: {
    backgroundColor: '#0A1680',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  delayActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  delayCloseBtn: {
    padding: 4,
  },
  heroStopCard: {
    height: 240,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
    padding: 16,
  },
  heroStopImg: {
    ...StyleSheet.absoluteFillObject,
  },
  heroStopScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 25, 56, 0.65)',
  },
  heroStopBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeDone: {
    backgroundColor: '#10B981',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sampleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
  },
  sampleBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  heroStopInfo: {
    gap: 6,
  },
  heroStopTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroStopDistance: {
    fontSize: 12,
    color: '#E2E8F0',
  },
  heroStopBtns: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  checkInBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 16,
  },
  checkInBtnDone: {
    backgroundColor: '#ECFDF5',
  },
  checkInBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
  checkInBtnTextDone: {
    color: '#059669',
  },
  directBtn: {
    backgroundColor: '#0A1680',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 16,
  },
  directBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  mascotTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mascotImg: {
    width: 50,
    height: 50,
  },
  mascotTextWrap: {
    flex: 1,
  },
  mascotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  tagPill: {
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
  },
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  stopThumb: {
    width: 64,
    height: 64,
    borderRadius: 14,
  },
  stopContent: {
    flex: 1,
  },
  stopTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stopTime: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
  catBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  catBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
  },
  stopName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  stopSub: {
    fontSize: 11,
    color: '#64748B',
  },
  toggleScheduleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    paddingVertical: 12,
  },
  toggleScheduleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  toggleScheduleArrow: {
    fontSize: 14,
    color: '#475569',
  },
  fullScheduleList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  timelineDotDone: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    marginTop: 4,
  },
  timelineDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0A1680',
    marginTop: 4,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#CBD5E1',
    marginTop: 4,
  },
  timelineBody: {
    flex: 1,
  },
  timelineTime: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 1,
  },
  toolsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  toolBtn: {
    flex: 1,
    backgroundColor: '#EFF3FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 18,
  },
  toolBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0A1680',
  },
  modalDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  modalOption: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalOptionAI: {
    backgroundColor: '#EFF3FF',
    borderColor: '#93B2F8',
  },
  optionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  optionSub: {
    fontSize: 11,
    color: '#64748B',
  },
  weatherForecastList: {
    gap: 10,
    marginVertical: 10,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  forecastTime: {
    fontSize: 12,
    color: '#64748B',
    width: 80,
  },
  forecastIcon: {
    fontSize: 18,
  },
  forecastTemp: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A1680',
  },
  closeModalBtn: {
    backgroundColor: '#0A1680',
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 6,
  },
  closeModalBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
