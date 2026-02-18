import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/FireBaseConfig';


const SignUpScreen = ({navigation}) => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('')

    
    const handleSignUp=async()=>{
        setError(''); // clear the error message
        if(email==='' || password===''){
            setError('Error: Please fill in all fields');
            return;
        }
        try{
            await createUserWithEmailAndPassword(auth,email.trim(),password); //trim to white spaces and no need navitigation here 
            console.log('User created successfully');
        }
        catch(error){
            setError('Error: '+error.message);
        }

    };
  
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Create an account</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                placeholder='Email'
                value={email}
                placeholderTextColor={COLORS.lightBlue}
                onChangeText={setEmail}
                autoCapitalize='none'
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

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}> Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>



        </View>
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
    marginTop: 10,
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