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
  Share2,
  Trash2,
  Plane,
  QrCode,
  Download,
  ShieldCheck,
  Clock,
  MapPin,
} from 'lucide-react-native';

interface Props {
  navigation: any;
}

export const TravelDocumentDetailScreen: React.FC<Props> = ({ navigation }) => {
  const handleDelete = () => {
    Alert.alert('Xóa tài liệu', 'Bạn có chắc chắn muốn xóa vé máy bay này khỏi ví?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Đã xóa', 'Đã xóa tài liệu khỏi ví!');
          navigation.goBack();
        },
      },
    ]);
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

        <Text style={styles.headerTitle}>Chi tiết vé máy bay</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => Alert.alert('Chia sẻ', 'Đã sao chép liên kết chia sẻ!')}
          >
            <Share2 size={18} color="#0A1680" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={handleDelete}
          >
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Offline Ready Notice */}
        <View style={styles.offlineNotice}>
          <ShieldCheck size={16} color="#059669" />
          <Text style={styles.offlineText}>
            Đã lưu ngoại tuyến an toàn · Xem được khi không có mạng
          </Text>
        </View>

        {/* Boarding Pass Ticket Card */}
        <View style={styles.ticketCard}>
          {/* Ticket Header */}
          <View style={styles.ticketTop}>
            <View style={styles.airlineRow}>
              <View style={styles.planeIconBg}>
                <Plane size={18} color="#0A1680" />
              </View>
              <View>
                <Text style={styles.airlineName}>VietJet Air</Text>
                <Text style={styles.flightNumber}>Chuyến bay VJ128 · Hạng Phổ thông</Text>
              </View>
            </View>
            <View style={styles.classBadge}>
              <Text style={styles.classBadgeText}>Đã xác nhận</Text>
            </View>
          </View>

          {/* Route Departure / Arrival */}
          <View style={styles.routeRow}>
            <View style={styles.airportBox}>
              <Text style={styles.airportCode}>DAD</Text>
              <Text style={styles.airportCity}>Đà Nẵng</Text>
              <Text style={styles.flightTime}>06:15</Text>
            </View>

            <View style={styles.flightDurationBox}>
              <Text style={styles.durationText}>1h 25m</Text>
              <View style={styles.flightLine}>
                <View style={styles.flightDot} />
                <Plane size={14} color="#0A1680" style={{ transform: [{ rotate: '90deg' }] }} />
                <View style={styles.flightDot} />
              </View>
              <Text style={styles.directText}>Bay thẳng</Text>
            </View>

            <View style={[styles.airportBox, { alignItems: 'flex-end' }]}>
              <Text style={styles.airportCode}>SGN</Text>
              <Text style={styles.airportCity}>TP. Hồ Chí Minh</Text>
              <Text style={styles.flightTime}>07:40</Text>
            </View>
          </View>

          {/* Dotted Cut Separator */}
          <View style={styles.ticketCutRow}>
            <View style={styles.cutCircleLeft} />
            <View style={styles.cutLine} />
            <View style={styles.cutCircleRight} />
          </View>

          {/* Passenger & Seat Details */}
          <View style={styles.passengerGrid}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>HÀNH KHÁCH</Text>
              <Text style={styles.gridVal}>HOANG / NAM MR</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>NGÀY BAY</Text>
              <Text style={styles.gridVal}>18/10/2026</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>CỬA (GATE)</Text>
              <Text style={[styles.gridVal, { color: '#0A1680' }]}>04</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>SỐ GHẾ (SEAT)</Text>
              <Text style={[styles.gridVal, { color: '#0A1680' }]}>14A</Text>
            </View>
          </View>

          {/* QR Code Barcode Zone */}
          <View style={styles.barcodeZone}>
            <QrCode size={110} color="#0A1680" />
            <Text style={styles.barcodeCode}>VJ-8921-9941-DAD</Text>
            <Text style={styles.barcodeHelp}>
              Quét mã này tại cổng an ninh & cửa lên máy bay
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={() => Alert.alert('Tải vé', 'Đã lưu vé máy bay vào thư viện ảnh!')}
          activeOpacity={0.85}
        >
          <Download size={18} color="#0A1680" />
          <Text style={styles.downloadBtnText}>Tải vé máy bay (PDF / Ảnh)</Text>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A1680',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  offlineText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  ticketTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  planeIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  airlineName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  flightNumber: {
    fontSize: 10,
    color: '#64748B',
  },
  classBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  classBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  airportBox: {
    gap: 2,
  },
  airportCode: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0A1680',
  },
  airportCity: {
    fontSize: 12,
    color: '#64748B',
  },
  flightTime: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 4,
  },
  flightDurationBox: {
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  flightLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 90,
    justifyContent: 'center',
  },
  flightDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
  directText: {
    fontSize: 9,
    color: '#059669',
    fontWeight: '700',
  },
  ticketCutRow: {
    position: 'relative',
    height: 24,
    justifyContent: 'center',
  },
  cutCircleLeft: {
    position: 'absolute',
    left: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FCFDFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cutCircleRight: {
    position: 'absolute',
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FCFDFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cutLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginHorizontal: 16,
  },
  passengerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 16,
  },
  gridItem: {
    width: '45%',
    gap: 2,
  },
  gridLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  gridVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  barcodeZone: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  barcodeCode: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: 1.5,
  },
  barcodeHelp: {
    fontSize: 10,
    color: '#64748B',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EFF3FF',
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  downloadBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
  },
});
