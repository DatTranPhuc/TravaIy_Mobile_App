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
} from 'react-native';
import { Colors } from '../../theme/colors';
import { useTravel } from '../../features/travel/TravelContext';
import { MOCK_DESTINATIONS } from '../../data/mockData';
import { LocalImages } from '../../assets/images';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';
import {
  Search,
  ArrowUpRight,
  Bell,
  Building2,
  Map,
  Users,
  CreditCard,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
} from 'lucide-react-native';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { plan, setWizardData } = useTravel();
  const [likedPost, setLikedPost] = useState(false);

  const handleSelectDestination = (dest: (typeof MOCK_DESTINATIONS)[0]) => {
    setWizardData((prev) => ({
      ...prev,
      destination: dest.title,
      destinationTagline: dest.tagline,
      destinationImage: dest.image,
    }));
    navigation.navigate('WizardDestination');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header with full logo */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={LocalImages.logoFull}
            style={styles.logoFull}
            resizeMode="contain"
          />
          <Text style={styles.headerTagline}>Đến một nơi. Mang về nhiều điều.</Text>
        </View>

        <TouchableOpacity style={styles.bellButton} activeOpacity={0.8}>
          <Bell size={21} color="#0A1680" />
          <View style={styles.bellBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('SearchFilter')}
          activeOpacity={0.85}
        >
          <Search size={18} color="#64748B" />
          <Text style={styles.searchPlaceholder}>Bạn muốn đi đâu?</Text>
          <View style={styles.searchArrow}>
            <ArrowUpRight size={17} color="#0A1680" />
          </View>
        </TouchableOpacity>

        {/* Cinematic Hero Section */}
        <View style={styles.cinematicCard}>
          <Image
            source={LocalImages.vietnamHero}
            style={styles.cinematicImage}
            resizeMode="cover"
          />
          <View style={styles.cinematicDarkGradientTop} />
          <View style={styles.cinematicDarkGradientBottom} />

          <View style={styles.heroCaptionWrap}>
            <Text style={styles.heroCaption}>VIỆT NAM · ẢNH MINH HỌA</Text>
          </View>

          <View style={styles.cinematicOverlay}>
            <Text style={styles.heroEyebrow}>CHUYẾN ĐI TIẾP THEO</Text>
            <Text style={styles.heroHeadline}>Khám phá{'\n'}Việt Nam.</Text>
            <Text style={styles.heroSub}>
              Chọn nơi muốn đến.{'\n'}Lên lịch theo cách của bạn.
            </Text>

            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => navigation.navigate('WizardDestination')}
              activeOpacity={0.85}
            >
              <Text style={styles.heroBtnText}>Chọn điểm đến</Text>
              <ArrowUpRight size={17} color="#0A1680" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bé Sao Lumi Mascot Greeting Banner */}
        <View style={styles.mascotBanner}>
          <View style={styles.mascotAura}>
            <Image
              source={LocalImages.lumiWave}
              style={styles.mascotBannerImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.mascotBannerTextWrap}>
            <Text style={styles.mascotBannerTitle}>Xin chào! Mình là Bé Sao Lumi ✨</Text>
            <Text style={styles.mascotBannerSub}>
              Cùng mình lên lịch trình du lịch thông minh, tối ưu thời gian và chi phí nhé!
            </Text>
          </View>
        </View>

        {/* Quick Links Row */}
        <View style={styles.quickLinksRow}>
          <TouchableOpacity
            style={styles.quickLinkBtn}
            onPress={() => navigation.navigate('Stays')}
            activeOpacity={0.8}
          >
            <View style={[styles.quickLinkIcon, { backgroundColor: '#ECFDF5' }]}>
              <Building2 size={20} color="#059669" />
            </View>
            <Text style={styles.quickLinkText}>Tìm chỗ ở</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLinkBtn}
            onPress={() => navigation.navigate('TravelWallet')}
            activeOpacity={0.8}
          >
            <View style={[styles.quickLinkIcon, { backgroundColor: '#EFF6FF' }]}>
              <CreditCard size={20} color="#2563EB" />
            </View>
            <Text style={styles.quickLinkText}>Ví giấy tờ</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLinkBtn}
            onPress={() => navigation.navigate('GroupSpace')}
            activeOpacity={0.8}
          >
            <View style={[styles.quickLinkIcon, { backgroundColor: '#EDE9FE' }]}>
              <Users size={20} color="#7C3AED" />
            </View>
            <Text style={styles.quickLinkText}>Nhóm đi</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Chuyến đi hiện tại (Active Plan) */}
        {plan && (
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionHeaderTitle}>CHUYẾN ĐI ĐANG LẬP</Text>

            <TouchableOpacity
              style={styles.activeTripCard}
              onPress={() => navigation.navigate('TripOverview')}
              activeOpacity={0.85}
            >
              <Image source={LocalImages.bridge} style={styles.activeTripImg} resizeMode="cover" />
              <View style={styles.activeTripInfo}>
                <Text style={styles.activeTripEyebrow}>TIẾP TỤC LÊN KẾ HOẠCH</Text>
                <Text style={styles.activeTripDest}>
                  {plan.destination} · {plan.days} ngày
                </Text>
                <Text style={styles.activeTripStay}>
                  {plan.stayId ? 'Mây Biển Retreat' : 'Chọn chỗ ở để gợi ý lộ trình'}
                </Text>
              </View>
              <ArrowUpRight size={20} color="#0A1680" />
            </TouchableOpacity>
          </View>
        )}

        {/* Gợi ý điểm đến */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionTitleRow}>
            <View>
              <Text style={styles.sectionEyebrow}>THÊM MỘT LÝ DO ĐỂ ĐI</Text>
              <Text style={styles.sectionTitle}>Gợi ý điểm đến</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ExploreTab')}>
              <Text style={styles.seeAllText}>Xem thêm ➔</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.destStrip}>
            {[
              { id: 'danang', name: 'Đà Nẵng', image: LocalImages.bridge, sub: 'Thành phố biển' },
              { id: 'hoian', name: 'Hội An', image: LocalImages.town, sub: 'Phố cổ rực rỡ' },
              { id: 'dalat', name: 'Đà Lạt', image: LocalImages.dalatCabin, sub: 'Thành phố ngàn hoa' },
              { id: 'phuquoc', name: 'Phú Quốc', image: LocalImages.beach, sub: 'Thiên đường biển' },
            ].map((d) => (
              <TouchableOpacity
                key={d.id}
                style={styles.destStripCard}
                onPress={() => {
                  const target = MOCK_DESTINATIONS.find((x) => x.id === d.id);
                  if (target) handleSelectDestination(target);
                  else navigation.navigate('WizardDestination');
                }}
                activeOpacity={0.85}
              >
                <Image source={d.image} style={styles.destStripImage} resizeMode="cover" />
                <View style={styles.destStripOverlay} />
                <Text style={styles.destStripName}>{d.name}</Text>
                <Text style={styles.destStripSub}>{d.sub}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Community Post Preview */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.commTitleGroup}>
              <Users size={20} color="#0A1680" />
              <Text style={styles.sectionTitle}>Cộng đồng TravAIy</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CommunityFeed')}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#0A1680' }}>Xem thêm ›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.communityCard}
            onPress={() => navigation.navigate('CommunityFeed')}
            activeOpacity={0.9}
          >
            <View style={styles.commAuthorRow}>
              <View style={styles.commAvatar}>
                <Text style={styles.commAvatarText}>LC</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.commAuthorName}>Linh Chi</Text>
                <Text style={styles.commTime}>2 giờ trước · Bãi Sao, Phú Quốc</Text>
              </View>
              <ArrowUpRight size={18} color="#0A1680" />
            </View>

            <View style={styles.commPostBodyRow}>
              <Text style={styles.commPostText}>
                Hoàng hôn ở Bãi Sao thật sự đẹp ngoài mong đợi! Nước biển trong xanh, cát trắng mịn.
              </Text>
              <Image source={LocalImages.beach} style={styles.commPostThumb} resizeMode="cover" />
            </View>

            <View style={styles.commActionsRow}>
              <TouchableOpacity
                style={styles.commActionBtn}
                onPress={() => setLikedPost(!likedPost)}
              >
                <Heart
                  size={18}
                  color={likedPost ? '#EF4444' : '#64748B'}
                  fill={likedPost ? '#EF4444' : 'transparent'}
                />
                <Text style={styles.commActionText}>{likedPost ? 244 : 243}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.commActionBtn}>
                <MessageCircle size={18} color="#64748B" />
                <Text style={styles.commActionText}>32</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.commActionBtn}>
                <Share2 size={18} color="#64748B" />
              </TouchableOpacity>

              <Text style={styles.sampleBadge}>Bài mẫu</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 38,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flex: 1,
  },
  logoFull: {
    height: 34,
    width: 130,
    marginLeft: -4,
  },
  headerTagline: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  scrollContent: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  searchArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cinematicCard: {
    borderRadius: 26,
    overflow: 'hidden',
    height: 360,
    position: 'relative',
    backgroundColor: '#071938',
    justifyContent: 'flex-end',
  },
  cinematicImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  cinematicDarkGradientTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '72%',
    backgroundColor: 'rgba(7, 25, 56, 0.45)',
  },
  cinematicDarkGradientBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '52%',
    backgroundColor: 'rgba(7, 25, 56, 0.65)',
  },
  cinematicOverlay: {
    padding: 20,
    zIndex: 2,
  },
  heroCaptionWrap: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  heroCaption: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FBEDB0',
    letterSpacing: 1.2,
  },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EFF3FF',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroHeadline: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 37,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 12,
    color: '#EFF3FF',
    lineHeight: 18,
    marginBottom: 16,
  },
  heroBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  heroBtnText: {
    color: '#0A1680',
    fontSize: 13,
    fontWeight: '800',
  },
  mascotBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#E8EEFB',
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  mascotAura: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotBannerImg: {
    width: 52,
    height: 52,
  },
  mascotBannerTextWrap: {
    flex: 1,
  },
  mascotBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A1680',
    marginBottom: 2,
  },
  mascotBannerSub: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
  },
  quickLinksRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickLinkBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  quickLinkIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionWrap: {
    gap: 12,
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  activeTripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  activeTripImg: {
    width: 66,
    height: 72,
    borderRadius: 14,
  },
  activeTripInfo: {
    flex: 1,
  },
  activeTripEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0A1680',
    letterSpacing: 0.5,
  },
  activeTripDest: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 2,
  },
  activeTripStay: {
    fontSize: 12,
    color: '#64748B',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
  },
  destStrip: {
    gap: 12,
  },
  destStripCard: {
    width: 140,
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    padding: 12,
    backgroundColor: '#0A1680',
  },
  destStripImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  destStripOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 95,
    backgroundColor: 'rgba(7, 25, 56, 0.72)',
  },
  destStripName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  destStripSub: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    marginTop: 2,
  },
  commTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  communityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  commAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  commAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commAvatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  commAuthorName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  commTime: {
    fontSize: 11,
    color: '#64748B',
  },
  commPostBodyRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginVertical: 4,
  },
  commPostText: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
  commPostThumb: {
    width: 88,
    height: 96,
    borderRadius: 14,
  },
  commActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  commActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  commActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  sampleBadge: {
    marginLeft: 'auto',
    fontSize: 11,
    color: '#94A3B8',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
});
