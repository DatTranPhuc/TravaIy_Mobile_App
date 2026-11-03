import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { STAYS } from '../../features/travel/fixtures';
import { LocalImages } from '../../assets/images';
import { resolveImageSource } from '../../theme/imageHelper';
import { useTravel } from '../../features/travel/TravelContext';
import {
  ArrowLeft,
  Search,
  Star,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  Heart,
} from 'lucide-react-native';

const CATEGORIES = ['Tất cả', 'Khách sạn', 'Homestay', 'Resort'];

export const StaysScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { plan } = useTravel();
  const [selectedType, setSelectedType] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>(['may-bien']);

  const filteredStays = STAYS.filter((s) => {
    const matchType = selectedType === 'Tất cả' || s.type === selectedType;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.area.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ArrowLeft size={22} color="#0A1680" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Tìm chỗ ở</Text>
          <Text style={styles.headerSub}>Điểm nghỉ ngơi lý tưởng cho chuyến đi</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
          <SlidersHorizontal size={18} color="#0A1680" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchBar}>
        <Search size={18} color="#0A1680" />
        <TextInput
          placeholder="Tìm khách sạn, resort, homestay..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Category Filter Chips */}
      <View style={styles.chipsRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsList}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedType === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, isSelected && styles.selectedChip]}
                onPress={() => setSelectedType(cat)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.chipText, isSelected && styles.selectedChipText]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Bé Sao Lumi Tip */}
        <View style={styles.mascotTip}>
          <Image
            source={LocalImages.mascotMap}
            style={styles.mascotImg}
            resizeMode="contain"
          />
          <View style={styles.mascotText}>
            <Text style={styles.mascotTitle}>GỢI Ý TỪ BÉ SAO LUMI ✨</Text>
            <Text style={styles.mascotSub}>
              Chọn khách sạn gần trung tâm hoặc bãi biển để tiết kiệm thời gian di chuyển nhé!
            </Text>
          </View>
        </View>

        <View style={styles.countRow}>
          <Text style={styles.countText}>
            Tìm thấy {filteredStays.length} chỗ nghỉ phù hợp
          </Text>
        </View>

        {filteredStays.length === 0 ? (
          <View style={styles.emptyState}>
            <Image
              source={LocalImages.lumiWave}
              style={styles.emptyImg}
              resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>Không tìm thấy chỗ ở phù hợp</Text>
            <Text style={styles.emptySub}>
              Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc danh mục bạn nhé!
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSearch('');
                setSelectedType('Tất cả');
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.resetBtnText}>Xem tất cả chỗ ở</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredStays.map((item) => {
              const isSaved = savedIds.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => navigation.navigate('StayDetail', { stayId: item.id })}
                  activeOpacity={0.88}
                >
                  <View style={styles.imageWrapper}>
                    <Image
                      source={resolveImageSource(item.image)}
                      style={styles.cardImage}
                    />
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeBadgeText}>{item.type}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.favBtn}
                      onPress={() => toggleSave(item.id)}
                      activeOpacity={0.8}
                    >
                      <Heart
                        size={17}
                        color={isSaved ? '#F43F5E' : '#FFFFFF'}
                        fill={isSaved ? '#F43F5E' : 'transparent'}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardName}>{item.name}</Text>
                      <View style={styles.ratingBadge}>
                        <Star size={13} color="#F59E0B" fill="#F59E0B" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                    </View>

                    <View style={styles.areaRow}>
                      <MapPin size={13} color="#64748B" />
                      <Text style={styles.areaText} numberOfLines={1}>
                        {item.area}
                      </Text>
                    </View>

                    <View style={styles.amenitiesRow}>
                      {item.amenities.slice(0, 3).map((amenity) => (
                        <View key={amenity} style={styles.amenityChip}>
                          <Text style={styles.amenityText}>{amenity}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.priceRow}>
                      <View>
                        <Text style={styles.priceAmount}>
                          {item.price.toLocaleString('vi-VN')}đ
                        </Text>
                        <Text style={styles.priceUnit}>/ phòng / đêm</Text>
                      </View>
                      <View style={styles.detailBtn}>
                        <Text style={styles.detailBtnText}>Xem chi tiết</Text>
                        <ChevronRight size={15} color="#0A1680" />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FCFDFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0A1680' },
  headerSub: { fontSize: 11, color: '#64748B', marginTop: 1 },
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 44,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#0A1680', fontWeight: '500' },
  chipsRow: { paddingVertical: 10 },
  chipsList: { paddingHorizontal: 20, gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedChip: {
    backgroundColor: '#0A1680',
    borderColor: '#0A1680',
  },
  chipText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  selectedChipText: { color: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingBottom: 110 },
  mascotTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#F1B94C',
    borderRadius: 18,
    padding: 12,
    gap: 12,
    marginBottom: 12,
  },
  mascotImg: { width: 50, height: 50 },
  mascotText: { flex: 1 },
  mascotTitle: { fontSize: 10, fontWeight: '800', color: '#B45309' },
  mascotSub: { fontSize: 11, color: '#475569', lineHeight: 16, marginTop: 2 },
  countRow: { marginBottom: 12 },
  countText: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyImg: { width: 110, height: 110, marginBottom: 16 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: '#0A1680', textAlign: 'center' },
  emptySub: { fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 6, lineHeight: 18 },
  resetBtn: {
    backgroundColor: '#0A1680',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 18,
  },
  resetBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  list: { gap: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8EEFB',
    elevation: 2,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  imageWrapper: { position: 'relative', width: '100%', height: 170 },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  typeBadge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeBadgeText: { fontSize: 10, fontWeight: '700', color: '#0A1680' },
  favBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { padding: 14 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  areaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  areaText: { fontSize: 11, color: '#64748B' },
  amenitiesRow: { flexDirection: 'row', gap: 6, marginVertical: 10 },
  amenityChip: {
    backgroundColor: '#EFF3FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  amenityText: { fontSize: 10, color: '#0A1680', fontWeight: '600' },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  priceAmount: { fontSize: 16, fontWeight: '800', color: '#0A1680' },
  priceUnit: { fontSize: 10, color: '#64748B', fontWeight: '400' },
  detailBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  detailBtnText: { fontSize: 12, fontWeight: '700', color: '#0A1680' },
});
