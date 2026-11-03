import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  Users,
  Compass,
  MapPin,
  Navigation,
  MessageSquare,
  Phone,
  Radio,
} from 'lucide-react-native';

interface Props {
  navigation: any;
}

export const GroupLocationScreen: React.FC<Props> = ({ navigation }) => {
  const [members, setMembers] = useState([
    {
      id: 'm1',
      name: 'Minh Anh',
      initials: 'MA',
      color: '#0A1680',
      status: 'Tại Bãi biển Mỹ Khê',
      distance: '450m',
      updated: 'Vừa xong',
      battery: '85%',
    },
    {
      id: 'm2',
      name: 'Linh Chi',
      initials: 'LC',
      color: '#2563EB',
      status: 'Tại Cà phê Faifo',
      distance: '1.2 km',
      updated: '3 phút trước',
      battery: '62%',
    },
    {
      id: 'm3',
      name: 'Quốc Đạt',
      initials: 'QD',
      color: '#059669',
      status: 'Đang di chuyển trên đường Võ Nguyên Giáp',
      distance: '2.8 km',
      updated: '5 phút trước',
      battery: '48%',
    },
    {
      id: 'm4',
      name: 'Phương Anh',
      initials: 'PA',
      color: '#D97706',
      status: 'Tại Chợ Cồn',
      distance: '3.5 km',
      updated: '12 phút trước',
      battery: '74%',
    },
  ]);

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
          <Text style={styles.headerTitle}>Vị trí thành viên nhóm</Text>
          <Text style={styles.headerSub}>Radar cập nhật thời gian thực</Text>
        </View>

        <View style={{ width: 38 }} />
      </View>

      {/* Radar Canvas Card */}
      <View style={styles.radarCard}>
        <View style={styles.radarCircle3} />
        <View style={styles.radarCircle2} />
        <View style={styles.radarCircle1} />
        <View style={styles.crosshairH} />
        <View style={styles.crosshairV} />

        {/* Center: Self */}
        <View style={styles.centerSelf}>
          <Text style={styles.centerSelfText}>Tôi</Text>
        </View>

        {/* Other Members on Radar */}
        <View style={[styles.radarBlip, { top: '32%', left: '68%', backgroundColor: '#0A1680' }]}>
          <Text style={styles.radarBlipText}>MA</Text>
        </View>
        <View style={[styles.radarBlip, { top: '65%', left: '28%', backgroundColor: '#2563EB' }]}>
          <Text style={styles.radarBlipText}>LC</Text>
        </View>
        <View style={[styles.radarBlip, { top: '22%', left: '35%', backgroundColor: '#059669' }]}>
          <Text style={styles.radarBlipText}>QD</Text>
        </View>
        <View style={[styles.radarBlip, { top: '75%', left: '72%', backgroundColor: '#D97706' }]}>
          <Text style={styles.radarBlipText}>PA</Text>
        </View>

        <View style={styles.radarBadge}>
          <Radio size={12} color="#10B981" />
          <Text style={styles.radarBadgeText}>Đang quét vệ tinh</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh sách thành viên ({members.length})</Text>

        <View style={styles.memberList}>
          {members.map((m) => (
            <View key={m.id} style={styles.memberCard}>
              <View style={[styles.memberAvatar, { backgroundColor: m.color }]}>
                <Text style={styles.memberInit}>{m.initials}</Text>
              </View>

              <View style={styles.memberInfo}>
                <View style={styles.memberNameRow}>
                  <Text style={styles.memberName}>{m.name}</Text>
                  <Text style={styles.memberDist}>Cách {m.distance}</Text>
                </View>
                <Text style={styles.memberStatus} numberOfLines={1}>
                  {m.status}
                </Text>
                <Text style={styles.memberMeta}>
                  Pin {m.battery} • Cập nhật {m.updated}
                </Text>
              </View>

              <View style={styles.memberActions}>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => navigation.navigate('GroupChat')}
                >
                  <MessageSquare size={16} color="#0A1680" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => Alert.alert('Gọi điện', `Đang gọi cho ${m.name}...`)}
                >
                  <Phone size={16} color="#059669" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
  radarCard: {
    height: 240,
    backgroundColor: '#071938',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  radarCircle3: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'rgba(147, 178, 248, 0.2)',
  },
  radarCircle2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: 'rgba(147, 178, 248, 0.3)',
  },
  radarCircle1: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(147, 178, 248, 0.4)',
  },
  crosshairH: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(147, 178, 248, 0.15)',
  },
  crosshairV: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    width: 1,
    backgroundColor: 'rgba(147, 178, 248, 0.15)',
  },
  centerSelf: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 10,
  },
  centerSelfText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  radarBlip: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
  },
  radarBlipText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  radarBadge: {
    position: 'absolute',
    top: 14,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  radarBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EFF6FF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 14,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  memberList: {
    gap: 10,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInit: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  memberInfo: {
    flex: 1,
    gap: 2,
  },
  memberNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  memberDist: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
  },
  memberStatus: {
    fontSize: 11,
    color: '#475569',
  },
  memberMeta: {
    fontSize: 10,
    color: '#94A3B8',
  },
  memberActions: {
    flexDirection: 'row',
    gap: 6,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
});
