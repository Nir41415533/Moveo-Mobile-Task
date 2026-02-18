import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/FireBaseConfig';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainScreen from '../screens/MainScreen'; 
import NoteDetailScreen from '../screens/NoteDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// MainTabs is the bottom tab navigator
const MainTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            {/* בעתיד נפריד את זה לשני קבצים שונים: List ו-Map */}
            <Tab.Screen name="List" component={MainScreen} options={{ title: 'רשימה' }} />
            <Tab.Screen name="Map" component={MainScreen} options={{ title: 'מפה' }} />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { //this is to check if the user is logged in or not
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
            setUser(authenticatedUser);
            setLoading(false);
        });
        return () => unsubscribe(); //cleanup, firebase stops listening to the user when the component unmounts
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
                    <Stack.Screen name="AppHome" component={MainTabs} />
                    {/* NoteDetail חייב להיות ב-Stack כדי שנוכל לעבור אליו מכל טאב */}
                    <Stack.Screen 
                        name="NoteDetail" 
                        component={NoteDetailScreen} 
                        options={{ headerShown: true, title: 'new note' }} 
                    />
                </>
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