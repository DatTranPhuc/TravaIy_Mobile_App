import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Colors } from '../theme/colors';
import { MOCK_DESTINATIONS, MOCK_PLACES } from '../data/mockData';
import { STAYS } from '../features/travel/fixtures';
import { LocalImages } from '../assets/images';
import { resolveImageSource } from '../theme/imageHelper';
import { useTravel } from '../features/travel/TravelContext';
import {
  Search,
  Star,
  MapPin,
  Map,
  Bookmark,
  Heart,
  SlidersHorizontal,
  Mic,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react-native';

const CATEGORIES = ['Tất cả', 'Khách sạn', 'Ăn uống', 'Cà phê', 'Biển', 'Núi', 'Check-in'];

export const ExploreScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { setWizardData } = useTravel();
  const [activeTab, setActiveTab] = useState<'trending' | 'nearby' | 'ai'>('trending');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['danang', 'hoian']);

  const toggleFav = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectDest = (dest: (typeof MOCK_DESTINATIONS)[0]) => {
    setWizardData((prev) => ({
      ...prev,
      destination: dest.title,
      destinationTagline: dest.tagline,
      destinationImage: dest.image,
    }));
    navigation.navigate('WizardDestination');
  };

  const filteredPlaces = MOCK_PLACES.filter((p) => {
    const matchCat = selectedCategory === 'Tất cả' || p.category.includes(selectedCategory);
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Khám phá</Text>
          <Text style={styles.headerSub}>Điểm đến & trải nghiệm du lịch tuyệt vời</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.mapPill}
            onPress={() => navigation.navigate('Stays')}
            activeOpacity={0.8}
          >
            <Map size={15} color="#0A1680" />
            <Text style={styles.mapPillText}>Chỗ ở</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookmarkBtn} activeOpacity={0.8}>
            <Bookmark size={17} color="#0A1680" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Search size={18} color="#0A1680" />
        <TextInput
          placeholder="Tìm điểm đến, món ngon, trải nghiệm..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchIconBtn}>
          <Mic size={17} color="#94A3B8" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchIconBtn}
          onPress={() => navigation.navigate('Stays')}
        >
          <SlidersHorizontal size={17} color="#0A1680" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category Horizontal Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, isSelected && styles.activeCategoryChip]}
                onPress={() => {
                  if (cat === 'Khách sạn') {
                    navigation.navigate('Stays');
                  } else {
                    setSelectedCategory(cat);
                  }
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isSelected && styles.activeCategoryChipText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tab Filters (Thịnh hành / Gần bạn / Gợi ý AI) */}
        <View style={styles.tabBar}>
          <View style={styles.tabButtons}>
            <TouchableOpacity
              onPress={() => setActiveTab('trending')}
              style={[styles.tabBtn, activeTab === 'trending' && styles.activeTabBtn]}
            >
              <Text
                style={[styles.tabText, activeTab === 'trending' && styles.activeTabText]}
              >
                Thịnh hành
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('nearby')}
              style={[styles.tabBtn, activeTab === 'nearby' && styles.activeTabBtn]}
            >
              <Text
                style={[styles.tabText, activeTab === 'nearby' && styles.activeTabText]}
              >
                Gần bạn
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('ai')}
              style={[styles.tabBtn, activeTab === 'ai' && styles.activeTabBtn]}
            >
              <Text style={[styles.tabText, activeTab === 'ai' && styles.activeTabText]}>
                Gợi ý AI ✨
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Stays')}
            style={styles.viewStaysLink}
          >
            <Text style={styles.viewStaysText}>Xem chỗ ở</Text>
            <ChevronRight size={14} color="#0A1680" />
          </TouchableOpacity>
        </View>

        {/* Mascot Recommendation Banner */}
        <View style={styles.mascotBanner}>
          <Image
            source={LocalImages.mascotMap}
            style={styles.mascotBannerImg}
            resizeMode="contain"
          />
          <View style={styles.mascotBannerContent}>
            <View style={styles.mascotBadgeRow}>
              <View style={styles.pulseDot} />
              <Text style={styles.mascotBadgeText}>GỢI Ý TỪ BÉ SAO LUMI ✨</Text>
            </View>
            <Text style={styles.mascotTitle}>Điểm đến phù hợp với bạn</Text>
            <Text style={styles.mascotSub}>
              Được cá nhân hóa theo phong cách du lịch và thời gian biểu của bạn.
            </Text>
          </View>
        </View>

        {/* Stays & Accommodations Row */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionTitleRow}>
            <View>
              <Text style={styles.eyebrow}>NƠI NGHỈ CHO CHUYẾN ĐI</Text>
              <Text style={styles.sectionHeading}>Khách sạn & chỗ ở</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Stays')}
              style={styles.seeAllBtn}
            >
              <Text style={styles.seeAllText}>Xem tất cả</Text>
              <ArrowUpRight size={14} color="#0A1680" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalStaysList}
          >
            {STAYS.map((stay) => (
              <TouchableOpacity
                key={stay.id}
                style={styles.stayCard}
                onPress={() => navigation.navigate('StayDetail', { stay })}
                activeOpacity={0.88}
              >
                <Image source={resolveImageSource(stay.image)} style={styles.stayImage} />
                <View style={styles.stayInfo}>
                  <View style={styles.stayTypeRow}>
                    <Text style={styles.stayType}>{stay.type}</Text>
                    <View style={styles.stayRating}>
                      <Star size={11} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.stayRatingText}>{stay.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.stayName} numberOfLines={1}>
                    {stay.name}
                  </Text>
                  <Text style={styles.stayArea} numberOfLines={1}>
                    {stay.area}
                  </Text>
                  <Text style={styles.stayPrice}>
                    {stay.price.toLocaleString('vi-VN')}đ{' '}
                    <Text style={styles.stayUnit}>/ đêm</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Large Destinations Feed */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionTitleRow}>
            <View>
              <Text style={styles.eyebrow}>ĐIỂM ĐẾN NỔI BẬT</Text>
              <Text style={styles.sectionHeading}>Khám phá Việt Nam</Text>
            </View>
          </View>

          <View style={styles.destinationsFeed}>
            {MOCK_DESTINATIONS.map((dest) => {
              const isFav = favorites.includes(dest.id);
              return (
                <TouchableOpacity
                  key={dest.id}
                  style={styles.largeDestCard}
                  onPress={() => handleSelectDest(dest)}
                  activeOpacity={0.9}
                >
                  <Image source={resolveImageSource(dest.image)} style={styles.largeDestImg} resizeMode="cover" />
                  <View style={styles.largeDestGradient} />

                  <TouchableOpacity
                    style={styles.destFavBtn}
                    onPress={() => toggleFav(dest.id)}
                    activeOpacity={0.8}
                  >
                    <Heart
                      size={18}
                      color={isFav ? '#F43F5E' : '#FFFFFF'}
                      fill={isFav ? '#F43F5E' : 'transparent'}
                    />
                  </TouchableOpacity>

                  <View style={styles.largeDestContent}>
                    <View style={styles.destLocationBadge}>
                      <MapPin size={12} color="#FFFFFF" />
                      <Text style={styles.destLocationText}>{dest.location}</Text>
                    </View>
                    <Text style={styles.destTitle}>{dest.title}</Text>
                    <Text style={styles.destTagline}>{dest.tagline}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: '#FCFDFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: -0.5,
  },
  headerSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mapPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  mapPillText: { fontSize: 12, fontWeight: '700', color: '#0A1680' },
  bookmarkBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 8,
    paddingHorizontal: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 44,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#0A1680', fontWeight: '500' },
  searchIconBtn: { padding: 4 },
  scrollContent: { paddingBottom: 110 },
  categoryRow: { paddingHorizontal: 20, paddingVertical: 8, gap: 8 },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeCategoryChip: { backgroundColor: '#0A1680', borderColor: '#0A1680' },
  categoryChipText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  activeCategoryChipText: { color: '#FFFFFF' },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  tabButtons: { flexDirection: 'row', gap: 16 },
  tabBtn: { paddingBottom: 4 },
  activeTabBtn: { borderBottomWidth: 2, borderBottomColor: '#0A1680' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#94A3B8' },
  activeTabText: { color: '#0A1680', fontWeight: '800' },
  viewStaysLink: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  viewStaysText: { fontSize: 11, fontWeight: '700', color: '#0A1680' },
  mascotBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#F1B94C',
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  mascotBannerImg: { width: 56, height: 56 },
  mascotBannerContent: { flex: 1 },
  mascotBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#F1B94C' },
  mascotBadgeText: { fontSize: 10, fontWeight: '800', color: '#B45309' },
  mascotTitle: { fontSize: 13, fontWeight: '800', color: '#0F172A', marginTop: 2 },
  mascotSub: { fontSize: 11, color: '#64748B', lineHeight: 15, marginTop: 2 },
  sectionWrap: { marginTop: 8, marginBottom: 16 },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  eyebrow: { fontSize: 9, fontWeight: '700', color: '#94A3B8', letterSpacing: 0.8 },
  sectionHeading: { fontSize: 17, fontWeight: '800', color: '#0A1680', marginTop: 2 },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  seeAllText: { fontSize: 12, fontWeight: '700', color: '#0A1680' },
  horizontalStaysList: { paddingHorizontal: 20, gap: 12 },
  stayCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8EEFB',
    elevation: 2,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  stayImage: { width: '100%', height: 110, resizeMode: 'cover' },
  stayInfo: { padding: 10 },
  stayTypeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stayType: { fontSize: 10, fontWeight: '700', color: '#0A1680' },
  stayRating: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  stayRatingText: { fontSize: 11, fontWeight: '700', color: '#0F172A' },
  stayName: { fontSize: 13, fontWeight: '800', color: '#0F172A', marginTop: 3 },
  stayArea: { fontSize: 10, color: '#64748B', marginTop: 1 },
  stayPrice: { fontSize: 13, fontWeight: '800', color: '#0A1680', marginTop: 6 },
  stayUnit: { fontSize: 10, fontWeight: '400', color: '#64748B' },
  destinationsFeed: { paddingHorizontal: 20, gap: 16 },
  largeDestCard: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  largeDestImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  largeDestGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
    backgroundColor: 'rgba(10, 22, 128, 0.65)',
  },
  destFavBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeDestContent: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  destLocationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 6,
  },
  destLocationText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  destTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  destTagline: { fontSize: 12, color: '#E2E8F0', marginTop: 2 },
});
