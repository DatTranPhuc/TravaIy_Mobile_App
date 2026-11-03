import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {
  ChevronLeft,
  Search,
  MapPin,
  Building2,
  Users,
  Navigation,
  LocateFixed,
  ChevronRight,
  Compass,
} from 'lucide-react-native';
import { LocalImages } from '../assets/images';

interface Props {
  navigation: any;
}

export const MapViewScreen: React.FC<Props> = ({ navigation }) => {
  const [activeLayer, setActiveLayer] = useState<'places' | 'stays' | 'members'>('places');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('tiem-tu-lung');

  const places = [
    {
      id: 'tiem-tu-lung',
      name: 'Tiệm Cà Phê Tú Lưng',
      category: 'Cà phê · View đồi',
      distance: '4.2 km',
      image: LocalImages.dalatCabin,
      coords: { x: '45%', y: '38%' },
    },
    {
      id: 'my-khe',
      name: 'Bãi biển Mỹ Khê',
      category: 'Biển · Hoàng hôn',
      distance: '1.5 km',
      image: LocalImages.beach,
      coords: { x: '72%', y: '52%' },
    },
    {
      id: 'son-tra',
      name: 'Bán đảo Sơn Trà',
      category: 'Tham quan · Thiên nhiên',
      distance: '8.0 km',
      image: LocalImages.bridge,
      coords: { x: '60%', y: '22%' },
    },
    {
      id: 'hoi-an',
      name: 'Phố cổ Hội An',
      category: 'Di sản · Check-in',
      distance: '28 km',
      image: LocalImages.town,
      coords: { x: '82%', y: '78%' },
    },
  ];

  const selectedPlace = places.find((p) => p.id === selectedPlaceId) || places[0];

  return (
    <View style={styles.container}>
      {/* Top Map Floating Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ChevronLeft size={22} color="#0A1680" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Search size={16} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm địa điểm trên bản đồ..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Layer Tabs */}
      <View style={styles.layerBar}>
        <TouchableOpacity
          style={[styles.layerChip, activeLayer === 'places' && styles.layerChipActive]}
          onPress={() => setActiveLayer('places')}
        >
          <MapPin size={13} color={activeLayer === 'places' ? '#FFFFFF' : '#475569'} />
          <Text style={[styles.layerText, activeLayer === 'places' && styles.layerTextActive]}>
            Địa điểm (4)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.layerChip, activeLayer === 'stays' && styles.layerChipActive]}
          onPress={() => setActiveLayer('stays')}
        >
          <Building2 size={13} color={activeLayer === 'stays' ? '#FFFFFF' : '#475569'} />
          <Text style={[styles.layerText, activeLayer === 'stays' && styles.layerTextActive]}>
            Chỗ ở (3)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.layerChip, activeLayer === 'members' && styles.layerChipActive]}
          onPress={() => setActiveLayer('members')}
        >
          <Users size={13} color={activeLayer === 'members' ? '#FFFFFF' : '#475569'} />
          <Text style={[styles.layerText, activeLayer === 'members' && styles.layerTextActive]}>
            Thành viên nhóm (4)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Visual Simulated Map Canvas */}
      <View style={styles.mapCanvas}>
        {/* Background Grid Pattern & River */}
        <View style={styles.mapGridLines} />
        <View style={styles.mapRiverCurve} />

        {/* Location Markers */}
        {places.map((p, idx) => {
          const isSelected = p.id === selectedPlaceId;
          return (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.mapPinWrap,
                { top: p.coords.y as any, left: p.coords.x as any },
                isSelected && styles.mapPinWrapActive,
              ]}
              onPress={() => setSelectedPlaceId(p.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.pinBubble, isSelected && styles.pinBubbleActive]}>
                <Text style={[styles.pinNumber, isSelected && styles.pinNumberActive]}>
                  {idx + 1}
                </Text>
              </View>
              <View style={styles.pinLabelBox}>
                <Text style={styles.pinLabelText} numberOfLines={1}>
                  {p.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* User Location Floating Button */}
        <TouchableOpacity
          style={styles.locateBtn}
          onPress={() => setSelectedPlaceId('my-khe')}
          activeOpacity={0.8}
        >
          <LocateFixed size={20} color="#0A1680" />
        </TouchableOpacity>
      </View>

      {/* Bottom Place Drawer Preview */}
      <View style={styles.bottomDrawer}>
        <View style={styles.drawerHandle} />

        <View style={styles.placePreviewCard}>
          <Image source={selectedPlace.image} style={styles.placeThumb} resizeMode="cover" />

          <View style={styles.placeInfo}>
            <Text style={styles.placeCat}>{selectedPlace.category}</Text>
            <Text style={styles.placeName} numberOfLines={1}>
              {selectedPlace.name}
            </Text>
            <Text style={styles.placeDist}>Cách bạn {selectedPlace.distance}</Text>
          </View>
        </View>

        <View style={styles.drawerActionRow}>
          <TouchableOpacity
            style={styles.drawerDetailBtn}
            onPress={() => navigation.navigate('PlaceDetail', { placeId: selectedPlace.id })}
            activeOpacity={0.85}
          >
            <Text style={styles.drawerDetailBtnText}>Xem chi tiết</Text>
            <ChevronRight size={16} color="#0A1680" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerNavBtn}
            onPress={() => navigation.navigate('TodaySchedule')}
            activeOpacity={0.85}
          >
            <Navigation size={16} color="#FFFFFF" />
            <Text style={styles.drawerNavBtnText}>Đưa vào lộ trình</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0FE',
  },
  topHeader: {
    position: 'absolute',
    top: 14,
    left: 16,
    right: 16,
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 42,
    gap: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#1E293B',
    paddingVertical: 0,
  },
  layerBar: {
    position: 'absolute',
    top: 66,
    left: 16,
    right: 16,
    zIndex: 20,
    flexDirection: 'row',
    gap: 8,
  },
  layerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  layerChipActive: {
    backgroundColor: '#0A1680',
  },
  layerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  layerTextActive: {
    color: '#FFFFFF',
  },
  mapCanvas: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E6F0FA',
  },
  mapGridLines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08,
    borderWidth: 1,
    borderColor: '#0A1680',
  },
  mapRiverCurve: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 60,
    backgroundColor: '#C8E1FC',
    transform: [{ skewX: '-20deg' }],
  },
  mapPinWrap: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  mapPinWrapActive: {
    zIndex: 15,
    transform: [{ scale: 1.15 }],
  },
  pinBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: '#0A1680',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  pinBubbleActive: {
    backgroundColor: '#0A1680',
    borderColor: '#F1B94C',
  },
  pinNumber: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0A1680',
  },
  pinNumberActive: {
    color: '#FFFFFF',
  },
  pinLabelBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    elevation: 2,
    maxWidth: 110,
  },
  pinLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E293B',
  },
  locateBtn: {
    position: 'absolute',
    right: 20,
    bottom: 180,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  bottomDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    gap: 14,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  drawerHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
  },
  placePreviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  placeThumb: {
    width: 68,
    height: 68,
    borderRadius: 16,
  },
  placeInfo: {
    flex: 1,
    gap: 3,
  },
  placeCat: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  placeName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  placeDist: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A1680',
  },
  drawerActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  drawerDetailBtn: {
    flex: 1,
    backgroundColor: '#EFF3FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
    borderRadius: 16,
  },
  drawerDetailBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A1680',
  },
  drawerNavBtn: {
    flex: 1.5,
    backgroundColor: '#0A1680',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 16,
  },
  drawerNavBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
