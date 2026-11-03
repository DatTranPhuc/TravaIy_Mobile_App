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
  Vote,
  Plus,
  Clock,
  CheckCircle2,
  Users,
} from 'lucide-react-native';
import { LocalImages } from '../../assets/images';

interface Props {
  navigation: any;
}

export const GroupPollScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number>(1);
  const [hasVoted, setHasVoted] = useState(false);

  const [pollOptions, setPollOptions] = useState([
    {
      id: 1,
      name: 'Hải sản Năm Đảnh',
      tagline: 'Hải sản tươi sống • View biển',
      image: LocalImages.food,
      votes: 3,
      voters: ['MA', 'LC', 'HN'],
    },
    {
      id: 2,
      name: 'Mì Quảng Bà Mua',
      tagline: 'Đặc sản Đà Nẵng • Vị đậm đà',
      image: LocalImages.food,
      votes: 2,
      voters: ['PA', 'QD'],
    },
    {
      id: 3,
      name: 'Bánh xèo Tôm Nhảy Cô Ba',
      tagline: 'Ngon - giòn rụm - giá hợp lý',
      image: LocalImages.beach,
      votes: 1,
      voters: ['TK'],
    },
  ]);

  const totalVotes = pollOptions.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = () => {
    setHasVoted(true);
    setPollOptions((prev) =>
      prev.map((opt) =>
        opt.id === selectedOptionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
    Alert.alert('Đã bình chọn', 'Lựa chọn của bạn đã được ghi nhận trong nhóm!');
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

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Bình chọn nhóm</Text>
          <Text style={styles.headerSub}>Ăn tối hôm nay · 6 thành viên</Text>
        </View>

        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionBadgeRow}>
            <View style={styles.badge}>
              <Vote size={12} color="#0A1680" />
              <Text style={styles.badgeText}>Đang diễn ra</Text>
            </View>
            <View style={styles.timerBadge}>
              <Clock size={12} color="#D97706" />
              <Text style={styles.timerText}>Còn 2 giờ</Text>
            </View>
          </View>

          <Text style={styles.questionTitle}>Tối nay nhóm mình ăn gì ở Đà Nẵng?</Text>
          <Text style={styles.questionDesc}>
            Bình chọn quán ăn bạn thích nhất để Bé Sao Lumi chốt đặt bàn trước 18:00 nhé!
          </Text>
        </View>

        {/* Options List */}
        <View style={styles.optionsList}>
          {pollOptions.map((opt) => {
            const isSelected = opt.id === selectedOptionId;
            const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;

            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optCard, isSelected && styles.optCardSelected]}
                onPress={() => setSelectedOptionId(opt.id)}
                activeOpacity={0.85}
              >
                <Image source={opt.image} style={styles.optImg} resizeMode="cover" />

                <View style={styles.optContent}>
                  <View style={styles.optTopRow}>
                    <Text style={styles.optName}>{opt.name}</Text>
                    <View style={[styles.radio, isSelected && styles.radioActive]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </View>

                  <Text style={styles.optTagline}>{opt.tagline}</Text>

                  {/* Progress Bar */}
                  <View style={styles.progressRow}>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${percent}%` }]} />
                    </View>
                    <Text style={styles.percentText}>{percent}%</Text>
                  </View>

                  {/* Voters Avatars */}
                  <View style={styles.votersRow}>
                    <View style={styles.avatarStack}>
                      {opt.voters.map((init, i) => (
                        <View key={i} style={[styles.voterAvatar, { marginLeft: i > 0 ? -8 : 0 }]}>
                          <Text style={styles.voterInit}>{init}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.voteCountText}>{opt.votes} người chọn</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.voteBtn, hasVoted && styles.voteBtnDone]}
          onPress={handleVote}
          disabled={hasVoted}
          activeOpacity={0.85}
        >
          <CheckCircle2 size={18} color="#FFFFFF" />
          <Text style={styles.voteBtnText}>
            {hasVoted ? 'Đã gửi bình chọn ✓' : 'Xác nhận bình chọn'}
          </Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 30,
  },
  questionCard: {
    backgroundColor: '#EFF3FF',
    borderRadius: 22,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  questionBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  timerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0A1680',
    lineHeight: 24,
  },
  questionDesc: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  optionsList: {
    gap: 14,
  },
  optCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  optCardSelected: {
    borderColor: '#0A1680',
    backgroundColor: '#FAFCFF',
  },
  optImg: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  optContent: {
    flex: 1,
    gap: 4,
  },
  optTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    flex: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: '#0A1680',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0A1680',
  },
  optTagline: {
    fontSize: 11,
    color: '#64748B',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0A1680',
    borderRadius: 3,
  },
  percentText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
    width: 32,
    textAlign: 'right',
  },
  votersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voterAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  voterInit: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  voteCountText: {
    fontSize: 10,
    color: '#64748B',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  voteBtn: {
    backgroundColor: '#0A1680',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  voteBtnDone: {
    backgroundColor: '#10B981',
  },
  voteBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
