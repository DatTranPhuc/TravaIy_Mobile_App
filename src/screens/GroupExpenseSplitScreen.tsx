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
  DollarSign,
  ArrowRight,
  CheckCircle2,
  BellRing,
  Wallet,
  Receipt,
  Plus,
} from 'lucide-react-native';

interface Props {
  navigation: any;
}

export const GroupExpenseSplitScreen: React.FC<Props> = ({ navigation }) => {
  const [debts, setDebts] = useState([
    {
      id: 'd1',
      debtor: 'Linh Chi',
      debtorInit: 'LC',
      creditor: 'Bạn',
      amount: '150.000đ',
      isSettled: false,
    },
    {
      id: 'd2',
      debtor: 'Quốc Đạt',
      debtorInit: 'QD',
      creditor: 'Minh Anh',
      amount: '220.000đ',
      isSettled: true,
    },
    {
      id: 'd3',
      debtor: 'Phương Anh',
      debtorInit: 'PA',
      creditor: 'Bạn',
      amount: '180.000đ',
      isSettled: false,
    },
  ]);

  const groupBills = [
    {
      id: 'b1',
      title: 'Hải sản Năm Đảnh & Cầu Rồng',
      paidBy: 'Hoàng Nam (Bạn)',
      total: '1.250.000đ',
      perPerson: '312.500đ / người',
      date: 'Tối qua, 19:30',
    },
    {
      id: 'b2',
      title: 'Vé cáp treo Bà Nà Hills',
      paidBy: 'Minh Anh',
      total: '3.400.000đ',
      perPerson: '850.000đ / người',
      date: 'Hôm qua, 08:30',
    },
    {
      id: 'b3',
      title: 'Cà phê Faifo Hội An',
      paidBy: 'Linh Chi',
      total: '240.000đ',
      perPerson: '60.000đ / người',
      date: 'Hôm nay, 10:15',
    },
  ];

  const handleSettle = (id: string) => {
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isSettled: true } : d))
    );
    Alert.alert('Thành công', 'Đã đánh dấu khoản thanh toán này đã hoàn tất!');
  };

  const handleRemind = (name: string) => {
    Alert.alert('Đã gửi nhắc nhở', `Đã gửi thông báo nhắc khoản nợ đến ${name}!`);
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
          <Text style={styles.headerTitle}>Chia tiền nhóm</Text>
          <Text style={styles.headerSub}>Tự động tính nợ & cấn trừ</Text>
        </View>

        <TouchableOpacity
          style={styles.addBillBtn}
          onPress={() => navigation.navigate('AddExpense')}
          activeOpacity={0.8}
        >
          <Plus size={20} color="#0A1680" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Summary Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Wallet size={18} color="#0A1680" />
            <Text style={styles.balanceHeaderTitle}>Số dư của bạn trong chuyến đi</Text>
          </View>

          <Text style={styles.balanceMainText}>+330.000đ</Text>
          <Text style={styles.balanceSubText}>
            Bạn đã thanh toán nhiều hơn phần chi trả. Nhóm đang nợ bạn 330.000đ.
          </Text>

          <View style={styles.balanceStatsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Tổng chi nhóm</Text>
              <Text style={styles.statVal}>4.890.000đ</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Phần bạn cần góp</Text>
              <Text style={styles.statVal}>1.222.500đ</Text>
            </View>
          </View>
        </View>

        {/* Debt Settlements Section */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>Phương án cấn trừ tối ưu</Text>

          <View style={styles.debtsList}>
            {debts.map((debt) => (
              <View key={debt.id} style={styles.debtCard}>
                <View style={styles.debtTopRow}>
                  <View style={styles.debtorInfo}>
                    <View style={styles.debtorAvatar}>
                      <Text style={styles.debtorAvatarText}>{debt.debtorInit}</Text>
                    </View>
                    <Text style={styles.debtorName}>{debt.debtor}</Text>
                  </View>

                  <ArrowRight size={16} color="#64748B" />

                  <View style={styles.creditorInfo}>
                    <Text style={styles.creditorName}>{debt.creditor}</Text>
                  </View>

                  <Text
                    style={[
                      styles.debtAmount,
                      debt.isSettled && styles.debtAmountSettled,
                    ]}
                  >
                    {debt.amount}
                  </Text>
                </View>

                <View style={styles.debtActionRow}>
                  {debt.isSettled ? (
                    <View style={styles.settledBadge}>
                      <CheckCircle2 size={13} color="#10B981" />
                      <Text style={styles.settledBadgeText}>Đã thanh toán</Text>
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.remindBtn}
                        onPress={() => handleRemind(debt.debtor)}
                      >
                        <BellRing size={13} color="#D97706" />
                        <Text style={styles.remindBtnText}>Nhắc nợ</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.settleBtn}
                        onPress={() => handleSettle(debt.id)}
                      >
                        <Text style={styles.settleBtnText}>Đã nhận tiền ✓</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Group Bills History */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>Hóa đơn nhóm gần đây</Text>

          <View style={styles.billsList}>
            {groupBills.map((bill) => (
              <View key={bill.id} style={styles.billCard}>
                <View style={styles.billIconBg}>
                  <Receipt size={18} color="#0A1680" />
                </View>

                <View style={styles.billInfo}>
                  <Text style={styles.billTitle}>{bill.title}</Text>
                  <Text style={styles.billPayer}>
                    {bill.paidBy} trả • {bill.date}
                  </Text>
                </View>

                <View style={styles.billAmountWrap}>
                  <Text style={styles.billTotal}>{bill.total}</Text>
                  <Text style={styles.billPerPerson}>{bill.perPerson}</Text>
                </View>
              </View>
            ))}
          </View>
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
  addBillBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 18,
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: '#EFF3FF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    gap: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceHeaderTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
  balanceMainText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#10B981',
  },
  balanceSubText: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  balanceStatsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  statVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 2,
  },
  sectionWrap: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  debtsList: {
    gap: 10,
  },
  debtCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  debtTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  debtorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 95,
  },
  debtorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
  },
  debtorAvatarText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  debtorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  creditorInfo: {
    width: 60,
  },
  creditorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
  debtAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EF4444',
  },
  debtAmountSettled: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  debtActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  remindBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  remindBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  settleBtn: {
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  settleBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
  },
  settledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  settledBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  billsList: {
    gap: 10,
  },
  billCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  billIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  billInfo: {
    flex: 1,
    gap: 2,
  },
  billTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  billPayer: {
    fontSize: 10,
    color: '#64748B',
  },
  billAmountWrap: {
    alignItems: 'flex-end',
  },
  billTotal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0A1680',
  },
  billPerPerson: {
    fontSize: 10,
    color: '#64748B',
  },
});
