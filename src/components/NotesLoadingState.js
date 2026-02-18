import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const NotesLoadingState = () => (
  <View style={styles.emptyContainer}>
    <ActivityIndicator size="large" color={COLORS.accent} />
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotesLoadingState;
