import { View, Text, StyleSheet } from 'react-native';
const NoteDetailScreen = () => {
    return (
        <View style={styles.container}>
            <Text>NoteDetailScreen</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{ flex:1, justifyContent:'center', alignItems:'center' }
})
export default NoteDetailScreen;
