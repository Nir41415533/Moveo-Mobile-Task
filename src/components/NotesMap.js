import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

let MapView;
let Marker;

try {
  //require is used to import the react-native-maps module
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
} catch (e) {
  MapView = null;
  Marker = null;
}

const NotesMap = ({ notesWithLocation, initialRegion, onNotePress, showNoLocationOverlay }) => {
  if (!MapView || !Marker) {
    return (
      <View style={styles.notesCard}>
        <Text style={styles.emptyHint}>Map view</Text>
        <Text style={styles.createHint}> ERROR: need to run 'npx expo install react-native-maps' to install the module</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapWrapper}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {notesWithLocation.map((note) => (
          <Marker
            key={note.id}
            coordinate={{ latitude: note.latitude, longitude: note.longitude }}
            title={note.title || 'Note'}
            onPress={() => onNotePress(note.id)}
            pinColor={COLORS.accent}
          />
        ))}
      </MapView>
      {showNoLocationOverlay && (
        <View style={styles.mapOverlay}>
          <Text style={styles.mapOverlayText}>
            No notes have location yet. Save a note with location from the Note screen.
          </Text>
        </View>
      )}
    </View>
  );
};

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
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  createHint: {
    color: COLORS.lightBlue,
    fontSize: 15,
  },
  mapWrapper: {
    flex: 1,
    minHeight: 300,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
    minHeight: 300,
    borderRadius: 16,
    paddingBottom: 5,
    
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
    borderRadius: 12,
  },
  mapOverlayText: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NotesMap;
