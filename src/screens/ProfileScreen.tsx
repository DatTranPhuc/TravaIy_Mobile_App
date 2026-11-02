import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import { Colors } from '../theme/colors';
import { useTravel } from '../features/travel/TravelContext';
import { LocalImages } from '../assets/images';
import {
  User,
  Compass,
  Check,
  MapPin,
  ChevronRight,
  Globe,
  Bookmark,
  Bell,
  LogOut,
  Sparkles,
} from 'lucide-react-native';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { userName, preferences, plan, trips } = useTravel();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>
                {userName ? userName.charAt(0).toUpperCase() : 'N'}
              </Text>
            </View>
            <View style={styles.starBadge}>
              <Text style={styles.starText}>★</Text>
            </View>
          </View>

          <Text style={styles.userName}>{userName || 'Hoàng Nam'}</Text>
          <Text style={styles.userBadge}>
            Thành viên khám phá cao cấp • Gen Z Explorer
          </Text>

          {/* Stats 4 Columns */}
          <View style={styles.statsRow}>
            <TouchableOpacity
              style={styles.statCol}
              onPress={() => navigation.navigate('Trips')}
            >
              <Text style={styles.statNumber}>{trips.length || 1}</Text>
              <Text style={styles.statLabel}>Chuyến đi</Text>
            </TouchableOpacity>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <Text style={styles.statNumber}>32</Text>
              <Text style={styles.statLabel}>Đã lưu</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Bộ sưu tập</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Đánh giá</Text>
            </View>
          </View>
        </View>

        {/* Travel DNA Card */}
        <View style={styles.dnaCard}>
          <View style={styles.dnaHeader}>
            <View style={styles.dnaTitleRow}>
              <Compass size={18} color="#0A1680" />
              <Text style={styles.dnaTitle}>DNA Du lịch cá nhân</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.dnaEditBtn}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dnaPillsRow}>
            <View style={styles.dnaMainPill}>
              <Text style={styles.dnaMainPillText}>
                {preferences.travelStyle || 'Thong thả & Thư giãn'}
              </Text>
            </View>
            <Text style={styles.dnaTimeText}>
              {preferences.timeOfDay.join(' · ') || 'Buổi sáng · Buổi tối'}
            </Text>
          </View>

          <View style={styles.dnaTagsRow}>
            {(preferences.interests.length > 0
              ? preferences.interests
              : ['Cà phê & Ẩm thực', 'Biển đảo', 'Chụp ảnh']
            ).map((interest: string) => (
              <View key={interest} style={styles.dnaTag}>
                <Text style={styles.dnaTagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Past Trips / Chuyến mẫu */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Những chuyến đã đi</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Trips')}>
              <Text style={styles.sectionLink}>Chuyến đi của tôi ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pastTripsGrid}>
            <View style={styles.pastTripCard}>
              <Image source={LocalImages.dalatCabin} style={styles.pastTripImg} />
              <View style={styles.pastTripTag}>
                <Text style={styles.pastTripTagText}>Chuyến mẫu</Text>
              </View>
              <View style={styles.pastTripInfo}>
                <Text style={styles.pastTripName}>Đà Lạt</Text>
                <Text style={styles.pastTripLength}>3 ngày 2 đêm</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('JournalAlbum')}
                  style={styles.pastTripAction}
                >
                  <Text style={styles.pastTripActionText}>Xem kỷ niệm ›</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.pastTripCard}>
              <Image source={LocalImages.resort} style={styles.pastTripImg} />
              <View style={styles.pastTripTag}>
                <Text style={styles.pastTripTagText}>Chuyến mẫu</Text>
              </View>
              <View style={styles.pastTripInfo}>
                <Text style={styles.pastTripName}>Phú Quốc</Text>
                <Text style={styles.pastTripLength}>4 ngày 3 đêm</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('JournalAlbum')}
                  style={styles.pastTripAction}
                >
                  <Text style={styles.pastTripActionText}>Xem kỷ niệm ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Subscription Plan Card */}
        <View style={styles.planCard}>
          <View style={styles.planIconWrapper}>
            <Sparkles size={20} color="#0A1680" />
          </View>
          <View style={styles.planTextWrapper}>
            <Text style={styles.planTitle}>Gói chuyến đi TravAIy Plus</Text>
            <Text style={styles.planSub}>
              {plan ? plan.destination : 'Việt Nam'} · Không giới hạn lượt tạo AI
            </Text>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </View>

        {/* Settings Menu List */}
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('GroupSpace')}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#EFF3FF' }]}>
              <Globe size={18} color="#0A1680" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Cộng đồng TravAIy</Text>
              <Text style={styles.menuSub}>Bảng tin chia sẻ lịch trình & kinh nghiệm</Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('Explore')}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#FFFBEB' }]}>
              <Bookmark size={18} color="#D97706" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Mục đã lưu & Bộ sưu tập</Text>
              <Text style={styles.menuSub}>Bài viết, quán ăn và địa điểm check-in</Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.menuRow}>
            <View style={[styles.menuIconCircle, { backgroundColor: '#F0FDF4' }]}>
              <Bell size={18} color="#16A34A" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Thông báo chuyến đi</Text>
              <Text style={styles.menuSub}>Cập nhật thời tiết và thời gian thực</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E2E8F0', true: '#0A1680' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity
            style={[styles.menuRow, { borderBottomWidth: 0 }]}
            onPress={() => navigation.replace('Welcome')}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#FFF1F2' }]}>
              <LogOut size={18} color="#E11D48" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={[styles.menuTitle, { color: '#E11D48' }]}>Đăng xuất</Text>
              <Text style={styles.menuSub}>Quay lại màn hình đăng nhập</Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: -0.5,
  },
  scrollContent: { paddingBottom: 110 },
  userCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  avatarLetter: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  starBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1B94C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  starText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A1680',
  },
  userName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
  },
  userBadge: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A1680',
  },
  statLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  dnaCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8EEFB',
    elevation: 1,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
  },
  dnaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 10,
  },
  dnaTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dnaTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  dnaEditBtn: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
  dnaPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  dnaMainPill: {
    backgroundColor: '#0A1680',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  dnaMainPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dnaTimeText: {
    fontSize: 11,
    color: '#64748B',
  },
  dnaTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dnaTag: {
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  dnaTagText: {
    fontSize: 11,
    color: '#0A1680',
    fontWeight: '600',
  },
  sectionWrap: {
    marginTop: 18,
    paddingHorizontal: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
  },
  pastTripsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  pastTripCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8EEFB',
  },
  pastTripImg: {
    width: '100%',
    height: 95,
    resizeMode: 'cover',
  },
  pastTripTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pastTripTagText: {
    fontSize: 9,
    color: '#475569',
    fontWeight: '600',
  },
  pastTripInfo: {
    padding: 10,
  },
  pastTripName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  pastTripLength: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  pastTripAction: {
    marginTop: 6,
  },
  pastTripActionText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0A1680',
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#F1B94C',
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 20,
    marginTop: 18,
    gap: 12,
  },
  planIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FBEDB0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTextWrapper: { flex: 1 },
  planTitle: { fontSize: 13, fontWeight: '800', color: '#0A1680' },
  planSub: { fontSize: 10, color: '#64748B', marginTop: 2 },
  menuCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8EEFB',
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: { flex: 1 },
  menuTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  menuSub: { fontSize: 10, color: '#94A3B8', marginTop: 1 },
});
