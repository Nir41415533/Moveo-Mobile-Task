import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const AddNoteFAB = ({ onPress }) => (
  <TouchableOpacity style={styles.fabButton} onPress={onPress} activeOpacity={0.85}>
    <Text style={styles.fabButtonText}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fabButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  fabButtonText: {
    color: COLORS.darkBlue,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default AddNoteFAB;
