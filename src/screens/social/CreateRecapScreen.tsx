import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  Music,
  Smile,
  Sparkles,
  Check,
  CheckCircle2,
} from 'lucide-react-native';
import { LocalImages } from '../../assets/images';

interface Props {
  navigation: any;
}

export const CreateRecapScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([1, 2, 3, 4]);
  const [selectedMusic, setSelectedMusic] = useState('Chill Summer Beats 🎵');
  const [selectedFeeling, setSelectedFeeling] = useState('Tuyệt vời ✨');
  const [tripNote, setTripNote] = useState(
    'Chuyến đi Đà Nẵng 3N2Đ cùng bạn bè thật sự khó quên! Biển xanh ngắt, hải sản tươi ngon và rất nhiều kỷ niệm đẹp!'
  );

  const photos = [
    { id: 1, image: LocalImages.beach, title: 'Bãi biển Mỹ Khê' },
    { id: 2, image: LocalImages.bridge, title: 'Bà Nà Hills' },
    { id: 3, image: LocalImages.town, title: 'Phố cổ Hội An' },
    { id: 4, image: LocalImages.food, title: 'Hải sản Năm Đảnh' },
    { id: 5, image: LocalImages.dalatCabin, title: 'Cà phê view đẹp' },
    { id: 6, image: LocalImages.vietnamHero, title: 'Ngắm hoàng hôn' },
  ];

  const musicTracks = [
    'Chill Summer Beats 🎵',
    'Lofi Acoustic 🎸',
    'Biển & Hoàng Hôn 🌊',
    'Hành trình Tuổi trẻ ✈️',
  ];

  const feelings = ['Tuyệt vời ✨', 'Bình yên 🌿', 'Năng động 🔥', 'Ấm áp 💛'];

  const togglePhoto = (id: number) => {
    if (selectedPhotos.includes(id)) {
      if (selectedPhotos.length <= 1) {
        Alert.alert('Lưu ý', 'Cần chọn ít nhất 1 ảnh cho video recap!');
        return;
      }
      setSelectedPhotos(selectedPhotos.filter((p) => p !== id));
    } else {
      setSelectedPhotos([...selectedPhotos, id]);
    }
  };

  const handleNext = () => {
    navigation.navigate('TripRecapFinal');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelBtnText}>Hủy</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Tạo Recap Chuyến đi</Text>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>Tiếp tục ›</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Photos */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>1. Chọn ảnh nổi bật ({selectedPhotos.length}/6)</Text>
            <Text style={styles.sectionSub}>Chạm để chọn hoặc bỏ chọn</Text>
          </View>

          <View style={styles.photosGrid}>
            {photos.map((p) => {
              const isSelected = selectedPhotos.includes(p.id);
              return (
                <TouchableOpacity
                  key={p.id}
                  style={[styles.photoCard, isSelected && styles.photoCardSelected]}
                  onPress={() => togglePhoto(p.id)}
                  activeOpacity={0.85}
                >
                  <Image source={p.image} style={styles.photoImg} resizeMode="cover" />
                  <View style={[styles.selectBadge, isSelected && styles.selectBadgeActive]}>
                    {isSelected && <Check size={12} color="#FFFFFF" />}
                  </View>
                  <Text style={styles.photoLabel} numberOfLines={1}>
                    {p.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Step 2: Music */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <View style={styles.musicTitleRow}>
              <Music size={16} color="#0A1680" />
              <Text style={styles.sectionTitle}>2. Nhạc nền câu chuyện</Text>
            </View>
          </View>

          <View style={styles.pillsRow}>
            {musicTracks.map((track) => {
              const isSelected = selectedMusic === track;
              return (
                <TouchableOpacity
                  key={track}
                  style={[styles.musicChip, isSelected && styles.musicChipActive]}
                  onPress={() => setSelectedMusic(track)}
                >
                  <Text style={[styles.musicText, isSelected && styles.musicTextActive]}>
                    {track}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Step 3: Feeling */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <View style={styles.musicTitleRow}>
              <Smile size={16} color="#D97706" />
              <Text style={styles.sectionTitle}>3. Cảm xúc đọng lại</Text>
            </View>
          </View>

          <View style={styles.pillsRow}>
            {feelings.map((f) => {
              const isSelected = selectedFeeling === f;
              return (
                <TouchableOpacity
                  key={f}
                  style={[styles.feelingChip, isSelected && styles.feelingChipActive]}
                  onPress={() => setSelectedFeeling(f)}
                >
                  <Text style={[styles.feelingText, isSelected && styles.feelingTextActive]}>
                    {f}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Step 4: Trip Notes */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>4. Lời nhắn gửi chuyến đi</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={tripNote}
            onChangeText={setTripNote}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.generateBtn}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Sparkles size={18} color="#FFFFFF" />
          <Text style={styles.generateBtnText}>Tạo Video Recap với AI</Text>
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
  cancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  cancelBtnText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A1680',
  },
  nextBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  nextBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A1680',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  sectionWrap: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  sectionSub: {
    fontSize: 11,
    color: '#64748B',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photoCard: {
    width: '31%',
    height: 100,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  photoCardSelected: {
    borderWidth: 2.5,
    borderColor: '#0A1680',
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  selectBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBadgeActive: {
    backgroundColor: '#0A1680',
  },
  photoLabel: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    right: 4,
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  musicTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  musicChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  musicChipActive: {
    backgroundColor: '#0A1680',
    borderColor: '#0A1680',
  },
  musicText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  musicTextActive: {
    color: '#FFFFFF',
  },
  feelingChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  feelingChipActive: {
    backgroundColor: '#F1B94C',
    borderColor: '#D97706',
  },
  feelingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  feelingTextActive: {
    color: '#FFFFFF',
  },
  textArea: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 14,
    fontSize: 13,
    color: '#1E293B',
    minHeight: 90,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  generateBtn: {
    backgroundColor: '#0A1680',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  generateBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
