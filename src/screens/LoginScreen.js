import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator } from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/FireBaseConfig';

import { COLORS } from '../constants/colors';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError(''); 
        
        if (email.trim() === '' || password.trim() === '') {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            //login to firebase
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (err) {
            //translate firebase errors to user friendly errors
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>User Login</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor={COLORS.lightBlue}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor={COLORS.lightBlue}
                        style={styles.input}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={COLORS.darkBlue} />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                        <View style={styles.lastLine}>
                        <Text style={styles.whiteText}>Don't have an account?  </Text>
                        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
                        <Text style={styles.linkText}> Sign Up</Text>
                        </TouchableOpacity>
                        </View>
                   
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.darkBlue,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 30,
        textAlign: 'center',
    },
    errorText: {
        color: COLORS.red,
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '600',
    },
    input: {
        backgroundColor: COLORS.mediumBlue,
        color: COLORS.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: COLORS.accent,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        height: 55,
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.darkBlue,
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkText: {
        color: COLORS.accent,
        textAlign: 'center',
        marginTop: 20,
    },
    lastLine: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteText: {
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default LoginScreen;