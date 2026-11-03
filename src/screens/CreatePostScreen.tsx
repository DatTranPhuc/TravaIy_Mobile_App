import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  ImagePlus,
  MapPin,
  Sparkles,
  Globe,
  X,
  Tag,
} from 'lucide-react-native';
import { LocalImages } from '../assets/images';

interface Props {
  navigation: any;
}

export const CreatePostScreen: React.FC<Props> = ({ navigation }) => {
  const [content, setContent] = useState(
    'Một ngày đáng nhớ tại Phú Quốc! Biển xanh ngắt, cát trắng mịn và đồ ăn siêu tươi ngon 🌴☀️'
  );
  const [locationName, setLocationName] = useState('Phú Quốc, Kiên Giang');
  const [tags, setTags] = useState(['#PhuQuoc', '#BienDep', '#AmThuc', '#TravAIy']);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(LocalImages.beach);

  const handlePublish = () => {
    if (!content.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung bài viết');
      return;
    }
    Alert.alert('Thành công! 🎉', 'Bài viết của bạn đã được đăng lên Cộng đồng TravAIy!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleAIWriter = () => {
    setContent(
      'Hành trình 3N2Đ tại Phú Quốc thật sự vượt ngoài mong đợi! Bình minh rực rỡ ở Bãi Sao, lặn ngắm san hô tại Hòn Móng Tay và kết lại bằng bữa tiệc hải sản tươi rói bên bờ biển. Cảm ơn Bé Sao Lumi đã tối ưu lộ trình siêu hợp lý! ✨'
    );
    Alert.alert('Bé Sao Lumi', 'Đã tối ưu hóa và thêm cảm xúc cho bài viết của bạn!');
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

        <Text style={styles.headerTitle}>Tạo bài viết</Text>

        <TouchableOpacity
          style={styles.publishBtn}
          onPress={handlePublish}
          activeOpacity={0.85}
        >
          <Text style={styles.publishBtnText}>Đăng</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Author Info */}
        <View style={styles.authorRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>HN</Text>
          </View>
          <View style={styles.authorText}>
            <Text style={styles.authorName}>Hoàng Nam</Text>
            <View style={styles.privacyBadge}>
              <Globe size={11} color="#64748B" />
              <Text style={styles.privacyText}>Công khai</Text>
            </View>
          </View>
        </View>

        {/* AI Helper Banner */}
        <TouchableOpacity
          style={styles.aiHelperBanner}
          onPress={handleAIWriter}
          activeOpacity={0.85}
        >
          <Sparkles size={16} color="#D97706" />
          <Text style={styles.aiHelperText}>Bé Sao Lumi gợi ý viết caption hấp dẫn</Text>
          <Text style={styles.aiHelperBtnText}>Thử ngay ›</Text>
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Chia sẻ trải nghiệm và cảm nhận chuyến đi của bạn..."
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
        />

        {/* Photo Preview */}
        {selectedPhoto && (
          <View style={styles.photoContainer}>
            <Image source={selectedPhoto} style={styles.previewImage} resizeMode="cover" />
            <TouchableOpacity
              style={styles.removePhotoBtn}
              onPress={() => setSelectedPhoto(null)}
            >
              <X size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Location selector */}
        <TouchableOpacity
          style={styles.toolRow}
          onPress={() => Alert.alert('Địa điểm', 'Đang chọn vị trí...')}
          activeOpacity={0.8}
        >
          <MapPin size={18} color="#0A1680" />
          <Text style={styles.toolText}>{locationName}</Text>
        </TouchableOpacity>

        {/* Tags Row */}
        <View style={styles.tagsContainer}>
          <View style={styles.tagsHeader}>
            <Tag size={16} color="#64748B" />
            <Text style={styles.tagsTitle}>Thẻ chủ đề:</Text>
          </View>
          <View style={styles.tagsList}>
            {tags.map((t, idx) => (
              <View key={idx} style={styles.tagChip}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Add photo CTA if none */}
        {!selectedPhoto && (
          <TouchableOpacity
            style={styles.addPhotoBtn}
            onPress={() => setSelectedPhoto(LocalImages.beach)}
            activeOpacity={0.85}
          >
            <ImagePlus size={20} color="#0A1680" />
            <Text style={styles.addPhotoText}>Thêm ảnh vào bài viết</Text>
          </TouchableOpacity>
        )}
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
  publishBtn: {
    backgroundColor: '#0A1680',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 16,
  },
  publishBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  authorText: {
    gap: 2,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  privacyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  privacyText: {
    fontSize: 11,
    color: '#64748B',
  },
  aiHelperBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  aiHelperText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  aiHelperBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0A1680',
  },
  textInput: {
    minHeight: 120,
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 22,
  },
  photoContainer: {
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    height: 220,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removePhotoBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  toolText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A1680',
  },
  tagsContainer: {
    gap: 8,
  },
  tagsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A1680',
  },
  addPhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0A1680',
    borderStyle: 'dashed',
    borderRadius: 18,
    paddingVertical: 16,
  },
  addPhotoText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
  },
});
