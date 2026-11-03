import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Sparkles,
} from 'lucide-react-native';
import { LocalImages } from '../../assets/images';

interface Props {
  navigation: any;
}

export const CommunityFeedScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'following'>('explore');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({ 'p-1': true });
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});

  const posts = [
    {
      id: 'p-1',
      author: 'Linh Chi',
      initials: 'LC',
      avatarBg: '#0A1680',
      time: '2 giờ trước',
      location: 'Bãi Sao, Phú Quốc',
      text: 'Hoàng hôn ở Bãi Sao thật sự đẹp ngoài mong đợi! Nước biển trong xanh, cát trắng mịn như kem và không quá đông đúc vào buổi chiều tà. Highly recommend các bạn nên thuê sup chèo ra xa một chút ngắm mặt trời lặn nhé! 🌴🌅',
      image: LocalImages.beach,
      likes: 244,
      comments: 32,
    },
    {
      id: 'p-2',
      author: 'Hoàng Nam',
      initials: 'HN',
      avatarBg: '#2563EB',
      time: '5 giờ trước',
      location: 'Bà Nà Hills, Đà Nẵng',
      text: 'Một sáng thức dậy giữa mây ngàn tại Cầu Vàng! Lên cáp treo chuyến sớm nhất lúc 7h sáng nên vắng người, chụp được bộ ảnh siêu ưng ý. Bé Sao Lumi gợi ý khung giờ này chuẩn đét luôn ✨',
      image: LocalImages.bridge,
      likes: 189,
      comments: 24,
    },
    {
      id: 'p-3',
      author: 'Minh Anh',
      initials: 'MA',
      avatarBg: '#059669',
      time: '1 ngày trước',
      location: 'Phố cổ Hội An',
      text: 'Dạo phố Hội lúc lên đèn hoa đăng. Thưởng thức cao lầu và cà phê Faifo view tầng thượng ngắm mái ngói rêu phong. Nhịp sống ở đây chậm rãi và bình yên đến lạ!',
      image: LocalImages.town,
      likes: 310,
      comments: 45,
    },
  ];

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedPosts((prev) => {
      const next = !prev[id];
      Alert.alert(next ? 'Đã lưu' : 'Đã bỏ lưu', next ? 'Đã lưu bài viết vào bộ sưu tập!' : 'Đã bỏ lưu bài viết.');
      return { ...prev, [id]: next };
    });
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

        <View style={styles.searchBar}>
          <Search size={16} color="#64748B" />
          <Text style={styles.searchPlaceholder}>Tìm trong cộng đồng TravAIy...</Text>
        </View>

        <TouchableOpacity
          style={styles.postBtn}
          onPress={() => navigation.navigate('CreatePost')}
          activeOpacity={0.85}
        >
          <Plus size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'explore' && styles.tabItemActive]}
          onPress={() => setActiveTab('explore')}
        >
          <Text style={[styles.tabText, activeTab === 'explore' && styles.tabTextActive]}>
            Khám phá
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'following' && styles.tabItemActive]}
          onPress={() => setActiveTab('following')}
        >
          <Text style={[styles.tabText, activeTab === 'following' && styles.tabTextActive]}>
            Đang theo dõi
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post) => {
          const isLiked = !!likedPosts[post.id];
          const isSaved = !!bookmarkedPosts[post.id];
          return (
            <View key={post.id} style={styles.postCard}>
              {/* Author Header */}
              <View style={styles.authorRow}>
                <View style={[styles.avatar, { backgroundColor: post.avatarBg }]}>
                  <Text style={styles.avatarText}>{post.initials}</Text>
                </View>

                <View style={styles.authorInfo}>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <View style={styles.locRow}>
                    <MapPin size={11} color="#64748B" />
                    <Text style={styles.locText}>
                      {post.location} · {post.time}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.bookmarkTouch}
                  onPress={() => toggleBookmark(post.id)}
                >
                  <Bookmark
                    size={18}
                    color={isSaved ? '#0A1680' : '#94A3B8'}
                    fill={isSaved ? '#0A1680' : 'none'}
                  />
                </TouchableOpacity>
              </View>

              {/* Text */}
              <Text style={styles.postText}>{post.text}</Text>

              {/* Media Image */}
              {post.image && (
                <Image source={post.image} style={styles.postImg} resizeMode="cover" />
              )}

              {/* Actions Footer */}
              <View style={styles.actionsFooter}>
                <TouchableOpacity
                  style={styles.actionItem}
                  onPress={() => toggleLike(post.id)}
                  activeOpacity={0.8}
                >
                  <Heart
                    size={19}
                    color={isLiked ? '#EF4444' : '#64748B'}
                    fill={isLiked ? '#EF4444' : 'none'}
                  />
                  <Text style={[styles.actionNum, isLiked && styles.actionNumLiked]}>
                    {post.likes + (isLiked && post.id !== 'p-1' ? 1 : 0)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionItem}
                  onPress={() => Alert.alert('Bình luận', `Đang mở ${post.comments} bình luận...`)}
                  activeOpacity={0.8}
                >
                  <MessageCircle size={18} color="#64748B" />
                  <Text style={styles.actionNum}>{post.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionItem}
                  onPress={() => Alert.alert('Chia sẻ', 'Đã sao chép liên kết bài viết!')}
                  activeOpacity={0.8}
                >
                  <Share2 size={18} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
        activeOpacity={0.85}
      >
        <Plus size={22} color="#FFFFFF" />
        <Text style={styles.fabText}>Viết bài</Text>
      </TouchableOpacity>
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
    height: 38,
    gap: 8,
  },
  searchPlaceholder: {
    fontSize: 12,
    color: '#64748B',
  },
  postBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
    paddingHorizontal: 20,
  },
  tabItem: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#0A1680',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0A1680',
    fontWeight: '800',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 80,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  authorInfo: {
    flex: 1,
    gap: 2,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locText: {
    fontSize: 11,
    color: '#64748B',
  },
  bookmarkTouch: {
    padding: 4,
  },
  postText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
  postImg: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  actionsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 4,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionNum: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  actionNumLiked: {
    color: '#EF4444',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    backgroundColor: '#0A1680',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  fabText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
