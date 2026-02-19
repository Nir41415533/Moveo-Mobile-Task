import { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { COLORS } from '../constants/colors';

import { auth } from '../services/FireBaseConfig';
import { getNoteById, addNote, updateNote, deleteNote, formatNoteDate } from '../services/notesService';
import { getCurrentLocation } from '../services/locationService';
import { pickImageFromCamera, pickImageFromGallery } from '../services/imageService';
import NoteDetailForm from '../components/NoteDetailForm';

const NoteDetailScreen = ({ route, navigation }) => {
  const noteId = route.params?.noteId ?? null;
  const isNew = noteId == null;

  const [noteDate, setNoteDate] = useState(formatNoteDate(new Date()));
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingNote, setLoadingNote] = useState(!isNew);

  useEffect(() => {
    if (!isNew && noteId) {
      getNoteById(noteId)
        .then((note) => {
          if (note) {
            setNoteDate(note.noteDate || formatNoteDate(new Date()));
            setTitle(note.title || '');
            setBody(note.body || '');
            setImageBase64(note.imageBase64 ?? null);
          }
        })
        .finally(() => setLoadingNote(false));
    }
  }, [noteId, isNew]);

  const handleAddImage = () => {
    Alert.alert('Add image', 'Choose source', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Camera', onPress: async () => { const b64 = await pickImageFromCamera(); if (b64) setImageBase64(b64); } },
      { text: 'Gallery', onPress: async () => { const b64 = await pickImageFromGallery(); if (b64) setImageBase64(b64); } },
    ]);
  };

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Error', 'You must be logged in to save a note.');
      return;
    }
    setLoading(true);
    try {
      const { latitude, longitude } = await getCurrentLocation();
      if (isNew) {
        await addNote({
          userId,
          title: title.trim(),
          body: body.trim(),
          noteDate,
          latitude,
          longitude,
          imageBase64,
        });
      } else {
        await updateNote(noteId, {
          title: title.trim(),
          body: body.trim(),
          noteDate,
          latitude,
          longitude,
          imageBase64,
        });
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err?.message || 'Failed to save note.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (isNew) return;
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            await deleteNote(noteId);
            navigation.goBack();
          } catch (err) {
            Alert.alert('Error', 'Failed to delete note.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  if (loadingNote) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <NoteDetailForm
      noteDate={noteDate}
      onNoteDateChange={setNoteDate}
      title={title}
      onTitleChange={setTitle}
      body={body}
      onBodyChange={setBody}
      imageBase64={imageBase64}
      onAddImage={handleAddImage}
      onRemoveImage={() => setImageBase64(null)}
      onSave={handleSave}
      onDelete={handleDelete}
      loading={loading}
      isNew={isNew}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoteDetailScreen;
