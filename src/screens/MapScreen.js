import { useState, useEffect, useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/FireBaseConfig';
import { getNotesByUserId } from '../services/notesService';
import NotesScreenLayout from '../components/NotesScreenLayout';
import NotesLoadingState from '../components/NotesLoadingState';
import EmptyNotesState from '../components/EmptyNotesState';
import NotesMap from '../components/NotesMap';

const DEFAULT_REGION = {
  latitude: 35.7,
  longitude: 33.3818,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const MapScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = useCallback(async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const list = await getNotesByUserId(user.uid);
      setNotes(list);
    } catch (err) {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation, loadNotes]);

  const openNote = (noteId) => {
    navigation.navigate('NoteDetail', { noteId });
  };

  const notesWithLocation = notes.filter((n) => n.latitude != null && n.longitude != null);
  const initialRegion =
    notesWithLocation.length > 0
      ? {
          latitude: notesWithLocation[0].latitude,
          longitude: notesWithLocation[0].longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
      : DEFAULT_REGION;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  const renderContent = () => {
    if (loading) return <NotesLoadingState />;
    if (notes.length === 0) return <EmptyNotesState />;
    return (
      <NotesMap
        notesWithLocation={notesWithLocation}
        initialRegion={initialRegion}
        onNotePress={openNote}
        showNoLocationOverlay={notesWithLocation.length === 0}
      />
    );
  };

  return (
    <NotesScreenLayout
      title="Notes on Map"
      userEmail={user?.email}
      onLogout={handleLogout}
      onAddNote={() => navigation.navigate('NoteDetail', { noteId: null })}
    >
      {renderContent()}
    </NotesScreenLayout>
  );
};

export default MapScreen;
