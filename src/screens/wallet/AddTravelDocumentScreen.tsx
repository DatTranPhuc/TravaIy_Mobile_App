import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowLeft, Plane, Building, CreditCard, ShieldCheck } from 'lucide-react-native';

const DOC_TYPES = [
  { id: 'ticket', label: 'Vé máy bay', icon: Plane },
  { id: 'hotel', label: 'Khách sạn', icon: Building },
  { id: 'id', label: 'CCCD / Hộ chiếu', icon: CreditCard },
  { id: 'insurance', label: 'Bảo hiểm', icon: ShieldCheck },
];

export const AddTravelDocumentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('ticket');
  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState('');
  const [code, setCode] = useState('');
  const [time, setTime] = useState('');
  const [isShared, setIsShared] = useState(true);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Chưa nhập tên', 'Vui lòng nhập tên giấy tờ.');
      return;
    }
    if (!code.trim()) {
      Alert.alert('Chưa nhập mã', 'Vui lòng nhập mã xác nhận hoặc số hiệu giấy tờ.');
      return;
    }

    Alert.alert('Thành công', 'Giấy tờ đã được lưu an toàn vào ví du lịch của bạn!', [
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
        <Text style={styles.headerTitle}>Thêm giấy tờ</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Type selector */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Loại giấy tờ</Text>
          <View style={styles.typeRow}>
            {DOC_TYPES.map((t) => {
              const isSelected = selectedType === t.id;
              const Icon = t.icon;
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[styles.typeBtn, isSelected && styles.selectedTypeBtn]}
                  onPress={() => setSelectedType(t.id)}
                  activeOpacity={0.8}
                >
                  <Icon size={18} color={isSelected ? Colors.white : Colors.primary} />
                  <Text style={[styles.typeText, isSelected && styles.selectedTypeText]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tiêu đề giấy tờ</Text>
          <TextInput
            placeholder="Ví dụ: Vé máy bay Sài Gòn - Đà Nẵng..."
            placeholderTextColor={Colors.textSecondary}
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
          />
        </View>

        {/* Provider */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Đơn vị cung cấp / Khách sạn / Hãng bay</Text>
          <TextInput
            placeholder="Ví dụ: Vietjet Air, Khách sạn Mây Biển..."
            placeholderTextColor={Colors.textSecondary}
            value={provider}
            onChangeText={setProvider}
            style={styles.textInput}
          />
        </View>

        {/* Code */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mã xác nhận / Số hiệu (PNR / Mã đặt chỗ)</Text>
          <TextInput
            placeholder="Ví dụ: VJ-91823, CCCD: 079203..."
            placeholderTextColor={Colors.textSecondary}
            value={code}
            onChangeText={setCode}
            style={styles.textInput}
          />
        </View>

        {/* Time / Validity */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Thời gian / Hạn sử dụng</Text>
          <TextInput
            placeholder="Ví dụ: 17/10/2026 · Khởi hành 06:15"
            placeholderTextColor={Colors.textSecondary}
            value={time}
            onChangeText={setTime}
            style={styles.textInput}
          />
        </View>

        {/* Switch Shared */}
        <View style={styles.switchRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>Chia sẻ với nhóm</Text>
            <Text style={styles.switchSub}>
              Cho phép các thành viên trong đoàn cùng xem mã vé này
            </Text>
          </View>
          <Switch
            value={isShared}
            onValueChange={setIsShared}
            trackColor={{ false: '#CBD5E1', true: Colors.primary }}
          />
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Lưu giấy tờ</Text>
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
  content: { padding: 20, paddingBottom: 100, gap: 18 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '700', color: Colors.text },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeBtn: {
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
  selectedTypeBtn: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  typeText: { fontSize: 13, fontWeight: '600', color: Colors.text },
  selectedTypeText: { color: Colors.white },
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
  switchRow: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 6,
  },
  switchTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  switchSub: { fontSize: 12, color: Colors.textSecondary },
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

