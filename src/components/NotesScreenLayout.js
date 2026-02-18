import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import NotesHeader from './NotesHeader';
import AddNoteFAB from './AddNoteFAB';

const NotesScreenLayout = ({ title, userEmail, onLogout, onAddNote, children }) => (
  <SafeAreaView style={styles.container}>
    <NotesHeader userEmail={userEmail} onLogout={onLogout} />
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
    <AddNoteFAB onPress={onAddNote} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  content: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    
  },
  sectionTitle: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default NotesScreenLayout;
