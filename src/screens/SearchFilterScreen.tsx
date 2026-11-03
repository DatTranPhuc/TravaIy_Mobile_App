import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {
  ChevronLeft,
  Search,
  X,
  SlidersHorizontal,
  Star,
  MapPin,
  Clock,
  Check,
} from 'lucide-react-native';
import { LocalImages } from '../assets/images';

interface Props {
  navigation: any;
}

export const SearchFilterScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Đà Nẵng');
  const [selectedCat, setSelectedCat] = useState('Tất cả');
  const [selectedRating, setSelectedRating] = useState('4.5+');

  const cities = ['Đà Nẵng', 'Đà Lạt', 'Phú Quốc', 'Hội An', 'Nha Trang'];
  const categories = ['Tất cả', 'Ăn uống', 'Cà phê', 'Tham quan', 'Check-in'];
  const ratings = ['Tất cả', '4.0+', '4.5+', '4.8+'];

  const searchResults = [
    {
      id: 'tiem-tu-lung',
      name: 'Tiệm Cà Phê Tú Lưng',
      category: 'Cà phê & Check-in',
      city: 'Đà Lạt',
      rating: 4.8,
      reviews: 342,
      price: '35k – 75k',
      image: LocalImages.dalatCabin,
    },
    {
      id: 'my-khe',
      name: 'Bãi biển Mỹ Khê',
      category: 'Tham quan & Nghỉ ngơi',
      city: 'Đà Nẵng',
      rating: 4.9,
      reviews: 1250,
      price: 'Miễn phí',
      image: LocalImages.beach,
    },
    {
      id: 'nam-danh',
      name: 'Hải sản Năm Đảnh',
      category: 'Ăn uống',
      city: 'Đà Nẵng',
      rating: 4.7,
      reviews: 890,
      price: '100k – 250k',
      image: LocalImages.food,
    },
    {
      id: 'faifo-coffee',
      name: 'Faifo Coffee Hội An',
      category: 'Cà phê & Check-in',
      city: 'Hội An',
      rating: 4.6,
      reviews: 620,
      price: '50k – 90k',
      image: LocalImages.town,
    },
    {
      id: 'ba-na-hills',
      name: 'Bà Nà Hills & Cầu Vàng',
      category: 'Tham quan',
      city: 'Đà Nẵng',
      rating: 4.9,
      reviews: 4500,
      price: '850k',
      image: LocalImages.bridge,
    },
  ];

  const filteredPlaces = searchResults.filter((p) => {
    const matchQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.city.toLowerCase().includes(query.toLowerCase());
    const matchCity = selectedCity === 'Tất cả' || p.city === selectedCity;
    const matchCat = selectedCat === 'Tất cả' || p.category.includes(selectedCat);
    return matchQuery && matchCity && matchCat;
  });

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

        <View style={styles.searchBar}>
          <Search size={16} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm món ngon, cà phê, điểm đến..."
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* City Filter Pills */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Điểm đến</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {cities.map((city) => (
              <TouchableOpacity
                key={city}
                style={[styles.cityChip, selectedCity === city && styles.cityChipActive]}
                onPress={() => setSelectedCity(city)}
              >
                <Text style={[styles.cityText, selectedCity === city && styles.cityTextActive]}>
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Category Filter Pills */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Thể loại</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.catChip, selectedCat === cat && styles.catChipActive]}
                onPress={() => setSelectedCat(cat)}
              >
                <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            Kết quả tìm kiếm ({filteredPlaces.length})
          </Text>
        </View>

        {/* Results List */}
        <View style={styles.resultsList}>
          {filteredPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.resultCard}
              onPress={() => navigation.navigate('PlaceDetail', { placeId: place.id })}
              activeOpacity={0.85}
            >
              <Image source={place.image} style={styles.resultImg} resizeMode="cover" />

              <View style={styles.resultInfo}>
                <View style={styles.resultTopRow}>
                  <Text style={styles.resultCat}>{place.category}</Text>
                  <View style={styles.ratingBox}>
                    <Star size={12} color="#D97706" fill="#D97706" />
                    <Text style={styles.ratingText}>{place.rating}</Text>
                  </View>
                </View>

                <Text style={styles.resultName} numberOfLines={1}>
                  {place.name}
                </Text>

                <View style={styles.resultBottomRow}>
                  <View style={styles.cityRow}>
                    <MapPin size={12} color="#64748B" />
                    <Text style={styles.cityLabel}>{place.city}</Text>
                  </View>
                  <Text style={styles.priceLabel}>{place.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
    gap: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#1E293B',
    paddingVertical: 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  filterSection: {
    gap: 8,
  },
  filterTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  filterRow: {
    gap: 8,
  },
  cityChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cityChipActive: {
    backgroundColor: '#0A1680',
    borderColor: '#0A1680',
  },
  cityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  cityTextActive: {
    color: '#FFFFFF',
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catChipActive: {
    backgroundColor: '#0A1680',
    borderColor: '#0A1680',
  },
  catText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  catTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    marginTop: 6,
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  resultsList: {
    gap: 12,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  resultImg: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },
  resultInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  resultTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultCat: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
  },
  resultName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  resultBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cityLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
});
