import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const NoteCard = ({ note, onPress }) => (
  <TouchableOpacity style={styles.noteCard} onPress={() => onPress(note.id)} activeOpacity={0.8}>
    <View style={styles.cardContent}>
      <View style={styles.textBlock}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {note.title || 'Untitled'}
        </Text>
        <Text style={styles.noteDate}>
          {note.noteDate || (note.createdAt && new Date(note.createdAt).toLocaleDateString())}
        </Text>
        <Text style={styles.notePreview} numberOfLines={2}>
          {note.body || ''}
        </Text>
      </View>
      {note.imageBase64 ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${note.imageBase64}` }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : null}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: COLORS.mediumBlue,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginLeft: 12,
  },
  noteTitle: {
    color: COLORS.accent,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noteDate: {
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
