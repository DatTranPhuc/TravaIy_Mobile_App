import React, { useState, useEffect } from 'react';
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
  Share2,
  Download,
  Play,
  Pause,
  Music,
  Check,
  Sparkles,
} from 'lucide-react-native';
import { LocalImages } from '../assets/images';

interface Props {
  navigation: any;
}

export const TripRecapFinalScreen: React.FC<Props> = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      image: LocalImages.beach,
      title: 'Hành trình Đà Nẵng 3N2Đ',
      subtitle: 'Khởi đầu với biển xanh Mỹ Khê và nắng ấm',
      tag: 'Ngày 1 · 16/10',
    },
    {
      image: LocalImages.bridge,
      title: 'Chạm tay vào mây ngàn',
      subtitle: 'Khoảnh khắc diệu kỳ trên Cầu Vàng Bà Nà Hills',
      tag: 'Ngày 2 · 17/10',
    },
    {
      image: LocalImages.town,
      title: 'Đêm hoa đăng sông Hoài',
      subtitle: 'Phố cổ Hội An lung linh và bình yên',
      tag: 'Ngày 3 · 18/10',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const currentSlide = slides[activeSlide];

  const handleShareToCommunity = () => {
    Alert.alert('Chia sẻ', 'Đã chia sẻ Video Recap lên Cộng đồng TravAIy!', [
      { text: 'OK', onPress: () => navigation.navigate('CommunityFeed') },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Background Slide Image */}
      <Image source={currentSlide.image} style={styles.bgImage} resizeMode="cover" />
      <View style={styles.gradientScrim} />

      {/* Story Progress Segments */}
      <View style={styles.progressSegments}>
        {slides.map((_, idx) => (
          <View key={idx} style={styles.segmentTrack}>
            <View
              style={[
                styles.segmentFill,
                idx === activeSlide && styles.segmentFillActive,
                idx < activeSlide && styles.segmentFillDone,
              ]}
            />
          </View>
        ))}
      </View>

      {/* Floating Header */}
      <View style={styles.floatingHeader}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ChevronLeft size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.musicPill}>
          <Music size={12} color="#F1B94C" />
          <Text style={styles.musicPillText}>Chill Summer Beats</Text>
        </View>

        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => setIsPlaying(!isPlaying)}
          activeOpacity={0.8}
        >
          {isPlaying ? <Pause size={18} color="#FFFFFF" /> : <Play size={18} color="#FFFFFF" />}
        </TouchableOpacity>
      </View>

      {/* Center Tap Navigation Zones */}
      <View style={styles.tapZones}>
        <TouchableOpacity
          style={styles.tapLeft}
          onPress={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        />
        <TouchableOpacity
          style={styles.tapRight}
          onPress={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
        />
      </View>

      {/* Slide Captions */}
      <View style={styles.captionWrap}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>{currentSlide.tag}</Text>
        </View>
        <Text style={styles.slideTitle}>{currentSlide.title}</Text>
        <Text style={styles.slideSub}>{currentSlide.subtitle}</Text>

        {/* Stats Pill */}
        <View style={styles.statsPill}>
          <Sparkles size={14} color="#F1B94C" />
          <Text style={styles.statsPillText}>
            3 ngày • 11 địa điểm • 85 km di chuyển
          </Text>
        </View>
      </View>

      {/* Bottom Actions Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={handleShareToCommunity}
          activeOpacity={0.85}
        >
          <Share2 size={18} color="#FFFFFF" />
          <Text style={styles.shareBtnText}>Chia sẻ lên Cộng đồng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.finishBtn}
          onPress={() => navigation.navigate('JournalAlbum')}
          activeOpacity={0.85}
        >
          <Check size={18} color="#0A1680" />
          <Text style={styles.finishBtnText}>Hoàn tất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071938',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 25, 56, 0.45)',
  },
  progressSegments: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 20,
  },
  segmentTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  segmentFill: {
    height: '100%',
    width: '0%',
    backgroundColor: '#FFFFFF',
  },
  segmentFillActive: {
    width: '70%',
    backgroundColor: '#F1B94C',
  },
  segmentFillDone: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  floatingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    zIndex: 20,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  musicPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EFF6FF',
  },
  tapZones: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 10,
  },
  tapLeft: {
    flex: 1,
  },
  tapRight: {
    flex: 1,
  },
  captionWrap: {
    position: 'absolute',
    bottom: 96,
    left: 20,
    right: 20,
    zIndex: 20,
    gap: 8,
  },
  dayBadge: {
    backgroundColor: '#0A1680',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  dayBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EFF3FF',
  },
  slideTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 32,
  },
  slideSub: {
    fontSize: 13,
    color: '#E2E8F0',
    lineHeight: 18,
  },
  statsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginTop: 4,
  },
  statsPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    zIndex: 20,
  },
  shareBtn: {
    flex: 2,
    backgroundColor: '#0A1680',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 18,
  },
  shareBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  finishBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 18,
  },
  finishBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0A1680',
  },
});
