import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';

import { signOut } from 'firebase/auth';
import { auth } from '../services/FireBaseConfig';
import { getNotesByUserId } from '../services/notesService';

import NotesScreenLayout from '../components/NotesScreenLayout';
import NotesLoadingState from '../components/NotesLoadingState';
import EmptyNotesState from '../components/EmptyNotesState';
import NoteCard from '../components/NoteCard';

const ListScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = useCallback(async () => {
    if (!user?.uid) { //if the user is not logged in, set the loading to false and return
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
    const unsubscribe = navigation.addListener('focus', loadNotes); //addListener is used to listen to the focus event and load the notes when the component is focused
    return unsubscribe;
  }, [navigation, loadNotes]);

  const openNote = (noteId) => {
    navigation.navigate('NoteDetail', { noteId });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  const renderContent = () => {
    if (loading) return <NotesLoadingState />;
    if (notes.length === 0) return <EmptyNotesState />;
    return (
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteCard note={item} onPress={openNote} />}
        contentContainerStyle={{ paddingBottom: 100 }} //+100px padding bottom
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <NotesScreenLayout
      title="Your Notes"
      userEmail={user?.email}
      onLogout={handleLogout}
      onAddNote={() => navigation.navigate('NoteDetail', { noteId: null })}
    >
      {renderContent()}
    </NotesScreenLayout>
  );
};

export default ListScreen;
