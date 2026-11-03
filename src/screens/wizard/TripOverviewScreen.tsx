import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { useTravel } from '../../features/travel/TravelContext';
import { LocalImages } from '../../assets/images';
import { resolveImageSource } from '../../theme/imageHelper';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Wallet,
  Users,
  Camera,
  Share2,
  Building,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  Compass,
} from 'lucide-react-native';

interface TripOverviewScreenProps {
  navigation: any;
}

export const TripOverviewScreen: React.FC<TripOverviewScreenProps> = ({ navigation }) => {
  const { plan } = useTravel();
  const [selectedDay, setSelectedDay] = useState(1);

  const currentDayData = plan.daysSchedule.find((d) => d.dayNumber === selectedDay) || plan.daysSchedule[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cover Hero Image */}
        <View style={styles.heroWrapper}>
          <Image source={resolveImageSource(plan.coverImage)} style={styles.heroImage} />
          <View style={styles.heroGradient} />

          {/* Top Bar inside Hero */}
          <SafeAreaView style={styles.heroTopBar}>
            <TouchableOpacity style={styles.heroNavBtn} onPress={() => navigation.navigate('MainTabs')}>
              <ArrowLeft size={22} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.heroNavTitle}>Tổng quan chuyến đi</Text>
            <TouchableOpacity style={styles.heroNavBtn}>
              <Share2 size={20} color={Colors.white} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Hero Bottom Info */}
          <View style={styles.heroBottomInfo}>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>Lịch trình AI tối ưu</Text>
            </View>
            <Text style={styles.heroTitle}>{plan.destination}</Text>
            <View style={styles.heroMetaRow}>
              <View style={styles.heroMetaItem}>
                <Calendar size={14} color={Colors.secondaryLight} />
                <Text style={styles.heroMetaText}>{plan.dates}</Text>
              </View>
              <Text style={styles.heroDot}>•</Text>
              <Text style={styles.heroMetaText}>{plan.days} ngày</Text>
              <Text style={styles.heroDot}>•</Text>
              <Text style={styles.heroMetaText}>{plan.estimatedCostPerPerson}</Text>
            </View>
          </View>
        </View>

        {/* Quick Tools */}
        <View style={styles.toolsRow}>
          <TouchableOpacity
            style={[styles.toolCard, { backgroundColor: '#EDE9FE' }]}
            onPress={() => navigation.navigate('TodaySchedule')}
          >
            <Clock size={22} color="#7C3AED" />
            <Text style={[styles.toolText, { color: '#7C3AED' }]}>Hôm nay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toolCard, { backgroundColor: '#EFF6FF' }]}
            onPress={() => navigation.navigate('DayItinerary', { dayNumber: selectedDay })}
          >
            <Compass size={22} color="#2563EB" />
            <Text style={[styles.toolText, { color: '#2563EB' }]}>Lịch trình</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toolCard, { backgroundColor: '#ECFDF5' }]}
            onPress={() => navigation.navigate('TripPreparation')}
          >
            <ShieldCheck size={22} color="#059669" />
            <Text style={[styles.toolText, { color: '#059669' }]}>Chuẩn bị</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toolCard, { backgroundColor: '#FFF1F2' }]}
            onPress={() => navigation.navigate('GroupSpace')}
          >
            <Users size={22} color="#E11D48" />
            <Text style={[styles.toolText, { color: '#E11D48' }]}>Nhóm đi</Text>
          </TouchableOpacity>
        </View>

        {/* Hotel / Stay Card */}
        <View style={styles.staySection}>
          <TouchableOpacity
            style={styles.stayCard}
            onPress={() => navigation.navigate('Stays')}
            activeOpacity={0.85}
          >
            <View style={styles.stayIconBox}>
              <Building size={24} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stayLabel}>ĐIỂM LƯU TRÚ</Text>
              <Text style={styles.stayTitle}>
                {plan.stayId ? 'Mây Biển Retreat' : 'Tìm & chọn khách sạn / homestay'}
              </Text>
              <Text style={styles.staySub}>
                {plan.stayId ? 'Đã chọn điểm nghỉ ngơi cho đoàn' : 'Gợi ý chỗ nghỉ gần các điểm tham quan'}
              </Text>
            </View>
            <ChevronRight size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Quick Wallets & Chat Links */}
        <View style={styles.secondaryLinks}>
          <TouchableOpacity
            style={styles.secLinkBtn}
            onPress={() => navigation.navigate('TravelWallet')}
            activeOpacity={0.85}
          >
            <CreditCard size={18} color={Colors.primary} />
            <Text style={styles.secLinkText}>Ví giấy tờ du lịch</Text>
            <ChevronRight size={16} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secLinkBtn}
            onPress={() => navigation.navigate('GroupChat')}
            activeOpacity={0.85}
          >
            <MessageCircle size={18} color="#7C3AED" />
            <Text style={styles.secLinkText}>Trò chuyện đoàn</Text>
            <ChevronRight size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Day Selector Tabs */}
        <View style={styles.dayTabsWrapper}>
          <Text style={styles.sectionTitle}>Lịch trình chi tiết</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayTabsList}>
            {plan.daysSchedule.map((day) => {
              const isSelected = day.dayNumber === selectedDay;
              return (
                <TouchableOpacity
                  key={day.dayNumber}
                  style={[styles.dayTab, isSelected && styles.selectedDayTab]}
                  onPress={() => setSelectedDay(day.dayNumber)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dayTabNumber, isSelected && styles.selectedDayTabNumber]}>
                    Ngày {day.dayNumber}
                  </Text>
                  <Text style={[styles.dayTabDate, isSelected && styles.selectedDayTabDate]}>
                    {day.dateText}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Current Day Schedule List */}
        {currentDayData && (
          <View style={styles.scheduleContainer}>
            <TouchableOpacity
              style={styles.dayInfoBanner}
              onPress={() => navigation.navigate('DayItinerary', { dayNumber: selectedDay })}
              activeOpacity={0.85}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.dayInfoTitle}>{currentDayData.title}</Text>
                <Text style={styles.dayInfoCost}>Dự kiến: {currentDayData.dayCost} · Xem chi tiết ›</Text>
              </View>
              <ChevronRight size={18} color={Colors.textSecondary} />
            </TouchableOpacity>

            <View style={styles.timelineList}>
              {currentDayData.items.map((item, idx) => {
                const isLast = idx === currentDayData.items.length - 1;
                return (
                  <View key={item.id} style={styles.timelineRow}>
                    {/* Time Column & Dot */}
                    <View style={styles.timelineLeft}>
                      <Text style={styles.itemTime}>{item.time}</Text>
                      <View style={styles.timelineLine}>
                        <View style={styles.timelineDot} />
                        {!isLast && <View style={styles.verticalBar} />}
                      </View>
                    </View>

                    {/* Activity Card */}
                    <TouchableOpacity
                      style={styles.activityCard}
                      onPress={() => navigation.navigate('DayItinerary', { dayNumber: selectedDay })}
                      activeOpacity={0.85}
                    >
                      {item.image && (
                        <Image source={resolveImageSource(item.image)} style={styles.activityThumb} />
                      )}
                      <View style={styles.activityBody}>
                        <View style={styles.categoryBadge}>
                          <Text style={styles.categoryBadgeText}>{item.category}</Text>
                        </View>
                        <Text style={styles.activityName}>{item.placeName}</Text>
                        <Text style={styles.activityNote} numberOfLines={2}>
                          {item.note}
                        </Text>
                        <View style={styles.activityMetaRow}>
                          <View style={styles.metaWithIcon}>
                            <Clock size={12} color={Colors.textSecondary} />
                            <Text style={styles.metaSmallText}>{item.duration}</Text>
                          </View>
                          <Text style={styles.costBadge}>{item.cost}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Bé Sao Lumi Mascot Tip Box */}
        <View style={styles.mascotOverviewTip}>
          <Image
            source={LocalImages.mascotCool}
            style={styles.mascotOverviewImg}
            resizeMode="contain"
          />
          <View style={styles.mascotOverviewTextWrap}>
            <Text style={styles.mascotOverviewTitle}>LỜI NHẮC TỪ BÉ SAO LUMI ✨</Text>
            <Text style={styles.mascotOverviewDesc}>
              Lịch trình đã được tối ưu theo thời gian và vị trí thực tế. Chúc bạn có một chuyến đi tuyệt vời tại {plan.destination}!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('MainTabs')}
          activeOpacity={0.85}
        >
          <Text style={styles.homeBtnText}>Quay về Trang chủ</Text>
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
  scrollContent: {
    paddingBottom: 100,
  },
  heroWrapper: {
    height: 300,
    position: 'relative',
    justifyContent: 'space-between',
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(7, 15, 90, 0.65)',
  },
  heroTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 10,
  },
  heroNavBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroNavTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  heroBottomInfo: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    zIndex: 10,
  },
  aiBadge: {
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 8,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroMetaText: {
    fontSize: 13,
    color: Colors.white,
    fontWeight: '600',
  },
  heroDot: {
    color: Colors.white,
    opacity: 0.6,
  },
  toolsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  toolCard: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  toolText: {
    fontSize: 13,
    fontWeight: '700',
  },
  staySection: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  stayCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stayIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stayLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  stayTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  staySub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  secondaryLinks: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 10,
  },
  secLinkBtn: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secLinkText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  dayTabsWrapper: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 14,
  },
  dayTabsList: {
    gap: 10,
  },
  dayTab: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  selectedDayTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayTabNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  selectedDayTabNumber: {
    color: Colors.white,
  },
  dayTabDate: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  selectedDayTabDate: {
    color: Colors.secondaryLight,
  },
  scheduleContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  dayInfoBanner: {
    backgroundColor: Colors.primaryLight,
    padding: 14,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D8E2FD',
  },
  dayInfoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  dayInfoCost: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  timelineList: {
    gap: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 48,
  },
  itemTime: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 8,
  },
  timelineLine: {
    flex: 1,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  verticalBar: {
    flex: 1,
    width: 2,
    backgroundColor: '#CBD5E1',
    marginTop: 4,
  },
  activityCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  activityThumb: {
    width: '100%',
    height: 120,
  },
  activityBody: {
    padding: 14,
  },
  categoryBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  activityNote: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginBottom: 10,
  },
  activityMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaSmallText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  costBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
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
  homeBtn: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
  },
  homeBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  mascotOverviewTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#F1B94C',
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    gap: 12,
  },
  mascotOverviewImg: {
    width: 52,
    height: 52,
  },
  mascotOverviewTextWrap: {
    flex: 1,
  },
  mascotOverviewTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  mascotOverviewDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
    marginTop: 3,
  },
});
