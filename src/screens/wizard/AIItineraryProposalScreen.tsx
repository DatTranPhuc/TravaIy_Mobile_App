import React from 'react';
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
  Check,
  Pencil,
  BedDouble,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react-native';
import { LocalImages } from '../../assets/images';

interface Props {
  navigation: any;
}

export const AIItineraryProposalScreen: React.FC<Props> = ({ navigation }) => {
  const proposalDays = [
    {
      dayNumber: 1,
      date: '16/10',
      title: 'Khám phá bán đảo Sơn Trà & Biển Mỹ Khê',
      items: [
        { time: '08:00', name: 'Mì Quảng Bà Mua', category: 'Ăn uống · 45p' },
        { time: '09:30', name: 'Bán đảo Sơn Trà & Chùa Linh Ứng', category: 'Tham quan · 2h' },
        { time: '12:30', name: 'Cơm gà A Hải', category: 'Ăn uống · 1h' },
        { time: '15:30', name: 'Bãi biển Mỹ Khê', category: 'Nghỉ ngơi · 2.5h' },
        { time: '19:00', name: 'Hải sản Năm Đảnh & Cầu Rồng', category: 'Ăn uống · 2h' },
      ],
    },
    {
      dayNumber: 2,
      date: '17/10',
      title: 'Chinh phục Bà Nà Hills & Cầu Vàng',
      items: [
        { time: '08:00', name: 'Cáp treo Bà Nà Hills', category: 'Tham quan · 45p' },
        { time: '09:30', name: 'Cầu Vàng (Golden Bridge)', category: 'Check-in · 1.5h' },
        { time: '12:00', name: 'Buffet Làng Pháp', category: 'Ăn uống · 1.5h' },
      ],
    },
    {
      dayNumber: 3,
      date: '18/10',
      title: 'Phố cổ Hội An & Thả đèn hoa đăng',
      items: [
        { time: '09:00', name: 'Khởi hành đi Hội An', category: 'Di chuyển · 1h' },
        { time: '10:30', name: 'Cà phê Faifo view mái ngói', category: 'Cà phê · 1.5h' },
        { time: '18:00', name: 'Thuyền hoa đăng sông Hoài', category: 'Trải nghiệm · 1h' },
      ],
    },
  ];

  const handleApprove = () => {
    navigation.navigate('TripOverview');
  };

  const handleAdjust = () => {
    navigation.navigate('ItineraryEdit', { dayNumber: 1 });
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
          <Text style={styles.headerTitle}>Lịch trình đề xuất</Text>
          <Text style={styles.headerSub}>Xem lại trước khi thêm vào chuyến đi</Text>
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
          <Image
            source={LocalImages.lumiWave}
            style={styles.mascotImg}
            resizeMode="contain"
          />
          <View style={styles.mascotTextWrap}>
            <View style={styles.mascotHeader}>
              <Sparkles size={14} color="#D97706" />
              <Text style={styles.mascotTitle}>GỢI Ý TỪ BÉ SAO LUMI</Text>
            </View>
            <Text style={styles.mascotBody}>
              Mình đã tối ưu các điểm đến và thời gian di chuyển phù hợp nhất với sở thích và ngân sách của bạn!
            </Text>
          </View>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Image
            source={LocalImages.vietnamHero}
            style={styles.summaryCover}
            resizeMode="cover"
          />
          <View style={styles.summaryBody}>
            <Text style={styles.summaryEyebrow}>BẢN NHÁP CHUYẾN ĐI</Text>
            <Text style={styles.summaryTitle}>Đà Nẵng · 3 ngày 2 đêm</Text>
            <Text style={styles.summaryDates}>16/10 – 18/10/2026</Text>
            <Text style={styles.summaryCost}>11 hoạt động · ~2.500.000đ / người</Text>
          </View>
        </View>

        {/* Stay Card */}
        <View style={styles.stayCard}>
          <View style={styles.stayIconBg}>
            <BedDouble size={20} color="#0A1680" />
          </View>
          <View style={styles.stayTextWrap}>
            <Text style={styles.stayName}>Mây Biển Retreat</Text>
            <Text style={styles.stayDates}>Nhận phòng 14:00 (16/10) → Trả 12:00 (18/10)</Text>
            <Text style={styles.stayNote}>Lộ trình các ngày được tối ưu xuất phát từ đây</Text>
          </View>
        </View>

        {/* Daily Previews */}
        {proposalDays.map((d) => (
          <View key={d.dayNumber} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayBadge}>NGÀY {d.dayNumber} · {d.date}</Text>
              <Text style={styles.dayTitle}>{d.title}</Text>
            </View>

            <View style={styles.itemList}>
              {d.items.map((i, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <View style={styles.itemTimeTag}>
                    <Clock size={12} color="#0A1680" />
                    <Text style={styles.itemTimeText}>{i.time}</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{i.name}</Text>
                    <Text style={styles.itemCat}>{i.category}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.approveBtn}
          onPress={handleApprove}
          activeOpacity={0.85}
        >
          <Check size={18} color="#FFFFFF" />
          <Text style={styles.approveBtnText}>Dùng lịch trình này</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.adjustBtn}
          onPress={handleAdjust}
          activeOpacity={0.8}
        >
          <Pencil size={15} color="#0A1680" />
          <Text style={styles.adjustBtnText}>Lưu và chỉnh sửa lịch trình</Text>
          <ChevronRight size={16} color="#0A1680" />
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
    width: 52,
    height: 52,
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
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 0.8,
  },
  mascotBody: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryCover: {
    width: '100%',
    height: 140,
  },
  summaryBody: {
    padding: 16,
    gap: 4,
  },
  summaryEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: 1.2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  summaryDates: {
    fontSize: 12,
    color: '#64748B',
  },
  summaryCost: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
    marginTop: 4,
  },
  stayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  stayIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stayTextWrap: {
    flex: 1,
    gap: 2,
  },
  stayName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A1680',
  },
  stayDates: {
    fontSize: 11,
    color: '#475569',
  },
  stayNote: {
    fontSize: 10,
    color: '#64748B',
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  dayHeader: {
    gap: 4,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dayBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: 1,
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  itemList: {
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemTimeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: 72,
  },
  itemTimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  itemCat: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
    gap: 10,
  },
  approveBtn: {
    backgroundColor: '#0A1680',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  approveBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  adjustBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  adjustBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
});
