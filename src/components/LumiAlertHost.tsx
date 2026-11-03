import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  AlertButton,
  AlertOptions,
  Pressable,
} from 'react-native';
import { LocalImages } from '../assets/images';
import { Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react-native';

interface DialogState {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  options?: AlertOptions;
}

let showGlobalDialog: ((state: Omit<DialogState, 'visible'>) => void) | null = null;

// Patch React Native's default ugly Android Alert.alert with our custom branded Lumi Dialog
const originalAlert = Alert.alert;
Alert.alert = (
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions
) => {
  if (showGlobalDialog) {
    showGlobalDialog({ title, message, buttons, options });
  } else {
    originalAlert(title, message, buttons, options);
  }
};

export const LumiAlertHost: React.FC = () => {
  const [dialog, setDialog] = useState<DialogState>({
    visible: false,
    title: '',
    message: '',
    buttons: [],
  });

  useEffect(() => {
    showGlobalDialog = ({ title, message, buttons, options }) => {
      setDialog({
        visible: true,
        title,
        message,
        buttons:
          buttons && buttons.length > 0
            ? buttons
            : [{ text: 'Đồng ý', style: 'default' }],
        options,
      });
    };
    return () => {
      showGlobalDialog = null;
    };
  }, []);

  if (!dialog.visible) {
    return null;
  }

  const handleClose = (btn?: AlertButton) => {
    setDialog((prev) => ({ ...prev, visible: false }));
    if (btn?.onPress) {
      setTimeout(() => {
        btn.onPress?.();
      }, 80);
    }
  };

  const titleLower = (dialog.title || '').toLowerCase();
  const isWarningOrError =
    titleLower.includes('lỗi') ||
    titleLower.includes('chưa') ||
    titleLower.includes('xóa') ||
    titleLower.includes('lưu ý');

  const buttons = dialog.buttons || [{ text: 'Đồng ý', style: 'default' }];

  return (
    <Modal
      visible={dialog.visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {
        if (dialog.options?.cancelable !== false) {
          setDialog((prev) => ({ ...prev, visible: false }));
          dialog.options?.onDismiss?.();
        }
      }}
    >
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          if (dialog.options?.cancelable !== false && buttons.length === 1) {
            handleClose(buttons[0]);
          }
        }}
      >
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          {/* Top Accent Strip */}
          <View
            style={[
              styles.topStrip,
              isWarningOrError ? styles.topStripWarning : styles.topStripBrand,
            ]}
          />

          {/* Floating Mascot Avatar Badge */}
          <View style={styles.mascotBadgeWrap}>
            <View
              style={[
                styles.mascotCircle,
                isWarningOrError ? styles.mascotCircleWarn : styles.mascotCircleBrand,
              ]}
            >
              <Image
                source={
                  isWarningOrError ? LocalImages.mascotMap : LocalImages.lumiWave
                }
                style={styles.mascotImg}
                resizeMode="contain"
              />
            </View>
            <View
              style={[
                styles.miniStatusBadge,
                isWarningOrError ? styles.miniBadgeWarn : styles.miniBadgeSuccess,
              ]}
            >
              {isWarningOrError ? (
                <AlertTriangle size={12} color="#FFFFFF" />
              ) : (
                <CheckCircle2 size={12} color="#FFFFFF" />
              )}
            </View>
          </View>

          {/* Eyebrow */}
          <View style={styles.eyebrowPill}>
            <Sparkles size={11} color={isWarningOrError ? '#D97706' : '#0A1680'} />
            <Text
              style={[
                styles.eyebrowText,
                isWarningOrError && { color: '#B45309' },
              ]}
            >
              {isWarningOrError ? 'BÉ SAO LUMI NHẮC NHỞ' : 'THÔNG BÁO TỪ BÉ SAO LUMI'}
            </Text>
          </View>

          {/* Title & Message */}
          <Text style={styles.title}>{dialog.title}</Text>
          {dialog.message ? (
            <Text style={styles.message}>{dialog.message}</Text>
          ) : null}

          {/* Action Buttons */}
          <View
            style={[
              styles.buttonRow,
              buttons.length > 2 && styles.buttonColumn,
            ]}
          >
            {buttons.map((btn, idx) => {
              const isCancel = btn.style === 'cancel';
              const isDestructive = btn.style === 'destructive';
              const isPrimary =
                !isCancel && !isDestructive && (idx === buttons.length - 1 || buttons.length === 1);

              return (
                <TouchableOpacity
                  key={`${btn.text || 'OK'}-${idx}`}
                  style={[
                    styles.btn,
                    buttons.length <= 2 && { flex: 1 },
                    isCancel && styles.btnCancel,
                    isDestructive && styles.btnDestructive,
                    isPrimary && styles.btnPrimary,
                  ]}
                  activeOpacity={0.85}
                  onPress={() => handleClose(btn)}
                >
                  <Text
                    style={[
                      styles.btnText,
                      isCancel && styles.btnCancelText,
                      isDestructive && styles.btnDestructiveText,
                      isPrimary && styles.btnPrimaryText,
                    ]}
                  >
                    {btn.text === 'OK' ? 'Tuyệt vời ✨' : btn.text || 'Đồng ý'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(7, 25, 56, 0.58)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 22,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8EEFB',
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  topStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  topStripBrand: {
    backgroundColor: '#0A1680',
  },
  topStripWarning: {
    backgroundColor: '#F59E0B',
  },
  mascotBadgeWrap: {
    position: 'relative',
    marginBottom: 12,
  },
  mascotCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  mascotCircleBrand: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FBEDB0',
  },
  mascotCircleWarn: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  mascotImg: {
    width: 56,
    height: 56,
  },
  miniStatusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  miniBadgeSuccess: {
    backgroundColor: '#0A1680',
  },
  miniBadgeWarn: {
    backgroundColor: '#D97706',
  },
  eyebrowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  eyebrowText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0A1680',
    letterSpacing: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },
  message: {
    fontSize: 13.5,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginTop: 4,
  },
  buttonColumn: {
    flexDirection: 'column',
  },
  btn: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#0A1680',
    shadowColor: '#0A1680',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  btnCancel: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  btnDestructive: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  btnPrimaryText: {
    color: '#FFFFFF',
  },
  btnCancelText: {
    color: '#64748B',
  },
  btnDestructiveText: {
    color: '#DC2626',
  },
});

