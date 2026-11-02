import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import { ArrowLeft, Send } from 'lucide-react-native';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMine: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'Linh Chi',
    text: 'Mọi người nhớ chuẩn bị kem chống nắng và mũ rộng vành nhé, trưa nay trời nắng đẹp lắm!',
    time: '09:20',
    isMine: false,
  },
  {
    id: 'm2',
    sender: 'Minh Anh',
    text: 'Mình đã book xong vé cáp treo Bà Nà rồi, lát tới nơi chỉ cần quét mã QR thôi.',
    time: '09:25',
    isMine: false,
  },
  {
    id: 'm3',
    sender: 'Bạn',
    text: 'Tuyệt vời quá! Mình đã cập nhật lại chi phí vào bảng chi tiêu chung rồi nhé.',
    time: '09:30',
    isMine: true,
  },
  {
    id: 'm4',
    sender: 'Quang Huy',
    text: 'Trưa nay ăn ở quán Năm Đảnh hay Bé Mặn vậy mọi người?',
    time: '09:35',
    isMine: false,
  },
];

export const GroupChatScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<any>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'Bạn',
      text: inputText.trim(),
      time: new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' }).format(new Date()),
      isMine: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Trò chuyện nhóm</Text>
          <Text style={styles.headerSub}>4 thành viên · Đang online</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((item) => (
            <View
              key={item.id}
              style={[
                styles.messageRow,
                item.isMine ? styles.myMessageRow : styles.otherMessageRow,
              ]}
            >
              {!item.isMine && (
                <View style={styles.senderAvatar}>
                  <Text style={styles.senderAvatarText}>
                    {item.sender.slice(0, 1)}
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.bubble,
                  item.isMine ? styles.myBubble : styles.otherBubble,
                ]}
              >
                {!item.isMine && <Text style={styles.senderName}>{item.sender}</Text>}
                <Text
                  style={[
                    styles.messageText,
                    item.isMine ? styles.myMessageText : styles.otherMessageText,
                  ]}
                >
                  {item.text}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    item.isMine ? styles.myMessageTime : styles.otherMessageTime,
                  ]}
                >
                  {item.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            placeholder="Nhập tin nhắn..."
            placeholderTextColor={Colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            style={styles.textInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.disabledSendBtn]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Send size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerInfo: { alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: Colors.text },
  headerSub: { fontSize: 11, color: Colors.success, fontWeight: '600', marginTop: 1 },
  messageList: { padding: 16, gap: 14 },
  messageRow: { flexDirection: 'row', gap: 8, maxWidth: '82%' },
  myMessageRow: { alignSelf: 'flex-end', justifyContent: 'flex-end' },
  otherMessageRow: { alignSelf: 'flex-start' },
  senderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  senderAvatarText: { fontSize: 12, fontWeight: '700', color: '#7C3AED' },
  bubble: { borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
  myBubble: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  otherBubble: {
    backgroundColor: Colors.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  senderName: { fontSize: 11, fontWeight: '700', color: Colors.primary, marginBottom: 2 },
  messageText: { fontSize: 14, lineHeight: 20 },
  myMessageText: { color: Colors.white },
  otherMessageText: { color: Colors.text },
  messageTime: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  myMessageTime: { color: 'rgba(255, 255, 255, 0.7)' },
  otherMessageTime: { color: Colors.textSecondary },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.text,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledSendBtn: { backgroundColor: Colors.textSecondary, opacity: 0.5 },
});
