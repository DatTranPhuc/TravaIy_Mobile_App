import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {
  ChevronLeft,
  Pencil,
  Clock,
  MapPin,
  Utensils,
  Coffee,
  Camera,
  BedDouble,
  Navigation,
  Plus,
  Check,
  X,
} from 'lucide-react-native';
import { LocalImages } from '../assets/images';

interface Props {
  navigation: any;
}

interface ActivityItem {
  id: string;
  time: string;
  name: string;
  category: string;
  duration: string;
  locked?: boolean;
  cost?: string;
  note?: string;
  image: any;
}

export const DayItineraryScreen: React.FC<Props> = ({ navigation }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<ActivityItem | null>(null);

  const days = [
    { dayNumber: 1, dateText: '16/10', title: 'Khám phá bán đảo Sơn Trà & Biển Mỹ Khê', cost: '850.000đ' },
    { dayNumber: 2, dateText: '17/10', title: 'Chinh phục Bà Nà Hills & Cầu Vàng', cost: '1.250.000đ' },
    { dayNumber: 3, dateText: '18/10', title: 'Phố cổ Hội An & Thả đèn hoa đăng', cost: '650.000đ' },
  ];

  const activities: Record<number, ActivityItem[]> = {
    1: [
      {
        id: 'act-1',
        time: '08:00',
        name: 'Mì Quảng Bà Mua',
        category: 'Ăn uống',
        duration: '45 phút',
        cost: '55.000đ',
        note: 'Đặc sản mì quảng tôm thịt đậm đà, nước dùng ngọt thanh',
        image: LocalImages.food,
      },
      {
        id: 'act-2',
        time: '09:30',
        name: 'Bán đảo Sơn Trà & Chùa Linh Ứng',
        category: 'Tham quan',
        duration: '2 giờ',
        locked: true,
        cost: 'Miễn phí',
        note: 'Tượng Phật Bà Quan Âm cao nhất Việt Nam, nhìn trọn vịnh Đà Nẵng',
        image: LocalImages.bridge,
      },
      {
        id: 'act-3',
        time: '12:30',
        name: 'Cơm gà A Hải',
        category: 'Ăn uống',
        duration: '1 giờ',
        cost: '70.000đ',
        note: 'Cơm gà xối mỡ giòn rụm nổi tiếng Đà Nẵng',
        image: LocalImages.food,
      },
      {
        id: 'act-4',
        time: '15:30',
        name: 'Bãi biển Mỹ Khê',
        category: 'Nghỉ ngơi',
        duration: '2.5 giờ',
        cost: 'Miễn phí',
        note: 'Tắm biển, lướt ván và ngắm hoàng hôn lãng mạn',
        image: LocalImages.beach,
      },
      {
        id: 'act-5',
        time: '19:00',
        name: 'Hải sản Năm Đảnh & Cầu Rồng',
        category: 'Ăn uống',
        duration: '2 giờ',
        cost: '250.000đ',
        note: 'Thưởng thức hải sản tươi sống và xem Cầu Rồng phun lửa lúc 21h',
        image: LocalImages.food,
      },
    ],
    2: [
      {
        id: 'act-2-1',
        time: '08:00',
        name: 'Cáp treo Bà Nà Hills',
        category: 'Tham quan',
        duration: '45 phút',
        cost: '850.000đ',
        note: 'Tuyến cáp treo đạt nhiều kỷ lục thế giới',
        image: LocalImages.bridge,
      },
      {
        id: 'act-2-2',
        time: '09:30',
        name: 'Cầu Vàng (Golden Bridge)',
        category: 'Check-in',
        duration: '1.5 giờ',
        locked: true,
        cost: 'Đã bao gồm',
        note: 'Biểu tượng kiến trúc thế giới vắt qua mây ngàn',
        image: LocalImages.bridge,
      },
      {
        id: 'act-2-3',
        time: '12:00',
        name: 'Buffet Làng Pháp',
        category: 'Ăn uống',
        duration: '1.5 giờ',
        cost: 'Đã bao gồm',
        note: 'Thưởng thức ẩm thực Á - Âu tại đỉnh Bà Nà',
        image: LocalImages.food,
      },
    ],
    3: [
      {
        id: 'act-3-1',
        time: '09:00',
        name: 'Khởi hành đi Phố Cổ Hội An',
        category: 'Di chuyển',
        duration: '1 giờ',
        cost: '100.000đ',
        note: 'Di chuyển bằng xe taxi dọc đường ven biển',
        image: LocalImages.town,
      },
      {
        id: 'act-3-2',
        time: '10:30',
        name: 'Tiệm cà phê Faifo view mái ngói',
        category: 'Cà phê',
        duration: '1.5 giờ',
        cost: '60.000đ',
        note: 'Ngắm nhìn toàn cảnh phố cổ từ sân thượng',
        image: LocalImages.town,
      },
      {
        id: 'act-3-3',
        time: '18:00',
        name: 'Thuyền hoa đăng sông Hoài',
        category: 'Trải nghiệm',
        duration: '1 giờ',
        locked: true,
        cost: '100.000đ',
        note: 'Thả hoa đăng ước nguyện và ngắm phố lồng đèn rực rỡ',
        image: LocalImages.town,
      },
    ],
  };

  const currentDayData = days.find((d) => d.dayNumber === activeDay) || days[0];
  const currentActivities = activities[activeDay] || [];

  const toggleComplete = (id: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          <Text style={styles.headerTitle}>Lịch trình từng ngày</Text>
          <Text style={styles.headerSub}>Đà Nẵng · 3 ngày</Text>
        </View>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('ItineraryEdit', { dayNumber: activeDay })}
          activeOpacity={0.8}
        >
          <Pencil size={18} color="#0A1680" />
        </TouchableOpacity>
      </View>

      {/* Days Rail */}
      <View style={styles.daysRailContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRail}
        >
          {days.map((d) => {
            const isActive = d.dayNumber === activeDay;
            return (
              <TouchableOpacity
                key={d.dayNumber}
                style={[styles.dayTab, isActive && styles.dayTabActive]}
                onPress={() => setActiveDay(d.dayNumber)}
                activeOpacity={0.85}
              >
                <View style={[styles.dayTabDot, isActive && styles.dayTabDotActive]} />
                <Text style={[styles.dayTabText, isActive && styles.dayTabTextActive]}>
                  Ngày {d.dayNumber}
                </Text>
                <Text style={[styles.dayTabDate, isActive && styles.dayTabDateActive]}>
                  {d.dateText}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Title Summary */}
        <View style={styles.daySummaryCard}>
          <View>
            <Text style={styles.dayNumberLabel}>NGÀY {currentDayData.dayNumber}</Text>
            <Text style={styles.dayTitleText}>{currentDayData.title}</Text>
          </View>
          <View style={styles.costBadge}>
            <Text style={styles.costBadgeText}>Dự chi {currentDayData.cost}</Text>
          </View>
        </View>

        {/* Accommodation Anchor */}
        <TouchableOpacity
          style={styles.stayAnchor}
          onPress={() => navigation.navigate('StayDetail', { stayId: 'may-bien' })}
          activeOpacity={0.85}
        >
          <View style={styles.stayAnchorIconBg}>
            <BedDouble size={18} color="#0A1680" />
          </View>
          <View style={styles.stayAnchorTextWrap}>
            <Text style={styles.stayAnchorLabel}>Chỗ nghỉ xuất phát</Text>
            <Text style={styles.stayAnchorName}>Mây Biển Retreat · Bãi biển Mỹ Khê</Text>
          </View>
          <ChevronLeft size={16} color="#94A3B8" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>

        {/* Timeline Activities */}
        <View style={styles.timelineList}>
          {currentActivities.map((act, index) => {
            const isDone = !!completedItems[act.id];
            return (
              <View key={act.id} style={styles.timelineItemWrap}>
                <View style={styles.timelineTrack}>
                  <View style={[styles.timelineNode, isDone && styles.timelineNodeDone]} />
                  {index < currentActivities.length - 1 && <View style={styles.timelineLine} />}
                </View>

                <View style={styles.timelineCardWrap}>
                  <TouchableOpacity
                    style={[styles.activityCard, isDone && styles.activityCardDone]}
                    onPress={() => setSelectedItem(act)}
                    activeOpacity={0.85}
                  >
                    <Image source={act.image} style={styles.activityImg} resizeMode="cover" />
                    <View style={styles.activityBody}>
                      <View style={styles.activityTopRow}>
                        <View style={styles.timeTag}>
                          <Clock size={12} color="#0A1680" />
                          <Text style={styles.timeTagText}>{act.time}</Text>
                        </View>
                        {act.locked && (
                          <View style={styles.lockedBadge}>
                            <Text style={styles.lockedBadgeText}>Giữ giờ</Text>
                          </View>
                        )}
                      </View>

                      <Text style={styles.activityName} numberOfLines={1}>
                        {act.name}
                      </Text>
                      <Text style={styles.activityMeta}>
                        {act.category} · {act.duration}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Completion Checkbox */}
                  <TouchableOpacity
                    style={styles.checkDoneRow}
                    onPress={() => toggleComplete(act.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.checkbox, isDone && styles.checkboxActive]}>
                      {isDone && <Check size={12} color="#FFFFFF" />}
                    </View>
                    <Text style={[styles.checkDoneText, isDone && styles.checkDoneTextActive]}>
                      {isDone ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Add Activity Button */}
        <TouchableOpacity
          style={styles.addActBtn}
          onPress={() => navigation.navigate('ItineraryEdit', { dayNumber: activeDay })}
          activeOpacity={0.85}
        >
          <Plus size={18} color="#0A1680" />
          <Text style={styles.addActBtnText}>Thêm hoặc chỉnh sửa hoạt động</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Activity Details Modal */}
      <Modal
        visible={!!selectedItem}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {selectedItem && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                  <TouchableOpacity onPress={() => setSelectedItem(null)}>
                    <X size={20} color="#64748B" />
                  </TouchableOpacity>
                </View>

                <Image
                  source={selectedItem.image}
                  style={styles.modalImg}
                  resizeMode="cover"
                />

                <View style={styles.modalDetailsRow}>
                  <View style={styles.modalBadge}>
                    <Clock size={14} color="#0A1680" />
                    <Text style={styles.modalBadgeText}>{selectedItem.time}</Text>
                  </View>
                  <View style={styles.modalBadge}>
                    <Text style={styles.modalBadgeText}>Chi phí: {selectedItem.cost}</Text>
                  </View>
                </View>

                <Text style={styles.modalNote}>{selectedItem.note}</Text>

                <View style={styles.modalActionButtons}>
                  <TouchableOpacity
                    style={styles.modalNavBtn}
                    onPress={() => {
                      setSelectedItem(null);
                      navigation.navigate('Photobooth');
                    }}
                  >
                    <Camera size={16} color="#FFFFFF" />
                    <Text style={styles.modalNavBtnText}>Chụp ảnh check-in</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalDirectBtn}
                    onPress={() => {
                      setSelectedItem(null);
                      navigation.navigate('MapView');
                    }}
                  >
                    <Navigation size={16} color="#0A1680" />
                    <Text style={styles.modalDirectBtnText}>Chỉ đường</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
  editBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysRailContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  daysRail: {
    paddingHorizontal: 16,
    gap: 10,
  },
  dayTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dayTabActive: {
    backgroundColor: '#0A1680',
    borderColor: '#0A1680',
  },
  dayTabDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
    marginBottom: 4,
  },
  dayTabDotActive: {
    backgroundColor: '#F1B94C',
  },
  dayTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  dayTabTextActive: {
    color: '#FFFFFF',
  },
  dayTabDate: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  dayTabDateActive: {
    color: '#E0E7FF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  daySummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dayNumberLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  dayTitleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    maxWidth: 220,
    lineHeight: 20,
  },
  costBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  costBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  stayAnchor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 18,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  stayAnchorIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stayAnchorTextWrap: {
    flex: 1,
  },
  stayAnchorLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  stayAnchorName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
    marginTop: 2,
  },
  timelineList: {
    gap: 14,
    marginTop: 4,
  },
  timelineItemWrap: {
    flexDirection: 'row',
    gap: 14,
  },
  timelineTrack: {
    alignItems: 'center',
    width: 20,
  },
  timelineNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0A1680',
    marginTop: 18,
  },
  timelineNodeDone: {
    backgroundColor: '#10B981',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  timelineCardWrap: {
    flex: 1,
    gap: 6,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  activityCardDone: {
    opacity: 0.7,
    backgroundColor: '#F8FAFC',
  },
  activityImg: {
    width: 70,
    height: 70,
    borderRadius: 14,
  },
  activityBody: {
    flex: 1,
    justifyContent: 'center',
  },
  activityTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeTagText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A1680',
  },
  lockedBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  lockedBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  activityName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  activityMeta: {
    fontSize: 11,
    color: '#64748B',
  },
  checkDoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 4,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkDoneText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  checkDoneTextActive: {
    color: '#10B981',
    fontWeight: '700',
  },
  addActBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0A1680',
    borderStyle: 'dashed',
    borderRadius: 18,
    paddingVertical: 14,
    marginTop: 8,
  },
  addActBtnText: {
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
    fontSize: 18,
    fontWeight: '800',
    color: '#0A1680',
  },
  modalImg: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  modalDetailsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  modalBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
  modalNote: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  modalActionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  modalNavBtn: {
    flex: 1,
    backgroundColor: '#0A1680',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 16,
  },
  modalNavBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalDirectBtn: {
    flex: 1,
    backgroundColor: '#EFF3FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 16,
  },
  modalDirectBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
  },
});
