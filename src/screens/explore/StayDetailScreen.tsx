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
  Alert,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { STAYS } from '../../features/travel/fixtures';
import { useTravel } from '../../features/travel/TravelContext';
import { resolveImageSource } from '../../theme/imageHelper';
import {
  ArrowLeft,
  Star,
  MapPin,
  Heart,
  Share2,
  Check,
  Coffee,
  Wifi,
  Waves,
  Building,
} from 'lucide-react-native';

interface StayDetailScreenProps {
  route: any;
  navigation: any;
}

export const StayDetailScreen: React.FC<StayDetailScreenProps> = ({ route, navigation }) => {
  const { stayId } = route.params || {};
  const { plan, setPlan } = useTravel();
  const stay = STAYS.find((s) => s.id === stayId) || STAYS[0];

  const [activePhoto, setActivePhoto] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const isCurrentStay = plan.stayId === stay.id;

  const handleSelectStay = () => {
    setPlan({
      ...plan,
      stayId: stay.id,
    });
    Alert.alert(
      'Đã chọn chỗ nghỉ',
      `Bạn đã chọn "${stay.name}" làm điểm lưu trú cho chuyến đi ${plan.destination}!`,
      [
        {
          text: 'Xem chuyến đi',
          onPress: () => navigation.navigate('TripOverview'),
        },
        { text: 'Đóng', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Gallery Image Hero */}
        <View style={styles.heroWrapper}>
          <Image source={resolveImageSource(stay.gallery[activePhoto] || stay.image)} style={styles.heroImage} />
          <View style={styles.heroOverlay} />

          {/* Top Bar */}
          <SafeAreaView style={styles.heroTopBar}>
            <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
              <ArrowLeft size={22} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.heroActions}>
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => setIsSaved(!isSaved)}
              >
                <Heart
                  size={20}
                  color={isSaved ? Colors.danger : Colors.white}
                  fill={isSaved ? Colors.danger : 'transparent'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBtn}>
                <Share2 size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Gallery Thumbnails */}
          <View style={styles.thumbsList}>
            {stay.gallery.map((img, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.thumbBox, activePhoto === idx && styles.activeThumbBox]}
                onPress={() => setActivePhoto(idx)}
              >
                <Image source={resolveImageSource(img)} style={styles.thumbImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.body}>
          <View style={styles.tagRow}>
            <View style={styles.typeTag}>
              <Text style={styles.typeTagText}>{stay.type}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{stay.rating} (Đánh giá xuất sắc)</Text>
            </View>
          </View>

          <Text style={styles.title}>{stay.name}</Text>
          <View style={styles.locationRow}>
            <MapPin size={15} color={Colors.primary} />
            <Text style={styles.locationText}>{stay.area}</Text>
          </View>

          {/* Current Stay Notice */}
          {isCurrentStay && (
            <View style={styles.currentBadge}>
              <Check size={16} color={Colors.success} />
              <Text style={styles.currentBadgeText}>
                Đây là chỗ nghỉ đã được chọn cho chuyến đi của bạn
              </Text>
            </View>
          )}

          {/* Amenities */}
          <Text style={styles.sectionHeading}>Tiện nghi nổi bật</Text>
          <View style={styles.amenitiesGrid}>
            {stay.amenities.map((item, idx) => (
              <View key={item} style={styles.amenityCard}>
                {idx === 0 ? (
                  <Waves size={20} color={Colors.primary} />
                ) : idx === 1 ? (
                  <Building size={20} color={Colors.primary} />
                ) : idx === 2 ? (
                  <Coffee size={20} color={Colors.primary} />
                ) : (
                  <Wifi size={20} color={Colors.primary} />
                )}
                <Text style={styles.amenityCardText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text style={styles.sectionHeading}>Giới thiệu</Text>
          <Text style={styles.description}>{stay.description}</Text>

          {/* Location note */}
          <View style={styles.anchorBox}>
            <MapPin size={22} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.anchorTitle}>Tối ưu lịch trình từ chỗ ở</Text>
              <Text style={styles.anchorSub}>
                Khi chọn chỗ nghỉ này, AI sẽ tính toán khoảng cách và sắp xếp các điểm tham quan gần nhất cho từng ngày.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.barPrice}>{stay.price.toLocaleString('vi-VN')}đ</Text>
          <Text style={styles.barUnit}>/ phòng / đêm (giá tham khảo)</Text>
        </View>

        <TouchableOpacity
          style={[styles.selectBtn, isCurrentStay && styles.selectedBtn]}
          onPress={handleSelectStay}
          activeOpacity={0.85}
        >
          <Check size={18} color={Colors.white} />
          <Text style={styles.selectBtnText}>
            {isCurrentStay ? 'Đã chọn chỗ nghỉ này' : 'Dùng cho chuyến đi'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: 100 },
  heroWrapper: { height: 320, position: 'relative', justifyContent: 'space-between' },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  heroTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 10,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroActions: { flexDirection: 'row', gap: 10 },
  thumbsList: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 16,
    zIndex: 10,
  },
  thumbBox: {
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbBox: { borderColor: Colors.secondary },
  thumbImage: { width: '100%', height: '100%' },
  body: { padding: 20 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  typeTag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeTagText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontWeight: '700', color: Colors.text },
  title: { fontSize: 24, fontWeight: '800', color: Colors.text, marginBottom: 6 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  locationText: { fontSize: 14, color: Colors.textSecondary },
  currentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  currentBadgeText: { fontSize: 13, fontWeight: '600', color: '#065F46' },
  sectionHeading: { fontSize: 17, fontWeight: '800', color: Colors.text, marginTop: 10, marginBottom: 12 },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  amenityCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  amenityCardText: { fontSize: 13, fontWeight: '600', color: Colors.text },
  description: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22, marginBottom: 16 },
  anchorBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#D8E2FD',
  },
  anchorTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary, marginBottom: 4 },
  anchorSub: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barPrice: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  barUnit: { fontSize: 11, color: Colors.textSecondary },
  selectBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  selectedBtn: { backgroundColor: Colors.success },
  selectBtnText: { color: Colors.white, fontSize: 14, fontWeight: '700' },
});
