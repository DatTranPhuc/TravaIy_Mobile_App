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
  Heart,
  Share2,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Navigation,
  Plus,
  Compass,
} from 'lucide-react-native';
import { LocalImages } from '../../assets/images';

interface Props {
  navigation: any;
  route: any;
}

export const PlaceDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');

  const place = {
    id: 'tiem-tu-lung',
    name: 'Tiệm Cà Phê Tú Lưng',
    category: 'Cà phê & Check-in',
    rating: 4.8,
    reviewsCount: 342,
    priceRange: '35.000đ – 75.000đ',
    address: 'Đồi Dã Chiến, Phường 11, TP. Đà Lạt',
    distance: 'Cách trung tâm 4.2 km',
    openHours: '07:00 – 22:30 · Đang mở cửa',
    description:
      'Nằm ẩn mình trên triền đồi Dã Chiến, Tiệm Cà Phê Tú Lưng là điểm săn mây và ngắm hoàng hôn triệu view tại Đà Lạt. Không gian mộc mạc với căn nhà gỗ, hiên hoa cúc họa mi và hương cà phê arabica rang mộc thơm lừng.',
    amenities: ['View thung lũng', 'Săn mây sáng sớm', 'Wifi tốc độ cao', 'Bãi đỗ ô tô', 'Nhạc acoustic'],
    images: [LocalImages.dalatCabin, LocalImages.town, LocalImages.beach],
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    Alert.alert(
      !isSaved ? 'Đã lưu' : 'Đã bỏ lưu',
      !isSaved
        ? 'Đã thêm Tiệm Cà Phê Tú Lưng vào Bộ sưu tập của bạn!'
        : 'Đã xóa khỏi danh sách yêu thích.'
    );
  };

  const handleAddToPlan = () => {
    Alert.alert(
      'Thêm vào lịch trình',
      'Đã thêm Tiệm Cà Phê Tú Lưng vào lịch trình chuyến đi!',
      [
        { text: 'Tiếp tục xem', style: 'cancel' },
        { text: 'Xem lịch trình', onPress: () => navigation.navigate('DayItinerary', { dayNumber: 1 }) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Photo Carousel */}
        <View style={styles.heroWrap}>
          <Image source={place.images[0]} style={styles.heroImg} resizeMode="cover" />
          <View style={styles.heroOverlay} />

          {/* Floating Header */}
          <View style={styles.floatingHeader}>
            <TouchableOpacity
              style={styles.floatingCircleBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <ChevronLeft size={22} color="#0A1680" />
            </TouchableOpacity>

            <View style={styles.floatingRightBtns}>
              <TouchableOpacity
                style={styles.floatingCircleBtn}
                onPress={handleToggleSave}
                activeOpacity={0.8}
              >
                <Heart
                  size={20}
                  color={isSaved ? '#EF4444' : '#0A1680'}
                  fill={isSaved ? '#EF4444' : 'none'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.floatingCircleBtn}
                onPress={() => Alert.alert('Chia sẻ', 'Đã sao chép liên kết địa điểm!')}
                activeOpacity={0.8}
              >
                <Share2 size={18} color="#0A1680" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Place Info Content */}
        <View style={styles.contentWrap}>
          <View style={styles.catRow}>
            <View style={styles.catChip}>
              <Text style={styles.catChipText}>{place.category}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Star size={14} color="#D97706" fill="#D97706" />
              <Text style={styles.ratingText}>{place.rating}</Text>
              <Text style={styles.ratingCount}>({place.reviewsCount})</Text>
            </View>
          </View>

          <Text style={styles.placeTitle}>{place.name}</Text>
          <Text style={styles.priceText}>{place.priceRange}</Text>

          {/* Quick info boxes */}
          <View style={styles.quickInfoBox}>
            <View style={styles.quickInfoItem}>
              <MapPin size={16} color="#0A1680" />
              <View style={styles.quickInfoText}>
                <Text style={styles.quickInfoMain}>{place.address}</Text>
                <Text style={styles.quickInfoSub}>{place.distance}</Text>
              </View>
            </View>

            <View style={styles.quickInfoDivider} />

            <View style={styles.quickInfoItem}>
              <Clock size={16} color="#059669" />
              <View style={styles.quickInfoText}>
                <Text style={styles.quickInfoMain}>{place.openHours}</Text>
              </View>
            </View>
          </View>

          {/* Amenities Chips */}
          <View style={styles.amenitiesWrap}>
            <Text style={styles.sectionTitle}>Điểm nổi bật</Text>
            <View style={styles.amenitiesList}>
              {place.amenities.map((item, idx) => (
                <View key={idx} style={styles.amenityChip}>
                  <Text style={styles.amenityText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.descWrap}>
            <Text style={styles.sectionTitle}>Giới thiệu</Text>
            <Text style={styles.descText}>{place.description}</Text>
          </View>

          {/* Mascot Recommendation Card */}
          <View style={styles.mascotTip}>
            <Image source={LocalImages.lumiWave} style={styles.mascotImg} resizeMode="contain" />
            <View style={styles.mascotText}>
              <View style={styles.mascotHeadingRow}>
                <Sparkles size={14} color="#D97706" />
                <Text style={styles.mascotHeading}>Mẹo từ Bé Sao Lumi</Text>
              </View>
              <Text style={styles.mascotSub}>
                Thời điểm săn mây đẹp nhất tại đây là 05:45 - 06:30 sáng, hoặc ngắm hoàng hôn lúc 16:45 chiều bạn nhé!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.directBtn}
          onPress={() => navigation.navigate('MapView')}
          activeOpacity={0.85}
        >
          <Compass size={18} color="#0A1680" />
          <Text style={styles.directBtnText}>Chỉ đường</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addPlanBtn}
          onPress={handleAddToPlan}
          activeOpacity={0.85}
        >
          <Plus size={18} color="#FFFFFF" />
          <Text style={styles.addPlanBtnText}>Thêm vào lịch trình</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroWrap: {
    width: '100%',
    height: 320,
    position: 'relative',
    backgroundColor: '#071938',
  },
  heroImg: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  floatingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  floatingCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingRightBtns: {
    flexDirection: 'row',
    gap: 10,
  },
  contentWrap: {
    padding: 20,
    gap: 18,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catChip: {
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  catChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B45309',
  },
  ratingCount: {
    fontSize: 11,
    color: '#78350F',
  },
  placeTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1E293B',
    lineHeight: 30,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0A1680',
  },
  quickInfoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quickInfoDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  quickInfoText: {
    flex: 1,
  },
  quickInfoMain: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  quickInfoSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  amenitiesWrap: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  amenityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  descWrap: {
    gap: 8,
  },
  descText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  mascotTip: {
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
    width: 50,
    height: 50,
  },
  mascotText: {
    flex: 1,
  },
  mascotHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  mascotHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  mascotSub: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  directBtn: {
    flex: 1,
    backgroundColor: '#EFF3FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 18,
  },
  directBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
  },
  addPlanBtn: {
    flex: 2,
    backgroundColor: '#0A1680',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 18,
  },
  addPlanBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
