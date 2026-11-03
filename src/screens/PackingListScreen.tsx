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
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Luggage,
  Sparkles,
  X,
} from 'lucide-react-native';

interface Props {
  navigation: any;
}

interface PackingItem {
  id: string;
  name: string;
  category: string;
  isChecked: boolean;
}

export const PackingListScreen: React.FC<Props> = ({ navigation }) => {
  const [activeCat, setActiveCat] = useState('all');
  const [items, setItems] = useState<PackingItem[]>([
    { id: '1', name: 'CCCD & Hộ chiếu', category: 'cat-1', isChecked: true },
    { id: '2', name: 'Vé máy bay & Đặt phòng in/lưu ví', category: 'cat-1', isChecked: true },
    { id: '3', name: '3 bộ quần áo đi biển thoáng mát', category: 'cat-2', isChecked: true },
    { id: '4', name: 'Đồ bơi & kính lặn', category: 'cat-2', isChecked: false },
    { id: '5', name: 'Áo khoác nhẹ chống nắng', category: 'cat-2', isChecked: false },
    { id: '6', name: 'Củ sạc & cáp sạc đa năng', category: 'cat-3', isChecked: true },
    { id: '7', name: 'Sạc dự phòng 20.000mAh', category: 'cat-3', isChecked: true },
    { id: '8', name: 'Tai nghe Bluetooth chống ồn', category: 'cat-3', isChecked: false },
    { id: '9', name: 'Kem chống nắng SPF 50+', category: 'cat-4', isChecked: true },
    { id: '10', name: 'Bàn chải & kem đánh răng du lịch', category: 'cat-4', isChecked: false },
    { id: '11', name: 'Thuốc say xe & hạ sốt', category: 'cat-4', isChecked: true },
    { id: '12', name: 'Túi chống nước điện thoại', category: 'cat-5', isChecked: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('cat-2');

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'cat-1', label: '📄 Giấy tờ' },
    { id: 'cat-2', label: '👕 Quần áo' },
    { id: 'cat-3', label: '🔋 Điện tử' },
    { id: 'cat-4', label: '🧴 Vệ sinh' },
    { id: 'cat-5', label: '🏖️ Hoạt động' },
  ];

  const filteredItems =
    activeCat === 'all' ? items : items.filter((i) => i.category === activeCat);

  const checkedCount = items.filter((i) => i.isChecked).length;
  const progressPercent = Math.round((checkedCount / items.length) * 100) || 0;

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isChecked: !i.isChecked } : i))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên món đồ');
      return;
    }
    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCat,
      isChecked: false,
    };
    setItems((prev) => [newItem, ...prev]);
    setNewItemName('');
    setShowAddModal(false);
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
          <Text style={styles.headerTitle}>Hành lý mang theo</Text>
          <Text style={styles.headerSub}>Đà Nẵng · {items.length} món đồ</Text>
        </View>

        <TouchableOpacity
          style={styles.addIconBtn}
          onPress={() => setShowAddModal(true)}
          activeOpacity={0.8}
        >
          <Plus size={20} color="#0A1680" />
        </TouchableOpacity>
      </View>

      {/* Categories Scroll */}
      <View style={styles.categoriesBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {categories.map((c) => {
            const isActive = c.id === activeCat;
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.catChip, isActive && styles.catChipActive]}
                onPress={() => setActiveCat(c.id)}
                activeOpacity={0.85}
              >
                <Text style={[styles.catChipText, isActive && styles.catChipTextActive]}>
                  {c.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressTitleRow}>
              <Luggage size={18} color="#0A1680" />
              <Text style={styles.progressTitle}>Tiến độ chuẩn bị vali</Text>
            </View>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressMeta}>
            Đã soạn xong {checkedCount}/{items.length} món đồ
          </Text>
        </View>

        {/* Item List */}
        <View style={styles.itemsCard}>
          {filteredItems.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.itemRow,
                index < filteredItems.length - 1 && styles.itemRowBorder,
              ]}
            >
              <TouchableOpacity
                style={styles.checkTouch}
                onPress={() => toggleItem(item.id)}
                activeOpacity={0.8}
              >
                {item.isChecked ? (
                  <CheckCircle2 size={20} color="#10B981" />
                ) : (
                  <Circle size={20} color="#CBD5E1" />
                )}
                <Text
                  style={[
                    styles.itemName,
                    item.isChecked && styles.itemNameChecked,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteTouch}
                onPress={() => deleteItem(item.id)}
                activeOpacity={0.7}
              >
                <Trash2 size={16} color="#CBD5E1" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Quick Add Button */}
        <TouchableOpacity
          style={styles.bottomAddBtn}
          onPress={() => setShowAddModal(true)}
          activeOpacity={0.85}
        >
          <Plus size={18} color="#0A1680" />
          <Text style={styles.bottomAddBtnText}>Thêm món đồ cần mang</Text>
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
              <Text style={styles.modalTitle}>Thêm đồ dùng mới</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Tên món đồ</Text>
              <TextInput
                style={styles.textInput}
                placeholder="VD: Kem đánh răng, Mũ cói..."
                value={newItemName}
                onChangeText={setNewItemName}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Danh mục</Text>
              <View style={styles.modalCatRow}>
                {categories.slice(1).map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    style={[
                      styles.modalCatChip,
                      newItemCat === c.id && styles.modalCatChipActive,
                    ]}
                    onPress={() => setNewItemCat(c.id)}
                  >
                    <Text
                      style={[
                        styles.modalCatChipText,
                        newItemCat === c.id && styles.modalCatChipTextActive,
                      ]}
                    >
                      {c.label}
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
              <Text style={styles.submitBtnText}>Thêm vào danh sách</Text>
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
  addIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  catScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catChipActive: {
    backgroundColor: '#0A1680',
    borderColor: '#0A1680',
  },
  catChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  catChipTextActive: {
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
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '800',
    color: '#10B981',
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressMeta: {
    fontSize: 11,
    color: '#64748B',
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  itemRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  checkTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  itemNameChecked: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  deleteTouch: {
    padding: 6,
  },
  bottomAddBtn: {
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
  },
  bottomAddBtnText: {
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
  modalCatRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalCatChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  modalCatChipActive: {
    backgroundColor: '#0A1680',
  },
  modalCatChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  modalCatChipTextActive: {
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
