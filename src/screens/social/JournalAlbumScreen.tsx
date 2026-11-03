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
import { useTravel } from '../../features/travel/TravelContext';
import { LocalImages } from '../../assets/images';
import { resolveImageSource } from '../../theme/imageHelper';
import { ArrowLeft, Camera, Heart, MapPin, Plus, Share2, Sparkles } from 'lucide-react-native';

interface PhotoItem {
  id: string;
  src: any;
  title: string;
  location: string;
  date: string;
  likes: number;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 'p1',
    src: LocalImages.beach,
    title: 'Bình minh rực rỡ bên biển Mỹ Khê',
    location: 'Bãi biển Mỹ Khê, Đà Nẵng',
    date: '17/10/2026',
    likes: 24,
  },
  {
    id: 'p2',
    src: LocalImages.bridge,
    title: 'Săn mây trên Cầu Vàng Bà Nà',
    location: 'Bà Nà Hills, Đà Nẵng',
    date: '18/10/2026',
    likes: 42,
  },
  {
    id: 'p3',
    src: LocalImages.town,
    title: 'Phố cổ Hội An khi hoàng hôn buông',
    location: 'Phố cổ Hội An, Quảng Nam',
    date: '19/10/2026',
    likes: 38,
  },
  {
    id: 'p4',
    src: LocalImages.food,
    title: 'Bữa tiệc hải sản tươi sống Năm Đảnh',
    location: 'Sơn Trà, Đà Nẵng',
    date: '17/10/2026',
    likes: 19,
  },
  {
    id: 'p5',
    src: LocalImages.dalatCabin,
    title: 'Chiều bình yên nơi đồi thông mộng mơ',
    location: 'Trại Mát, Đà Lạt',
    date: '16/10/2026',
    likes: 56,
  },
  {
    id: 'p6',
    src: LocalImages.bay,
    title: 'Ngồi thuyền chèo xuôi dòng Tràng An',
    location: 'Tràng An, Ninh Bình',
    date: '15/10/2026',
    likes: 31,
  },
];

export const JournalAlbumScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { plan } = useTravel();
  const [photoList, setPhotoList] = useState(PHOTOS);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTakePhoto = () => {
    Alert.alert(
      'Mô phỏng chụp ảnh',
      'Đã kích hoạt camera và tự động lưu khoảnh khắc vào Album kỷ niệm chuyến đi!',
      [{ text: 'Tuyệt vời', style: 'default' }]
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
          <Text style={styles.headerTitle}>Album kỷ niệm</Text>
          <Text style={styles.headerSub}>Kho ảnh chuyến đi {plan ? plan.destination : 'Việt Nam'}</Text>
        </View>
        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={handleTakePhoto}
          activeOpacity={0.8}
        >
          <Camera size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Bé Sao Lumi Mascot Memory Spotlight */}
        <View style={styles.mascotBanner}>
          <Image
            source={LocalImages.mascotCool}
            style={styles.mascotImg}
            resizeMode="contain"
          />
          <View style={styles.mascotContent}>
            <View style={styles.badgeRow}>
              <Sparkles size={12} color="#B45309" />
              <Text style={styles.badgeText}>NHẬT KÝ ẢNH BÉ SAO LUMI</Text>
            </View>
            <Text style={styles.mascotTitle}>Lưu giữ khoảnh khắc đẹp nhất</Text>
            <Text style={styles.mascotSub}>
              Mọi bức ảnh chụp trong chuyến đi được tự động gắn vị trí và sắp xếp theo ngày trên bản đồ.
            </Text>
          </View>
        </View>

        {/* Hero Memory Card */}
        <TouchableOpacity
          style={styles.heroCard}
          onPress={() => navigation.navigate('CreateRecap')}
          activeOpacity={0.9}
        >
          <Image source={LocalImages.beach} style={styles.heroCardImg} />
          <View style={styles.heroCardOverlay} />
          <View style={styles.heroCardBody}>
            <Text style={styles.heroCardEyebrow}>KHOẢNH KHẮC TIÊU BIỂU · CHẠM ĐỂ TẠO RECAP VIDEO</Text>
            <Text style={styles.heroCardTitle}>Bình minh bên biển xanh</Text>
            <Text style={styles.heroCardDate}>17 Tháng 10, 2026 · Đà Nẵng</Text>
          </View>
        </TouchableOpacity>

        {/* Grid Photos */}
        <View style={styles.gridHeaderRow}>
          <Text style={styles.gridHeading}>Tất cả ảnh ({photoList.length})</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Photobooth')}>
            <Text style={styles.gridAction}>+ Chụp Photobooth</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.photoGrid}>
          {photoList.map((item) => {
            const isLiked = !!likedMap[item.id];
            return (
              <View key={item.id} style={styles.photoCard}>
                <View style={styles.photoWrapper}>
                  <Image source={resolveImageSource(item.src)} style={styles.photoImg} />
                  <TouchableOpacity
                    style={styles.likeBtn}
                    onPress={() => toggleLike(item.id)}
                    activeOpacity={0.8}
                  >
                    <Heart
                      size={15}
                      color={isLiked ? '#F43F5E' : '#FFFFFF'}
                      fill={isLiked ? '#F43F5E' : 'transparent'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.photoInfo}>
                  <Text style={styles.photoTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.locationRow}>
                    <MapPin size={11} color="#64748B" />
                    <Text style={styles.photoLocation} numberOfLines={1}>
                      {item.location}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
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
    paddingVertical: 12,
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
  cameraBtn: {
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
    marginBottom: 16,
  },
  mascotImg: { width: 52, height: 52 },
  mascotContent: { flex: 1 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  badgeText: { fontSize: 10, fontWeight: '800', color: '#B45309' },
  mascotTitle: { fontSize: 13, fontWeight: '800', color: '#0F172A', marginTop: 2 },
  mascotSub: { fontSize: 11, color: '#64748B', lineHeight: 15, marginTop: 2 },
  heroCard: {
    height: 180,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  heroCardImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroCardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    backgroundColor: 'rgba(10, 22, 128, 0.65)',
  },
  heroCardBody: { position: 'absolute', bottom: 14, left: 16, right: 16 },
  heroCardEyebrow: { fontSize: 9, fontWeight: '700', color: '#FBEDB0', letterSpacing: 1 },
  heroCardTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginTop: 2 },
  heroCardDate: { fontSize: 11, color: '#E2E8F0', marginTop: 2 },
  gridHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridHeading: { fontSize: 15, fontWeight: '800', color: '#0A1680' },
  gridAction: { fontSize: 12, fontWeight: '700', color: '#0A1680' },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  photoCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8EEFB',
    elevation: 2,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  photoWrapper: { position: 'relative', width: '100%', height: 120 },
  photoImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  likeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoInfo: { padding: 10 },
  photoTitle: { fontSize: 12, fontWeight: '800', color: '#0F172A' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  photoLocation: { fontSize: 10, color: '#64748B', flex: 1 },
});
