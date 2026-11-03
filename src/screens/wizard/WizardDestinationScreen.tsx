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
import { useTravel } from '../../features/travel/TravelContext';
import { LocalImages } from '../../assets/images';
import { ArrowLeft, Search, Check, Heart, Sparkles, ChevronRight } from 'lucide-react-native';

const POPULAR_DESTINATIONS = [
  {
    name: 'Đà Lạt',
    sub: 'Thành phố ngàn hoa mộng mơ',
    img: LocalImages.dalatCabin,
  },
  {
    name: 'Đà Nẵng',
    sub: 'Thành phố biển năng động',
    img: LocalImages.bridge,
  },
  {
    name: 'Hội An',
    sub: 'Nét đẹp phố cổ đèn lồng',
    img: LocalImages.town,
  },
  {
    name: 'Phú Quốc',
    sub: 'Thiên đường biển đảo ngọc',
    img: LocalImages.beach,
  },
];

const OTHER_DESTINATIONS = [
  {
    name: 'Nha Trang',
    sub: 'Biển xanh, cát trắng nắng vàng',
    img: LocalImages.resort,
  },
  {
    name: 'Sapa',
    sub: 'Săn mây, khám phá núi rừng',
    img: LocalImages.room2,
  },
  {
    name: 'Ninh Bình',
    sub: 'Non nước hữu tình Tràng An',
    img: LocalImages.bay,
  },
  {
    name: 'Huế',
    sub: 'Cố đô trầm mặc bên sông Hương',
    img: LocalImages.vietnamHero,
  },
];

interface WizardDestinationScreenProps {
  navigation: any;
}

export const WizardDestinationScreen: React.FC<WizardDestinationScreenProps> = ({
  navigation,
}) => {
  const { wizardData, setWizardData } = useTravel();
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['Đà Lạt', 'Đà Nẵng']);

  const filterItem = (item: (typeof POPULAR_DESTINATIONS)[0]) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.sub.toLowerCase().includes(search.toLowerCase());

  const filteredPopular = POPULAR_DESTINATIONS.filter(filterItem);
  const filteredOthers = OTHER_DESTINATIONS.filter(filterItem);

  const toggleFav = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleSelect = (dest: (typeof POPULAR_DESTINATIONS)[0]) => {
    setWizardData((prev) => ({
      ...prev,
      destination: dest.name,
      destinationTagline: dest.sub,
      destinationImage: dest.img as any,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header & Step progress */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ArrowLeft size={22} color="#0A1680" />
        </TouchableOpacity>

        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Bước 1 / 5</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '20%' }]} />
          </View>
        </View>

        <View style={styles.headerIcon}>
          <Sparkles size={18} color="#0A1680" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Bạn muốn đi đâu?</Text>
          <Text style={styles.subtitle}>
            Khám phá và lên lịch trình cho điểm đến mơ ước của bạn
          </Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <Search size={18} color="#0A1680" />
          <TextInput
            placeholder="Tìm thành phố, điểm du lịch..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Mascot Tip Banner */}
        <View style={styles.mascotTipCard}>
          <Image
            source={LocalImages.lumiWave}
            style={styles.mascotTipImg}
            resizeMode="contain"
          />
          <View style={styles.mascotTipTextWrap}>
            <Text style={styles.mascotTipTitle}>BÉ SAO LUMI GỢI Ý ✨</Text>
            <Text style={styles.mascotTipDesc}>
              Chọn điểm đến bạn thích nhất! Mình sẽ cân đối thời gian và đề xuất lộ trình tối ưu giúp chuyến đi thật trọn vẹn.
            </Text>
          </View>
        </View>

        {/* Popular Destinations Grid */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Gợi ý phổ biến ✨</Text>
            <Text style={styles.sectionAction}>Xem tất cả</Text>
          </View>

          <View style={styles.grid}>
            {filteredPopular.map((item) => {
              const isSelected = wizardData.destination === item.name;
              const isFav = favorites.includes(item.name);
              return (
                <TouchableOpacity
                  key={item.name}
                  style={[styles.card, isSelected && styles.selectedCard]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.88}
                >
                  <View style={styles.cardImageWrapper}>
                    <Image source={item.img} style={styles.cardImage} />

                    <TouchableOpacity
                      style={styles.favButton}
                      onPress={() => toggleFav(item.name)}
                      activeOpacity={0.8}
                    >
                      <Heart
                        size={15}
                        color={isFav ? '#F43F5E' : '#94A3B8'}
                        fill={isFav ? '#F43F5E' : 'transparent'}
                      />
                    </TouchableOpacity>

                    {isSelected && (
                      <View style={styles.checkBadge}>
                        <Check size={13} color="#FFFFFF" strokeWidth={3} />
                      </View>
                    )}
                  </View>

                  <View style={styles.cardInfo}>
                    <Text style={styles.cardName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.cardSub} numberOfLines={1}>
                      {item.sub}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Other Destinations */}
        {filteredOthers.length > 0 && (
          <View style={styles.sectionWrap}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Các điểm đến khác</Text>
              <Text style={styles.sectionSubAction}>Khám phá thêm</Text>
            </View>

            <View style={styles.grid}>
              {filteredOthers.map((item) => {
                const isSelected = wizardData.destination === item.name;
                const isFav = favorites.includes(item.name);
                return (
                  <TouchableOpacity
                    key={item.name}
                    style={[styles.card, isSelected && styles.selectedCard]}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.88}
                  >
                    <View style={styles.cardImageWrapper}>
                      <Image source={item.img} style={styles.cardImage} />

                      <TouchableOpacity
                        style={styles.favButton}
                        onPress={() => toggleFav(item.name)}
                        activeOpacity={0.8}
                      >
                        <Heart
                          size={15}
                          color={isFav ? '#F43F5E' : '#94A3B8'}
                          fill={isFav ? '#F43F5E' : 'transparent'}
                        />
                      </TouchableOpacity>

                      {isSelected && (
                        <View style={styles.checkBadge}>
                          <Check size={13} color="#FFFFFF" strokeWidth={3} />
                        </View>
                      )}
                    </View>

                    <View style={styles.cardInfo}>
                      <Text style={styles.cardName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.cardSub} numberOfLines={1}>
                        {item.sub}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.nextButton, !wizardData.destination && styles.disabledButton]}
          disabled={!wizardData.destination}
          onPress={() => navigation.navigate('WizardDates')}
          activeOpacity={0.88}
        >
          <Text style={styles.nextButtonText}>Tiếp tục</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    paddingVertical: 10,
    backgroundColor: '#FCFDFF',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicator: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  stepText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  progressBar: {
    width: '100%',
    height: 5,
    backgroundColor: '#E8EEFB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0A1680',
    borderRadius: 3,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FBEDB0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 110,
  },
  titleSection: {
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 46,
    gap: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0A1680',
    fontWeight: '500',
  },
  mascotTipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#F1B94C',
    borderRadius: 18,
    padding: 12,
    gap: 12,
    marginBottom: 18,
  },
  mascotTipImg: {
    width: 60,
    height: 60,
  },
  mascotTipTextWrap: {
    flex: 1,
  },
  mascotTipTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  mascotTipDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
    marginTop: 2,
  },
  sectionWrap: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0A1680',
  },
  sectionAction: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
  sectionSubAction: {
    fontSize: 11,
    color: '#94A3B8',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8EEFB',
    elevation: 1,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  selectedCard: {
    borderColor: '#0A1680',
    borderWidth: 2,
    backgroundColor: '#F8FAFC',
  },
  cardImageWrapper: {
    position: 'relative',
    height: 110,
    width: '100%',
    backgroundColor: '#E8EEFB',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    padding: 10,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  nextButton: {
    backgroundColor: '#0A1680',
    borderRadius: 28,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
