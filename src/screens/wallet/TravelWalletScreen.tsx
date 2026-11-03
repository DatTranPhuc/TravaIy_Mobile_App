import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { LocalImages } from '../../assets/images';
import {
  ArrowLeft,
  Plus,
  Plane,
  Building,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Eye,
  Share2,
} from 'lucide-react-native';

interface TravelDoc {
  id: string;
  type: 'ticket' | 'hotel' | 'id' | 'insurance';
  title: string;
  provider: string;
  code: string;
  time: string;
  isShared: boolean;
}

const INITIAL_DOCS: TravelDoc[] = [
  {
    id: 'doc-1',
    type: 'ticket',
    title: 'Vé máy bay khứ hồi Sài Gòn – Đà Nẵng',
    provider: 'Vietjet Air (Chuyến bay VJ628)',
    code: 'VJ-88291',
    time: '17/10/2026 · Khởi hành 06:15',
    isShared: true,
  },
  {
    id: 'doc-2',
    type: 'hotel',
    title: 'Xác nhận đặt phòng Mây Biển Retreat',
    provider: '2 Phòng Deluxe hướng biển · 2 đêm',
    code: 'MB-91283',
    time: 'Nhận phòng 17/10 · Trả phòng 19/10',
    isShared: true,
  },
  {
    id: 'doc-3',
    type: 'id',
    title: 'Căn cước công dân gắn chip',
    provider: 'Cục Cảnh sát QLHC về TTXH',
    code: '07920300****',
    time: 'Hết hạn: 15/08/2035',
    isShared: false,
  },
  {
    id: 'doc-4',
    type: 'insurance',
    title: 'Bảo hiểm du lịch nội địa',
    provider: 'Bảo Việt Insurance · Hạn mức 100tr/người',
    code: 'BV-TRIP-771',
    time: 'Hiệu lực: 17/10 - 20/10/2026',
    isShared: true,
  },
];

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'ticket', label: 'Vé máy bay' },
  { id: 'hotel', label: 'Chỗ nghỉ' },
  { id: 'id', label: 'Giấy tờ cá nhân' },
];

export const TravelWalletScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [filter, setFilter] = useState('all');
  const [docs, setDocs] = useState<TravelDoc[]>(INITIAL_DOCS);

  const filteredDocs = docs.filter(
    (d) => filter === 'all' || d.type === filter
  );

  const getDocIcon = (type: TravelDoc['type']) => {
    switch (type) {
      case 'ticket':
        return <Plane size={22} color="#0284C7" />;
      case 'hotel':
        return <Building size={22} color="#059669" />;
      case 'id':
        return <CreditCard size={22} color="#7C3AED" />;
      default:
        return <ShieldCheck size={22} color="#EA580C" />;
    }
  };

  const getDocBg = (type: TravelDoc['type']) => {
    switch (type) {
      case 'ticket':
        return '#E0F2FE';
      case 'hotel':
        return '#D1FAE5';
      case 'id':
        return '#EDE9FE';
      default:
        return '#FFEDD5';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ví giấy tờ du lịch</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddTravelDocument')}
        >
          <Plus size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
          {FILTERS.map((item) => {
            const isSelected = filter === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.filterChip, isSelected && styles.selectedFilterChip]}
                onPress={() => setFilter(item.id)}
              >
                <Text style={[styles.filterChipText, isSelected && styles.selectedFilterChipText]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Bé Sao Lumi Mascot Tip */}
        <View style={styles.mascotTip}>
          <Image
            source={LocalImages.mascotSuitcase}
            style={styles.mascotImg}
            resizeMode="contain"
          />
          <View style={styles.mascotText}>
            <Text style={styles.mascotTitle}>BÉ SAO LUMI NHẮC BẠN ✨</Text>
            <Text style={styles.mascotSub}>
              Lưu vé máy bay, phòng khách sạn và CCCD tại đây để dễ dàng xuất trình hoặc chia sẻ tức thì cho cả nhóm!
            </Text>
          </View>
        </View>

        <View style={styles.list}>
          {filteredDocs.map((doc) => (
            <View key={doc.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: getDocBg(doc.type) }]}>
                  {getDocIcon(doc.type)}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.docTitle}>{doc.title}</Text>
                  <Text style={styles.docProvider}>{doc.provider}</Text>
                </View>
              </View>

              <View style={styles.codeRow}>
                <View>
                  <Text style={styles.codeLabel}>Mã xác nhận / Số hiệu</Text>
                  <Text style={styles.codeValue}>{doc.code}</Text>
                </View>
                <View style={styles.badgeWrap}>
                  {doc.isShared ? (
                    <View style={styles.sharedBadge}>
                      <Text style={styles.sharedBadgeText}>Đã chia sẻ đoàn</Text>
                    </View>
                  ) : (
                    <View style={styles.privateBadge}>
                      <Text style={styles.privateBadgeText}>Cá nhân</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.timeRow}>
                <Text style={styles.timeText}>{doc.time}</Text>
                <TouchableOpacity
                  style={styles.viewBtn}
                  onPress={() => navigation.navigate('TravelDocumentDetail', { docId: doc.id })}
                >
                  <Eye size={15} color={Colors.primary} />
                  <Text style={styles.viewBtnText}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.text },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterWrap: { paddingVertical: 12 },
  filterList: { paddingHorizontal: 20, gap: 8 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedFilterChip: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 13, fontWeight: '600', color: Colors.text },
  selectedFilterChipText: { color: Colors.white },
  content: { paddingHorizontal: 20, paddingBottom: 60 },
  list: { gap: 14 },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  docProvider: { fontSize: 12, color: Colors.textSecondary },
  codeRow: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeLabel: { fontSize: 11, color: Colors.textSecondary, marginBottom: 2 },
  codeValue: { fontSize: 15, fontWeight: '800', color: Colors.primary, letterSpacing: 0.5 },
  badgeWrap: {},
  sharedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sharedBadgeText: { fontSize: 11, fontWeight: '700', color: '#059669' },
  privateBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  privateBadgeText: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  timeText: { fontSize: 12, color: Colors.textSecondary },
  viewBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewBtnText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  mascotTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#F1B94C',
    borderRadius: 18,
    padding: 12,
    gap: 12,
    marginBottom: 16,
  },
  mascotImg: { width: 50, height: 50 },
  mascotText: { flex: 1 },
  mascotTitle: { fontSize: 10, fontWeight: '800', color: '#B45309' },
  mascotSub: { fontSize: 11, color: '#475569', lineHeight: 16, marginTop: 2 },
});

