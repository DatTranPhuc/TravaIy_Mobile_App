import React from 'react';
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
import { Colors } from '../theme/colors';
import { useTravel } from '../features/travel/TravelContext';
import { LocalImages } from '../assets/images';
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Copy,
  Vote,
  MapPin,
  Wallet,
  ChevronRight,
  UserPlus,
  Crown,
} from 'lucide-react-native';

const MEMBERS = [
  { id: '1', name: 'Bạn', role: 'Trưởng nhóm', color: '#0A1680', status: 'Đang hoạt động' },
  { id: '2', name: 'Minh Anh', role: 'Thành viên', color: '#7C3AED', status: 'Online 5p trước' },
  { id: '3', name: 'Linh Chi', role: 'Thành viên', color: '#0284C7', status: 'Đã xem lịch' },
  { id: '4', name: 'Quang Huy', role: 'Thành viên', color: '#D97706', status: 'Vừa tham gia' },
];

export const GroupSpaceScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { plan, wizardData } = useTravel();
  const inviteCode = wizardData.inviteCode || 'TRAV123';

  const handleCopyCode = () => {
    Alert.alert('Đã sao chép', `Mã mời tham gia nhóm "${inviteCode}" đã được sao chép!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Không gian nhóm</Text>
        <TouchableOpacity style={styles.backBtn} onPress={handleCopyCode}>
          <UserPlus size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Mascot Tip */}
        <View style={styles.mascotTip}>
          <Image
            source={LocalImages.mascotWaving}
            style={styles.mascotImg}
            resizeMode="contain"
          />
          <View style={styles.mascotText}>
            <Text style={styles.mascotTitle}>BÉ SAO LUMI CHÀO CẢ NHÓM ✨</Text>
            <Text style={styles.mascotSub}>
              Cùng nhau chia sẻ lịch trình, quản lý chi phí và trò chuyện trong suốt chuyến đi {plan.destination} nhé!
            </Text>
          </View>
        </View>

        {/* Group Banner Card */}
        <View style={styles.groupCard}>
          <View style={styles.groupCardHeader}>
            <View>
              <Text style={styles.groupCardLabel}>Chuyến đi chung</Text>
              <Text style={styles.groupCardTitle}>{plan.destination}</Text>
            </View>
            <View style={styles.memberCountBadge}>
              <Users size={14} color={Colors.primary} />
              <Text style={styles.memberCountText}>{MEMBERS.length} người</Text>
            </View>
          </View>

          <View style={styles.inviteBox}>
            <View>
              <Text style={styles.inviteLabel}>Mã mời bạn bè</Text>
              <Text style={styles.inviteCode}>{inviteCode}</Text>
            </View>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopyCode}>
              <Copy size={16} color={Colors.primary} />
              <Text style={styles.copyBtnText}>Sao chép</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Group Actions */}
        <Text style={styles.sectionHeading}>Tiện ích nhóm</Text>
        <View style={styles.toolsGrid}>
          <TouchableOpacity
            style={styles.toolItem}
            onPress={() => navigation.navigate('GroupChat')}
            activeOpacity={0.8}
          >
            <View style={[styles.toolIconBox, { backgroundColor: '#EDE9FE' }]}>
              <MessageCircle size={22} color="#7C3AED" />
            </View>
            <Text style={styles.toolTitle}>Trò chuyện</Text>
            <Text style={styles.toolSub}>Thảo luận lịch trình</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toolItem}
            onPress={() => navigation.navigate('TripExpenses')}
            activeOpacity={0.8}
          >
            <View style={[styles.toolIconBox, { backgroundColor: '#E0F2FE' }]}>
              <Wallet size={22} color="#0284C7" />
            </View>
            <Text style={styles.toolTitle}>Chi tiêu</Text>
            <Text style={styles.toolSub}>Chia tiền nhóm</Text>
          </TouchableOpacity>
        </View>

        {/* Member List */}
        <View style={styles.membersHeader}>
          <Text style={styles.sectionHeading}>Thành viên đoàn ({MEMBERS.length})</Text>
          <TouchableOpacity onPress={handleCopyCode}>
            <Text style={styles.addMemberText}>+ Mời thêm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.membersList}>
          {MEMBERS.map((member) => (
            <View key={member.id} style={styles.memberRow}>
              <View style={[styles.memberAvatar, { backgroundColor: member.color }]}>
                <Text style={styles.memberAvatarText}>
                  {member.name.slice(0, 1).toUpperCase()}
                </Text>
              </View>

              <View style={styles.memberInfo}>
                <View style={styles.memberNameRow}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  {member.role === 'Trưởng nhóm' && (
                    <View style={styles.crownBadge}>
                      <Crown size={12} color="#D97706" />
                      <Text style={styles.crownText}>Trưởng nhóm</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.memberStatus}>{member.status}</Text>
              </View>

              <ChevronRight size={18} color={Colors.textSecondary} />
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
  content: { padding: 20, paddingBottom: 60, gap: 20 },
  groupCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  groupCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  groupCardLabel: { fontSize: 12, color: Colors.secondaryLight, fontWeight: '600', marginBottom: 2 },
  groupCardTitle: { fontSize: 24, fontWeight: '800', color: Colors.white },
  memberCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.card,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  memberCountText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  inviteBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inviteLabel: { fontSize: 11, color: 'rgba(255, 255, 255, 0.8)', marginBottom: 2 },
  inviteCode: { fontSize: 20, fontWeight: '800', color: Colors.secondaryLight, letterSpacing: 1 },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  copyBtnText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  sectionHeading: { fontSize: 16, fontWeight: '700', color: Colors.text },
  toolsGrid: { flexDirection: 'row', gap: 12 },
  toolItem: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toolIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  toolTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  toolSub: { fontSize: 12, color: Colors.textSecondary },
  membersHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addMemberText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  membersList: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  memberAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  memberInfo: { flex: 1 },
  memberNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  memberName: { fontSize: 15, fontWeight: '700', color: Colors.text },
  crownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  crownText: { fontSize: 10, fontWeight: '700', color: '#D97706' },
  memberStatus: { fontSize: 12, color: Colors.textSecondary },
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

