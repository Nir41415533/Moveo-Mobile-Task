import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const NoteCard = ({ note, onPress }) => (
  <TouchableOpacity style={styles.noteCard} onPress={() => onPress(note.id)} activeOpacity={0.8}>
    <Text style={styles.noteTitle} numberOfLines={1}>
      {note.title || 'Untitled'}
    </Text>
    <Text style={styles.noteDate}>
      {note.noteDate || (note.createdAt && new Date(note.createdAt).toLocaleDateString())}
    </Text>
    <Text style={styles.notePreview} numberOfLines={2}>
      {note.body || ''}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: COLORS.mediumBlue,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  noteTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.accent,
  },
  noteDate: {
    flexDirection: 'row',
    color: COLORS.lightBlue,
    fontSize: 13,
    marginBottom: 6,
  
  },
  notePreview: {
    color: COLORS.white,
    fontSize: 15,
    opacity: 0.9,
  },
});

export default NoteCard;
