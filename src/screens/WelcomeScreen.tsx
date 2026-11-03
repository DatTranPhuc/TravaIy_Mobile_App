import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Colors } from '../theme/colors';
import { LocalImages } from '../assets/images';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';
import { ArrowRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Fullbleed Hero Background Image */}
      <View style={styles.heroBackgroundContainer}>
        <Image
          source={LocalImages.vietnamHero}
          style={styles.heroBackgroundImage}
          resizeMode="cover"
        />
        <Svg style={styles.topGradient} width="100%" height={140}>
          <Defs>
            <SvgLinearGradient id="welcomeTopGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#0A1680" stopOpacity="0.55" />
              <Stop offset="0.6" stopColor="#0A1680" stopOpacity="0.2" />
              <Stop offset="1" stopColor="#0A1680" stopOpacity="0" />
            </SvgLinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#welcomeTopGrad)" />
        </Svg>
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Top Brand Pill Header */}
        <View style={styles.topHeader}>
          <View style={styles.brandPill}>
            <Image
              source={LocalImages.logoWordmark}
              style={styles.brandLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.flexSpacer} />

        {/* Bottom Interactive Welcome Sheet */}
        <View style={styles.bottomCard}>
          {/* Mascot Greeting with Brand Aura */}
          <View style={styles.mascotWrapper}>
            <View style={styles.mascotHalo} />
            <Image
              source={LocalImages.mascotHero}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>

          {/* Title & Tag */}
          <View style={styles.textBlock}>
            <Text style={styles.title}>Lên lịch cho chuyến đi của bạn</Text>
            <Text style={styles.subtitle}>
              Chọn điểm đến, sắp xếp lịch trình và rủ bạn cùng đi.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.navigate('Onboarding')}
              activeOpacity={0.88}
            >
              <Text style={styles.primaryBtnText}>Lên kế hoạch</Text>
              <ArrowRight size={18} color="#FBEDB0" strokeWidth={2.4} />
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.loginPrompt}>Đã có tài khoản?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace('MainTabs')}
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>Đăng nhập</Text>
              </TouchableOpacity>
              <Text style={styles.dotSeparator}>•</Text>
              <TouchableOpacity
                onPress={() => navigation.replace('MainTabs')}
                activeOpacity={0.7}
              >
                <Text style={styles.signupLink}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDFF',
  },
  heroBackgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.58,
    overflow: 'hidden',
  },
  heroBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topHeader: {
    alignItems: 'center',
    paddingTop: 45,
    zIndex: 10,
  },
  brandPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  brandLogo: {
    height: 22,
    width: 90,
  },
  flexSpacer: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: '#FCFDFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  mascotWrapper: {
    width: 140,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  mascotHalo: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FBEDB0',
    opacity: 0.7,
    transform: [{ scale: 0.9 }],
  },
  mascotImage: {
    width: 120,
    height: 120,
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 27,
    fontWeight: '900',
    color: '#0A1680',
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 280,
  },
  actions: {
    width: '100%',
    gap: 14,
  },
  primaryBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#0A1680',
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 4,
  },
  loginPrompt: {
    fontSize: 13,
    color: '#64748B',
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0A1680',
  },
  dotSeparator: {
    color: '#CBD5E1',
    fontSize: 12,
  },
  signupLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
  },
});
