import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  Camera,
  FlipHorizontal2,
  ImagePlus,
  Sparkles,
  Check,
  Share2,
  FolderPlus,
} from 'lucide-react-native';
import { LocalImages } from '../../assets/images';

interface Props {
  navigation: any;
}

export const PhotoboothScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedFrame, setSelectedFrame] = useState<'sea' | 'vintage' | 'coffee'>('sea');
  const [hasCaptured, setHasCaptured] = useState(false);

  const frames = [
    { id: 'sea', name: 'Biển xanh 🌊', bg: '#EFF6FF', border: '#93B2F8' },
    { id: 'vintage', name: 'Hoài cổ 🎞️', bg: '#FDFBF7', border: '#D97706' },
    { id: 'coffee', name: 'Cà phê ☕', bg: '#FFFBEB', border: '#F1B94C' },
  ];

  const handleCapture = () => {
    setHasCaptured(true);
  };

  const handleSaveToJournal = () => {
    Alert.alert('Thành công! 🎉', 'Đã lưu ảnh photobooth vào Nhật ký hành trình!', [
      { text: 'Xem album', onPress: () => navigation.navigate('JournalAlbum') },
      { text: 'Chụp tiếp', onPress: () => setHasCaptured(false) },
    ]);
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
          <ChevronLeft size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Photobooth Chuyến đi</Text>
          <Text style={styles.headerSub}>Khung ảnh check-in độc quyền</Text>
        </View>

        <View style={{ width: 38 }} />
      </View>

      {/* Frame selector pills */}
      <View style={styles.framesRow}>
        {frames.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[
              styles.frameChip,
              selectedFrame === f.id && styles.frameChipActive,
            ]}
            onPress={() => setSelectedFrame(f.id as any)}
          >
            <Text
              style={[
                styles.frameText,
                selectedFrame === f.id && styles.frameTextActive,
              ]}
            >
              {f.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Viewfinder Polaroid Frame */}
      <View style={styles.viewfinderContainer}>
        <View style={[styles.polaroidCard, { backgroundColor: frames.find((f) => f.id === selectedFrame)?.bg }]}>
          <View style={styles.polaroidPhotoBox}>
            <Image
              source={hasCaptured ? LocalImages.beach : LocalImages.vietnamHero}
              style={styles.photoImg}
              resizeMode="cover"
            />
            {!hasCaptured && (
              <View style={styles.viewfinderCrosshair}>
                <View style={styles.crosshairSquare} />
              </View>
            )}
          </View>

          {/* Polaroid Bottom Caption */}
          <View style={styles.polaroidCaption}>
            <View style={styles.captionTop}>
              <Text style={styles.captionLocation}>Bãi biển Mỹ Khê · Đà Nẵng</Text>
              <Text style={styles.captionDate}>16/10/2026</Text>
            </View>
            <View style={styles.brandStamp}>
              <Sparkles size={11} color="#0A1680" />
              <Text style={styles.brandStampText}>TravAIy Polaroid Moment</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Shutter / Actions Controls */}
      <View style={styles.controlsBottom}>
        {hasCaptured ? (
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.retakeBtn}
              onPress={() => setHasCaptured(false)}
            >
              <Text style={styles.retakeBtnText}>Chụp lại</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveJournalBtn}
              onPress={handleSaveToJournal}
            >
              <FolderPlus size={18} color="#FFFFFF" />
              <Text style={styles.saveJournalBtnText}>Lưu vào Album</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.shutterRow}>
            <TouchableOpacity
              style={styles.sideBtn}
              onPress={() => Alert.alert('Thư viện', 'Chọn ảnh từ thiết bị...')}
            >
              <ImagePlus size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shutterBtn}
              onPress={handleCapture}
              activeOpacity={0.8}
            >
              <View style={styles.shutterInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sideBtn}
              onPress={() => Alert.alert('Đổi camera', 'Đã chuyển đổi camera!')}
            >
              <FlipHorizontal2 size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071938',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: 11,
    color: '#93B2F8',
    marginTop: 2,
  },
  framesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  frameChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  frameChipActive: {
    backgroundColor: '#FFFFFF',
  },
  frameText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  frameTextActive: {
    color: '#0A1680',
  },
  viewfinderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  polaroidCard: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 20,
    padding: 14,
    paddingBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  polaroidPhotoBox: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  viewfinderCrosshair: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crosshairSquare: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
  },
  polaroidCaption: {
    paddingTop: 12,
    gap: 4,
  },
  captionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captionLocation: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E293B',
  },
  captionDate: {
    fontSize: 10,
    color: '#64748B',
  },
  brandStamp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandStampText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: 0.8,
  },
  controlsBottom: {
    paddingBottom: 36,
    paddingHorizontal: 20,
  },
  shutterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sideBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  retakeBtn: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
  },
  retakeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  saveJournalBtn: {
    flex: 2,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 18,
  },
  saveJournalBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
