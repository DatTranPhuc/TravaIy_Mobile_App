import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeft, Check, Utensils, Car, Ticket, Building, Wallet } from 'lucide-react-native';

const CATEGORIES = [
  { id: 'food', label: 'Ẩm thực', icon: Utensils },
  { id: 'transport', label: 'Di chuyển', icon: Car },
  { id: 'ticket', label: 'Vé tham quan', icon: Ticket },
  { id: 'stay', label: 'Chỗ ở', icon: Building },
  { id: 'other', label: 'Chi khác', icon: Wallet },
];

const MEMBERS = ['Bạn', 'Minh Anh', 'Linh Chi', 'Quang Huy'];

export const AddExpenseScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCat, setSelectedCat] = useState('food');
  const [paidBy, setPaidBy] = useState('Bạn');
  const [participants, setParticipants] = useState<string[]>(MEMBERS);

  const toggleParticipant = (member: string) => {
    setParticipants((prev) =>
      prev.includes(member) ? prev.filter((m) => m !== member) : [...prev, member]
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Chưa nhập tên', 'Vui lòng nhập tên khoản chi tiêu.');
      return;
    }
    const numAmount = parseInt(amount.replace(/\D/g, ''), 10);
    if (!numAmount || numAmount <= 0) {
      Alert.alert('Chưa nhập số tiền', 'Vui lòng nhập số tiền hợp lệ.');
      return;
    }
    if (participants.length === 0) {
      Alert.alert('Chưa chọn người chia', 'Vui lòng chọn ít nhất một người tham gia chia tiền.');
      return;
    }

    Alert.alert('Thành công', 'Khoản chi mới đã được thêm vào chuyến đi!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm khoản chi tiêu</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Số tiền lớn */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Số tiền chi (VNĐ)</Text>
          <View style={styles.amountInputRow}>
            <TextInput
              placeholder="0"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              style={styles.amountInput}
            />
            <Text style={styles.amountCurrency}>đ</Text>
          </View>
        </View>

        {/* Tên khoản chi */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tên khoản chi</Text>
          <TextInput
            placeholder="Ví dụ: Ăn trưa hải sản, Vé cáp treo..."
            placeholderTextColor={Colors.textSecondary}
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
          />
        </View>

        {/* Danh mục */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Danh mục</Text>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCat === cat.id;
              const Icon = cat.icon;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catBtn, isSelected && styles.selectedCatBtn]}
                  onPress={() => setSelectedCat(cat.id)}
                  activeOpacity={0.8}
                >
                  <Icon size={18} color={isSelected ? Colors.white : Colors.primary} />
                  <Text style={[styles.catText, isSelected && styles.selectedCatText]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Người đã thanh toán */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ai đã trả tiền?</Text>
          <View style={styles.memberChips}>
            {MEMBERS.map((member) => {
              const isSelected = paidBy === member;
              return (
                <TouchableOpacity
                  key={member}
                  style={[styles.memberChip, isSelected && styles.selectedMemberChip]}
                  onPress={() => setPaidBy(member)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.memberChipText, isSelected && styles.selectedMemberChipText]}>
                    {member}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Chia cho ai */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Chia đều cho ai?</Text>
          <View style={styles.splitList}>
            {MEMBERS.map((member) => {
              const isChecked = participants.includes(member);
              return (
                <TouchableOpacity
                  key={member}
                  style={styles.splitRow}
                  onPress={() => toggleParticipant(member)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.splitMemberName}>{member}</Text>
                  <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
                    {isChecked && <Check size={14} color={Colors.white} strokeWidth={3} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Save Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Lưu khoản chi</Text>
        </TouchableOpacity>
      </View>
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
  content: { padding: 20, paddingBottom: 100, gap: 20 },
  amountCard: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
  },
  amountLabel: { fontSize: 13, color: Colors.secondaryLight, fontWeight: '600', marginBottom: 8 },
  amountInputRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  amountInput: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
    minWidth: 140,
    textAlign: 'center',
  },
  amountCurrency: { fontSize: 24, fontWeight: '700', color: Colors.secondaryLight },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '700', color: Colors.text },
  textInput: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedCatBtn: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { fontSize: 13, fontWeight: '600', color: Colors.text },
  selectedCatText: { color: Colors.white },
  memberChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  memberChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedMemberChip: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  memberChipText: { fontSize: 13, fontWeight: '600', color: Colors.text },
  selectedMemberChipText: { color: Colors.white },
  splitList: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  splitMemberName: { fontSize: 14, fontWeight: '600', color: Colors.text },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
  },
  saveBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});

