import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator } from 'react-native';
import { useState } from 'react';

import { COLORS } from '../constants/colors';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/FireBaseConfig';


const SignUpScreen = ({navigation}) => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false);

    
    const handleSignUp=async()=>{
        setError(''); // clear the error message
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields');
            return;
        }
        setLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, email.trim(), password);
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') setError('This email is already registered.');
            else if (err.code === 'auth/invalid-email') setError('Please enter a valid email address.');
            else if (err.code === 'auth/weak-password') setError('Password must be at least 6 characters.');
            else setError('Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }

    };
  
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView behavior= {Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>        

        <View style={styles.container}>
            <Text style={styles.title}>Create an account</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                placeholder="Email"
                value={email}
                placeholderTextColor={COLORS.lightBlue}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                value={password}
                placeholderTextColor={COLORS.lightBlue}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry //this is to hide the password
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color={COLORS.darkBlue} />
                ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>



        </View>
        </KeyboardAvoidingView>

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 30,
    textAlign: 'center',
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
    justifyContent: 'center',
    marginTop: 10,
    height: 55,
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
  errorText: {
    color: COLORS.red,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignUpScreen;