import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const EmptyNotesState = ({ title = 'No notes yet', hint = 'Create a note to get started' }) => (
  <View style={styles.notesCard}>
    <Text style={styles.emptyHint}>{title}</Text>
    <Text style={styles.createHint}>{hint}</Text>
  </View>
);

const styles = StyleSheet.create({
  notesCard: {
    backgroundColor: COLORS.mediumBlue,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  emptyHint: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  createHint: {
    color: COLORS.lightBlue,
    fontSize: 15,
  },
});

export default EmptyNotesState;
