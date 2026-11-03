import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  ArrowUp,
  ArrowDown,
  Trash2,
  Lock,
  Unlock,
  Plus,
  Sparkles,
  Check,
  X,
  Clock,
} from 'lucide-react-native';

interface Props {
  navigation: any;
  route: any;
}

interface EditableItem {
  id: string;
  name: string;
  time: string;
  category: string;
  locked: boolean;
}

export const ItineraryEditScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialDay = route.params?.dayNumber || 1;
  const [activeDay, setActiveDay] = useState(initialDay);

  const [items, setItems] = useState<EditableItem[]>([
    { id: '1', name: 'Mì Quảng Bà Mua', time: '08:00', category: 'Ăn uống', locked: false },
    { id: '2', name: 'Bán đảo Sơn Trà & Chùa Linh Ứng', time: '09:30', category: 'Tham quan', locked: true },
    { id: '3', name: 'Cơm gà A Hải', time: '12:30', category: 'Ăn uống', locked: false },
    { id: '4', name: 'Bãi biển Mỹ Khê', time: '15:30', category: 'Nghỉ ngơi', locked: false },
    { id: '5', name: 'Hải sản Năm Đảnh & Cầu Rồng', time: '19:00', category: 'Ăn uống', locked: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceCategory, setNewPlaceCategory] = useState('Tham quan');
  const [newPlaceTime, setNewPlaceTime] = useState('16:30');

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setItems(next);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setItems(next);
  };

  const handleToggleLock = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, locked: !i.locked } : i))
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert('Xóa hoạt động', 'Bạn có chắc muốn xóa hoạt động này khỏi lịch trình?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => setItems((prev) => prev.filter((i) => i.id !== id)),
      },
    ]);
  };

  const handleAddItem = () => {
    if (!newPlaceName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên địa điểm');
      return;
    }
    const newItem: EditableItem = {
      id: `act-${Date.now()}`,
      name: newPlaceName.trim(),
      time: newPlaceTime,
      category: newPlaceCategory,
      locked: false,
    };
    setItems((prev) => [...prev, newItem]);
    setNewPlaceName('');
    setShowAddModal(false);
  };

  const handleSave = () => {
    Alert.alert('Thành công', 'Đã lưu thay đổi lịch trình!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleOptimizeAI = () => {
    Alert.alert('Tối ưu hóa', 'Bé Sao Lumi đã sắp xếp lại lộ trình theo thứ tự vị trí địa lý tối ưu nhất!');
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

        <Text style={styles.headerTitle}>Chỉnh sửa ngày {activeDay}</Text>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveBtnText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* AI Smart Optimize Banner */}
      <TouchableOpacity
        style={styles.aiOptimizeBanner}
        onPress={handleOptimizeAI}
        activeOpacity={0.85}
      >
        <View style={styles.aiIconBg}>
          <Sparkles size={18} color="#D97706" />
        </View>
        <View style={styles.aiTextWrap}>
          <Text style={styles.aiTitle}>Tối ưu hóa đường đi với Bé Sao</Text>
          <Text style={styles.aiSub}>Sắp xếp tự động các điểm gần nhau để tiết kiệm thời gian di chuyển</Text>
        </View>
        <Text style={styles.aiBtnText}>Sắp xếp ›</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionSubtitle}>
          Dùng mũi tên để di chuyển thứ tự, chạm ổ khóa để cố định giờ.
        </Text>

        <View style={styles.itemList}>
          {items.map((item, index) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemOrderColumn}>
                <TouchableOpacity
                  style={[styles.arrowBtn, index === 0 && styles.arrowBtnDisabled]}
                  onPress={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  <ArrowUp size={16} color={index === 0 ? '#CBD5E1' : '#0A1680'} />
                </TouchableOpacity>
                <Text style={styles.itemOrderNumber}>{index + 1}</Text>
                <TouchableOpacity
                  style={[styles.arrowBtn, index === items.length - 1 && styles.arrowBtnDisabled]}
                  onPress={() => handleMoveDown(index)}
                  disabled={index === items.length - 1}
                >
                  <ArrowDown size={16} color={index === items.length - 1 ? '#CBD5E1' : '#0A1680'} />
                </TouchableOpacity>
              </View>

              <View style={styles.itemInfoColumn}>
                <View style={styles.itemTimeRow}>
                  <View style={styles.itemTimeTag}>
                    <Clock size={12} color="#0A1680" />
                    <Text style={styles.itemTimeText}>{item.time}</Text>
                  </View>
                  <View style={styles.itemCatTag}>
                    <Text style={styles.itemCatText}>{item.category}</Text>
                  </View>
                </View>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>

              <View style={styles.itemActionColumn}>
                <TouchableOpacity
                  style={[styles.lockBtn, item.locked && styles.lockBtnActive]}
                  onPress={() => handleToggleLock(item.id)}
                >
                  {item.locked ? (
                    <Lock size={16} color="#0A1680" />
                  ) : (
                    <Unlock size={16} color="#94A3B8" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(item.id)}
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowAddModal(true)}
          activeOpacity={0.85}
        >
          <Plus size={18} color="#0A1680" />
          <Text style={styles.addBtnText}>Thêm điểm dừng mới</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Item Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Thêm địa điểm mới</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Tên địa điểm / Hoạt động</Text>
              <TextInput
                style={styles.textInput}
                placeholder="VD: Cà phê ngắm hoàng hôn..."
                value={newPlaceName}
                onChangeText={setNewPlaceName}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Thời gian dự kiến</Text>
              <TextInput
                style={styles.textInput}
                placeholder="VD: 16:30"
                value={newPlaceTime}
                onChangeText={setNewPlaceTime}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Thể loại</Text>
              <View style={styles.categoryRow}>
                {['Ăn uống', 'Cà phê', 'Tham quan', 'Nghỉ ngơi', 'Check-in'].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      newPlaceCategory === cat && styles.categoryChipActive,
                    ]}
                    onPress={() => setNewPlaceCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        newPlaceCategory === cat && styles.categoryChipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleAddItem}
              activeOpacity={0.85}
            >
              <Text style={styles.submitBtnText}>Thêm vào lịch trình</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  saveBtn: {
    backgroundColor: '#0A1680',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 16,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  aiOptimizeBanner: {
    marginHorizontal: 20,
    marginTop: 14,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  aiIconBg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTextWrap: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
    marginBottom: 2,
  },
  aiSub: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 14,
  },
  aiBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 14,
    paddingBottom: 40,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  itemList: {
    gap: 12,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  itemOrderColumn: {
    alignItems: 'center',
    gap: 4,
    width: 28,
  },
  arrowBtn: {
    padding: 3,
  },
  arrowBtnDisabled: {
    opacity: 0.4,
  },
  itemOrderNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A1680',
  },
  itemInfoColumn: {
    flex: 1,
    gap: 4,
  },
  itemTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemTimeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemTimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
  },
  itemCatTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  itemCatText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '600',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  itemActionColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lockBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockBtnActive: {
    backgroundColor: '#EFF3FF',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0A1680',
    borderStyle: 'dashed',
    borderRadius: 18,
    paddingVertical: 14,
    marginTop: 4,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0A1680',
  },
  formGroup: {
    gap: 6,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: '#1E293B',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  categoryChipActive: {
    backgroundColor: '#0A1680',
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  submitBtn: {
    backgroundColor: '#0A1680',
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 6,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
