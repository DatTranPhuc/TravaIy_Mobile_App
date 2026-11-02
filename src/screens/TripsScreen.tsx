import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Colors } from '../theme/colors';
import { useTravel } from '../features/travel/TravelContext';
import { LocalImages } from '../assets/images';
import { resolveImageSource } from '../theme/imageHelper';
import { Calendar, ChevronRight, Plus, MapPin } from 'lucide-react-native';

export const TripsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { plan } = useTravel();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Chuyến đi của bạn</Text>
          <Text style={styles.subTitle}>Quản lý và theo dõi các hành trình đã lưu</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('WizardDestination')}
          activeOpacity={0.85}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Bé Sao Lumi Mascot Reminder */}
        <View style={styles.mascotBanner}>
          <Image
            source={LocalImages.mascotWaving}
            style={styles.mascotImg}
            resizeMode="contain"
          />
          <View style={styles.mascotContent}>
            <Text style={styles.mascotTitle}>BẠN ĐỒNG HÀNH LUMI ✨</Text>
            <Text style={styles.mascotDesc}>
              Bấm vào chuyến đi để xem chi tiết lịch trình, chia tiền chi tiêu hoặc chụp ảnh lưu giữ kỷ niệm nhé!
            </Text>
          </View>
        </View>

        {plan ? (
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionHeading}>HÀNH TRÌNH HIỆN TẠI</Text>

            <TouchableOpacity
              style={styles.tripCard}
              onPress={() => navigation.navigate('TripOverview')}
              activeOpacity={0.88}
            >
              <Image
                source={resolveImageSource(plan.coverImage)}
                style={styles.tripImage}
              />
              <View style={styles.tripContent}>
                <View style={styles.tripBadge}>
                  <Text style={styles.tripBadgeText}>Kế hoạch hiện tại</Text>
                </View>
                <Text style={styles.tripTitle} numberOfLines={1}>
                  {plan.title}
                </Text>
                <View style={styles.metaRow}>
                  <Calendar size={13} color="#64748B" />
                  <Text style={styles.metaText}>
                    {plan.dates} ({plan.days} ngày)
                  </Text>
                </View>
                <Text style={styles.tripCost}>{plan.estimatedCostPerPerson}</Text>
              </View>
              <ChevronRight size={20} color="#0A1680" style={{ marginRight: 14 }} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Image
              source={LocalImages.mascotSuitcase}
              style={styles.emptyMascot}
              resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>Chưa có chuyến đi nào</Text>
            <Text style={styles.emptySub}>
              Hãy bắt đầu tạo chuyến đi đầu tiên cùng Bé Sao Lumi ngay bây giờ!
            </Text>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => navigation.navigate('WizardDestination')}
              activeOpacity={0.85}
            >
              <Text style={styles.createBtnText}>Lên kế hoạch mới ✨</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFDFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FCFDFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: { fontSize: 22, fontWeight: '800', color: '#0A1680', letterSpacing: -0.5 },
  subTitle: { fontSize: 11, color: '#64748B', marginTop: 2 },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: { padding: 20, paddingBottom: 110 },
  mascotBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#F1B94C',
    borderRadius: 20,
    padding: 12,
    gap: 12,
    marginBottom: 20,
  },
  mascotImg: { width: 50, height: 50 },
  mascotContent: { flex: 1 },
  mascotTitle: { fontSize: 10, fontWeight: '800', color: '#B45309', letterSpacing: 0.5 },
  mascotDesc: { fontSize: 11, color: '#475569', lineHeight: 16, marginTop: 2 },
  sectionWrap: { marginBottom: 16 },
  sectionHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 10,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8EEFB',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tripImage: { width: 105, height: 110, resizeMode: 'cover' },
  tripContent: { flex: 1, padding: 12 },
  tripBadge: {
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  tripBadgeText: { fontSize: 10, fontWeight: '700', color: '#0A1680' },
  tripTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  metaText: { fontSize: 11, color: '#64748B' },
  tripCost: { fontSize: 13, fontWeight: '800', color: '#0A1680', marginTop: 6 },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyMascot: { width: 120, height: 120, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#0A1680' },
  emptySub: { fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 6, lineHeight: 18 },
  createBtn: {
    backgroundColor: '#0A1680',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
  },
  createBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
