import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { useTravel } from '../../features/travel/TravelContext';
import { LocalImages } from '../../assets/images';
import {
  ArrowLeft,
  Plus,
  Wallet,
  Utensils,
  Car,
  Ticket,
  Building,
  Users,
  ChevronRight,
  TrendingUp,
} from 'lucide-react-native';

interface ExpenseItem {
  id: string;
  title: string;
  category: 'food' | 'transport' | 'ticket' | 'stay' | 'other';
  amount: number;
  paidBy: string;
  time: string;
  participants: string[];
}

const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-1',
    title: 'Hải sản Năm Đảnh (Bữa trưa)',
    category: 'food',
    amount: 780000,
    paidBy: 'Bạn',
    time: 'Hôm nay · 12:45',
    participants: ['Bạn', 'Minh Anh', 'Linh Chi', 'Quang Huy'],
  },
  {
    id: 'exp-2',
    title: 'Vé cáp treo Bà Nà Hills (4 vé)',
    category: 'ticket',
    amount: 3400000,
    paidBy: 'Minh Anh',
    time: 'Hôm qua · 08:30',
    participants: ['Bạn', 'Minh Anh', 'Linh Chi', 'Quang Huy'],
  },
  {
    id: 'exp-3',
    title: 'Taxi từ sân bay về khách sạn',
    category: 'transport',
    amount: 150000,
    paidBy: 'Linh Chi',
    time: '17/10 · 09:15',
    participants: ['Bạn', 'Minh Anh', 'Linh Chi', 'Quang Huy'],
  },
  {
    id: 'exp-4',
    title: 'Cà phê view biển Mỹ Khê',
    category: 'food',
    amount: 180000,
    paidBy: 'Bạn',
    time: '17/10 · 16:00',
    participants: ['Bạn', 'Minh Anh'],
  },
];

export const TripExpensesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { plan } = useTravel();
  const [activeTab, setActiveTab] = useState<'all' | 'split'>('all');
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const budget = plan.budgetAmount ? plan.budgetAmount * (plan.companionCount || 4) : 10000000;
  const percentUsed = Math.min(100, Math.round((totalSpent / budget) * 100));

  const getCategoryIcon = (cat: ExpenseItem['category']) => {
    switch (cat) {
      case 'food':
        return <Utensils size={18} color="#EA580C" />;
      case 'transport':
        return <Car size={18} color="#0284C7" />;
      case 'ticket':
        return <Ticket size={18} color="#7C3AED" />;
      case 'stay':
        return <Building size={18} color="#059669" />;
      default:
        return <Wallet size={18} color={Colors.primary} />;
    }
  };

  const getCategoryBg = (cat: ExpenseItem['category']) => {
    switch (cat) {
      case 'food':
        return '#FFEDD5';
      case 'transport':
        return '#E0F2FE';
      case 'ticket':
        return '#EDE9FE';
      case 'stay':
        return '#D1FAE5';
      default:
        return Colors.primaryLight;
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
        <Text style={styles.headerTitle}>Chi tiêu chuyến đi</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddExpense')}
        >
          <Plus size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Mascot Tip */}
        <View style={styles.mascotTip}>
          <Image
            source={LocalImages.mascotCool}
            style={styles.mascotImg}
            resizeMode="contain"
          />
          <View style={styles.mascotText}>
            <Text style={styles.mascotTitle}>BÉ SAO LUMI QUẢN LÝ TÀI CHÍNH ✨</Text>
            <Text style={styles.mascotSub}>
              Mọi khoản chi được tự động chia đều hoặc theo tỷ lệ người tham gia, giúp cả nhóm minh bạch chi tiêu!
            </Text>
          </View>
        </View>

        {/* Total Budget Overview Card */}
        <View style={styles.budgetCard}>
          <Text style={styles.budgetCardLabel}>Tổng chi tiêu của đoàn</Text>
          <Text style={styles.budgetSpent}>
            {totalSpent.toLocaleString('vi-VN')}đ
          </Text>
          <Text style={styles.budgetTotal}>
            Ngân sách dự kiến: {budget.toLocaleString('vi-VN')}đ
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressBarWrapper}>
            <View style={[styles.progressBarFill, { width: `${percentUsed}%` }]} />
          </View>
          <View style={styles.progressMeta}>
            <Text style={styles.progressText}>Đã dùng {percentUsed}% ngân sách</Text>
            <Text style={styles.progressText}>
              Còn {(budget - totalSpent).toLocaleString('vi-VN')}đ
            </Text>
          </View>
        </View>

        {/* Tab switch */}
        <View style={styles.tabsWrap}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'all' && styles.activeTabBtn]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'all' && styles.activeTabBtnText]}>
              Danh sách chi ({expenses.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'split' && styles.activeTabBtn]}
            onPress={() => setActiveTab('split')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'split' && styles.activeTabBtnText]}>
              Chia tiền nhóm
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'all' ? (
          <View style={styles.expenseList}>
            {expenses.map((item) => (
              <View key={item.id} style={styles.expenseItem}>
                <View style={[styles.catIconBox, { backgroundColor: getCategoryBg(item.category) }]}>
                  {getCategoryIcon(item.category)}
                </View>

                <View style={styles.expenseBody}>
                  <Text style={styles.expenseTitle}>{item.title}</Text>
                  <Text style={styles.expenseSub}>
                    {item.time} · Trả bởi: <Text style={{ fontWeight: '700' }}>{item.paidBy}</Text>
                  </Text>
                  <Text style={styles.expenseSplit}>
                    Chia cho: {item.participants.join(', ')}
                  </Text>
                </View>

                <Text style={styles.expenseAmount}>
                  -{item.amount.toLocaleString('vi-VN')}đ
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.splitSection}>
            <View style={styles.splitNotice}>
              <Users size={20} color={Colors.primary} />
              <Text style={styles.splitNoticeText}>
                Số tiền được tự động tính toán để tối thiểu số lần chuyển khoản giữa các thành viên.
              </Text>
            </View>

            {/* Member balances */}
            <View style={styles.balanceList}>
              <View style={styles.balanceRow}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>BN</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.memberName}>Bạn</Text>
                  <Text style={styles.memberDetail}>Đã trả: 960.000đ · Cần chi: 1.127.500đ</Text>
                </View>
                <Text style={[styles.balanceAmount, { color: Colors.danger }]}>
                  -167.500đ
                </Text>
              </View>

              <View style={styles.balanceRow}>
                <View style={[styles.memberAvatar, { backgroundColor: '#EDE9FE' }]}>
                  <Text style={[styles.memberAvatarText, { color: '#7C3AED' }]}>MA</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.memberName}>Minh Anh</Text>
                  <Text style={styles.memberDetail}>Đã trả: 3.400.000đ · Cần chi: 1.127.500đ</Text>
                </View>
                <Text style={[styles.balanceAmount, { color: Colors.success }]}>
                  +2.272.500đ
                </Text>
              </View>

              <View style={styles.balanceRow}>
                <View style={[styles.memberAvatar, { backgroundColor: '#E0F2FE' }]}>
                  <Text style={[styles.memberAvatarText, { color: '#0284C7' }]}>LC</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.memberName}>Linh Chi</Text>
                  <Text style={styles.memberDetail}>Đã trả: 150.000đ · Cần chi: 1.037.500đ</Text>
                </View>
                <Text style={[styles.balanceAmount, { color: Colors.danger }]}>
                  -887.500đ
                </Text>
              </View>

              <View style={styles.balanceRow}>
                <View style={[styles.memberAvatar, { backgroundColor: '#FEF3C7' }]}>
                  <Text style={[styles.memberAvatarText, { color: '#D97706' }]}>QH</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.memberName}>Quang Huy</Text>
                  <Text style={styles.memberDetail}>Đã trả: 0đ · Cần chi: 1.037.500đ</Text>
                </View>
                <Text style={[styles.balanceAmount, { color: Colors.danger }]}>
                  -1.037.500đ
                </Text>
              </View>
            </View>
          </View>
        )}
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
  content: { padding: 20, paddingBottom: 60, gap: 16 },
  budgetCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  budgetCardLabel: { fontSize: 13, color: Colors.secondaryLight, fontWeight: '600', marginBottom: 4 },
  budgetSpent: { fontSize: 30, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  budgetTotal: { fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', marginBottom: 16 },
  progressBarWrapper: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: { height: '100%', backgroundColor: Colors.secondary, borderRadius: 4 },
  progressMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  progressText: { fontSize: 12, color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' },
  tabsWrap: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 3,
  },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  activeTabBtn: { backgroundColor: Colors.card },
  tabBtnText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  activeTabBtnText: { color: Colors.primary, fontWeight: '700' },
  expenseList: { gap: 12 },
  expenseItem: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseBody: { flex: 1 },
  expenseTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  expenseSub: { fontSize: 12, color: Colors.textSecondary, marginBottom: 2 },
  expenseSplit: { fontSize: 11, color: Colors.primary },
  expenseAmount: { fontSize: 15, fontWeight: '800', color: Colors.text },
  splitSection: { gap: 14 },
  splitNotice: {
    backgroundColor: Colors.primaryLight,
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#D8E2FD',
  },
  splitNoticeText: { flex: 1, fontSize: 12, color: Colors.primary, lineHeight: 18 },
  balanceList: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  memberAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  memberName: { fontSize: 15, fontWeight: '700', color: Colors.text },
  memberDetail: { fontSize: 11, color: Colors.textSecondary, marginTop: 1 },
  balanceAmount: { fontSize: 15, fontWeight: '800' },
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

