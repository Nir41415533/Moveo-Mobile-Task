import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const NoteDetailForm = ({
  noteDate,
  onNoteDateChange,
  title,
  onTitleChange,
  body,
  onBodyChange,
  imageBase64,
  onAddImage,
  onRemoveImage,
  onSave,
  onDelete,
  loading,
  isNew,
}) => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <Text style={styles.label}>Date</Text>
    <TextInput
      style={styles.input}
      value={noteDate}
      onChangeText={onNoteDateChange}
      placeholder="YYYY-DD-MM"
      placeholderTextColor={COLORS.lightBlue}
    />

    <Text style={styles.label}>Title</Text>
    <TextInput
      style={styles.input}
      value={title}
      onChangeText={onTitleChange}
      placeholder="Note title"
      placeholderTextColor={COLORS.lightBlue}
    />

    <Text style={styles.label}>Body</Text>
    <TextInput
      style={[styles.input, styles.bodyInput]}
      value={body}
      onChangeText={onBodyChange}
      placeholder="Note content..."
      placeholderTextColor={COLORS.lightBlue}
      multiline
    />

    <Text style={styles.label}>Image</Text>
    {imageBase64 ? (
      <View style={styles.imagePreviewWrap}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          style={styles.imagePreview}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.removeImageBtn} onPress={onRemoveImage}>
          <Ionicons name="close-circle" size={28} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity style={styles.addImageButton} onPress={onAddImage} disabled={loading}>
        <Ionicons name="image-outline" size={24} color={COLORS.lightBlue} />
        <Text style={styles.addImageText}>Add image (camera or gallery)</Text>
      </TouchableOpacity>
    )}

    <TouchableOpacity style={styles.saveButton} onPress={onSave} disabled={loading}>
      {loading ? (
        <ActivityIndicator color={COLORS.darkBlue} />
      ) : (
        <Text style={styles.saveButtonText}>Save</Text>
      )}
    </TouchableOpacity>

    {!isNew && (
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete} disabled={loading}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    )}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    color: COLORS.lightBlue,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: COLORS.mediumBlue,
    color: COLORS.white,
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
  },
  bodyInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: COLORS.accent,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    minHeight: 52,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: COLORS.darkBlue,
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButtonText: {
    color: COLORS.red,
    fontSize: 16,
    fontWeight: '600',
  },
  addImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.mediumBlue,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  addImageText: {
    color: COLORS.lightBlue,
    fontSize: 15,
    marginLeft: 8,
  },
  imagePreviewWrap: {
    position: 'relative',
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default NoteDetailForm;
