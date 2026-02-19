import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/FireBaseConfig';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#f9b17a',
                tabBarInactiveTintColor: '#67719d',
            }}
        >
            <Tab.Screen
                name="List"
                component={ListScreen}
                options={{
                    title: 'List',
                    tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: 'Map',
                    tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        // onAuthStateChanged is a firebase function that listens to the user's authentication state
        // auth is the firebase auth instance
        // authenticateduser is the user object if the user is logged in, otherwise it is null
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
            if (!cancelled) {
                setUser(authenticatedUser);
                setLoading(false);
            }
        }, (err) => {
            if (!cancelled) setLoading(false);
        });
        const timeout = setTimeout(() => {
            if (!cancelled) setLoading(false);
        }, 8000);
        return () => {
            cancelled = true;
            clearTimeout(timeout);
            unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#2d3250' }}>
                <ActivityIndicator size="large" color="#f9b17a" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Screen name="Back" component={MainTabs} />
                    <Stack.Screen
                        name="NoteDetail"
                        component={NoteDetailScreen}
                        options={({ route }) => ({
                            headerShown: true,
                            title: route.params?.noteId ? 'Edit Note' : 'New Note',
                            headerStyle: { backgroundColor: '#424769' },
                            headerTintColor: '#ffffff',
                        })}
                    />
                </> 
                //else
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;