import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const NotesHeader = ({ userEmail, onLogout }) => {
  const insets = useSafeAreaInsets();
  const headerPaddingTop = Platform.OS === 'android' ? Math.max(insets.top, 12) : 20;

  return (
    <View style={[styles.header, { paddingTop: headerPaddingTop }]}>
      <View style={styles.accentLine} />
      <View style={styles.content}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={20} color={COLORS.accent} />
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeLabel}>Welcome</Text>
          <Text style={styles.userEmail} numberOfLines={1} ellipsizeMode="tail">
            {userEmail || ''}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
          activeOpacity={0.85}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.darkBlue,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingBottom: 18,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.mediumBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
    marginRight: 12,
  },
  welcomeLabel: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  userEmail: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
    opacity: 0.95,
  },
  logoutButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  logoutButtonText: {
    color: COLORS.darkBlue,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default NotesHeader;
