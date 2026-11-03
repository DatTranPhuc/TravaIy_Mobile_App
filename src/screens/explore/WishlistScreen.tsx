import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  Plus,
  Heart,
  FolderHeart,
  Star,
  MapPin,
  X,
  Share2,
} from 'lucide-react-native';
import { LocalImages } from '../../assets/images';

interface Props {
  navigation: any;
}

export const WishlistScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'collections' | 'places'>('collections');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newColName, setNewColName] = useState('');

  const [collections, setCollections] = useState([
    {
      id: 'c1',
      title: 'Cà phê săn mây Đà Lạt',
      count: 8,
      image: LocalImages.dalatCabin,
      tag: 'Đà Lạt · View núi',
    },
    {
      id: 'c2',
      title: 'Biển xanh miền Trung',
      count: 12,
      image: LocalImages.beach,
      tag: 'Đà Nẵng · Phú Quốc',
    },
    {
      id: 'c3',
      title: 'Ẩm thực & Quán ăn địa phương',
      count: 15,
      image: LocalImages.food,
      tag: 'Đà Nẵng · Hội An',
    },
    {
      id: 'c4',
      title: 'Góc chụp ảnh phố cổ',
      count: 6,
      image: LocalImages.town,
      tag: 'Hội An · Vintage',
    },
  ]);

  const [savedPlaces, setSavedPlaces] = useState([
    {
      id: 'tiem-tu-lung',
      name: 'Tiệm Cà Phê Tú Lưng',
      category: 'Cà phê & Check-in',
      city: 'Đà Lạt',
      rating: 4.8,
      image: LocalImages.dalatCabin,
    },
    {
      id: 'my-khe',
      name: 'Bãi biển Mỹ Khê',
      category: 'Bãi biển',
      city: 'Đà Nẵng',
      rating: 4.9,
      image: LocalImages.beach,
    },
    {
      id: 'son-tra',
      name: 'Bán đảo Sơn Trà',
      category: 'Thiên nhiên',
      city: 'Đà Nẵng',
      rating: 4.9,
      image: LocalImages.bridge,
    },
  ]);

  const handleCreate = () => {
    if (!newColName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên bộ sưu tập');
      return;
    }
    const newCol = {
      id: `col-${Date.now()}`,
      title: newColName.trim(),
      count: 0,
      image: LocalImages.town,
      tag: 'Bộ sưu tập mới',
    };
    setCollections([newCol, ...collections]);
    setNewColName('');
    setShowCreateModal(false);
    Alert.alert('Thành công', 'Đã tạo bộ sưu tập mới!');
  };

  const handleRemovePlace = (id: string) => {
    setSavedPlaces((prev) => prev.filter((p) => p.id !== id));
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
          <Text style={styles.headerTitle}>Bộ sưu tập & Đã lưu</Text>
          <Text style={styles.headerSub}>{savedPlaces.length} địa điểm yêu thích</Text>
        </View>

        <TouchableOpacity
          style={styles.addIconBtn}
          onPress={() => setShowCreateModal(true)}
          activeOpacity={0.8}
        >
          <Plus size={20} color="#0A1680" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'collections' && styles.tabBtnActive]}
          onPress={() => setActiveTab('collections')}
        >
          <FolderHeart size={16} color={activeTab === 'collections' ? '#0A1680' : '#64748B'} />
          <Text style={[styles.tabText, activeTab === 'collections' && styles.tabTextActive]}>
            Bộ sưu tập ({collections.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'places' && styles.tabBtnActive]}
          onPress={() => setActiveTab('places')}
        >
          <Heart size={16} color={activeTab === 'places' ? '#0A1680' : '#64748B'} fill={activeTab === 'places' ? '#0A1680' : 'none'} />
          <Text style={[styles.tabText, activeTab === 'places' && styles.tabTextActive]}>
            Tất cả đã lưu ({savedPlaces.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'collections' ? (
          /* COLLECTIONS GRID */
          <View style={styles.collectionsGrid}>
            {collections.map((col) => (
              <TouchableOpacity
                key={col.id}
                style={styles.collectionCard}
                onPress={() => navigation.navigate('MainTabs', { screen: 'ExploreTab' })}
                activeOpacity={0.85}
              >
                <Image source={col.image} style={styles.colCover} resizeMode="cover" />
                <View style={styles.colOverlay} />

                <View style={styles.colContent}>
                  <View style={styles.colBadge}>
                    <Text style={styles.colBadgeText}>{col.count} địa điểm</Text>
                  </View>
                  <Text style={styles.colTitle} numberOfLines={2}>
                    {col.title}
                  </Text>
                  <Text style={styles.colTag}>{col.tag}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* SAVED PLACES LIST */
          <View style={styles.placesList}>
            {savedPlaces.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={styles.placeCard}
                onPress={() => navigation.navigate('PlaceDetail', { placeId: place.id })}
                activeOpacity={0.85}
              >
                <Image source={place.image} style={styles.placeThumb} resizeMode="cover" />

                <View style={styles.placeInfo}>
                  <Text style={styles.placeCat}>{place.category}</Text>
                  <Text style={styles.placeName} numberOfLines={1}>
                    {place.name}
                  </Text>
                  <View style={styles.placeMetaRow}>
                    <View style={styles.cityRow}>
                      <MapPin size={12} color="#64748B" />
                      <Text style={styles.cityText}>{place.city}</Text>
                    </View>
                    <View style={styles.ratingRow}>
                      <Star size={12} color="#D97706" fill="#D97706" />
                      <Text style={styles.ratingText}>{place.rating}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.heartBtn}
                  onPress={() => handleRemovePlace(place.id)}
                >
                  <Heart size={18} color="#EF4444" fill="#EF4444" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Create Collection Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tạo bộ sưu tập mới</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Tên bộ sưu tập</Text>
              <TextInput
                style={styles.textInput}
                placeholder="VD: Quán ăn ngon phải ghé..."
                value={newColName}
                onChangeText={setNewColName}
              />
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleCreate}
              activeOpacity={0.85}
            >
              <Text style={styles.submitBtnText}>Tạo bộ sưu tập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabBtnActive: {
    backgroundColor: '#EFF3FF',
    borderColor: '#0A1680',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0A1680',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  collectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  collectionCard: {
    width: '48%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    padding: 12,
    backgroundColor: '#071938',
  },
  colCover: {
    ...StyleSheet.absoluteFillObject,
  },
  colOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 25, 56, 0.45)',
  },
  colContent: {
    gap: 4,
  },
  colBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  colBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  colTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  colTag: {
    fontSize: 10,
    color: '#CBD5E1',
  },
  placesList: {
    gap: 12,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  placeThumb: {
    width: 68,
    height: 68,
    borderRadius: 14,
  },
  placeInfo: {
    flex: 1,
    gap: 3,
  },
  placeCat: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  placeName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  placeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 2,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cityText: {
    fontSize: 11,
    color: '#64748B',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
  },
  heartBtn: {
    padding: 8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0A1680',
  },
  formGroup: {
    gap: 6,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: '#1E293B',
  },
  submitBtn: {
    backgroundColor: '#0A1680',
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 6,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
