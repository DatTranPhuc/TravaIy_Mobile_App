import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LocalImages } from '../../assets/images';
import { ArrowLeft, Mail, ArrowRight, Sparkles, KeyRound } from 'lucide-react-native';

interface Props {
  navigation: any;
}

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSendRecovery = () => {
    if (!emailOrPhone.trim()) {
      Alert.alert('Chưa nhập thông tin', 'Vui lòng nhập Email hoặc Số điện thoại để nhận mã khôi phục.');
      return;
    }

    setIsSent(true);
    Alert.alert(
      'Đã gửi mã khôi phục! 📩',
      `Mã OTP xác thực đã được gửi tới ${emailOrPhone.trim()}. Vui lòng kiểm tra hộp thư hoặc tin nhắn SMS của bạn.`,
      [
        {
          text: 'Quay lại Đăng nhập ✨',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft size={22} color="#0A1680" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Khôi phục mật khẩu</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero Mascot Icon */}
          <View style={styles.iconCircle}>
            <Image
              source={LocalImages.lumiWave}
              style={styles.mascotImg}
              resizeMode="contain"
            />
          </View>

          <View style={styles.pillBadge}>
            <Sparkles size={11} color="#B45309" />
            <Text style={styles.pillText}>HỖ TRỢ TÀI KHOẢN</Text>
          </View>

          <Text style={styles.title}>Quên mật khẩu?</Text>
          <Text style={styles.subTitle}>
            Đừng lo lắng! Hãy nhập email hoặc số điện thoại đã đăng ký, Bé Sao Lumi sẽ giúp bạn gửi mã OTP xác thực để tạo lại mật khẩu mới.
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email hoặc Số điện thoại</Text>
              <View style={styles.inputWrap}>
                <Mail size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="example@travaiy.com"
                  placeholderTextColor="#94A3B8"
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSendRecovery}
              activeOpacity={0.88}
            >
              <Text style={styles.submitBtnText}>Gửi mã khôi phục</Text>
              <ArrowRight size={18} color="#FBEDB0" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToLoginBtn}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
            >
              <Text style={styles.backToLoginText}>Quay lại Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFDFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A1680',
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderColor: '#FBEDB0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  mascotImg: {
    width: 66,
    height: 66,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#F1B94C',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 8,
  },
  pillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0A1680',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  form: {
    width: '100%',
    gap: 18,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  submitBtn: {
    backgroundColor: '#0A1680',
    borderRadius: 22,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  backToLoginBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backToLoginText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A1680',
  },
});

