import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from '../../node_modules/react-native/types/index';

const LoginScreen = () => {

    // State for storing the email and password entered by the user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State to toggle visibility of the password
    const [hidePassword, setHidePassword] = useState(true);

    // Toggles the visibility of the password
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    // Handles the login attempt
    const handleLogin = async () => {
        try {

            // Attempts to log in with email and password via Firebase
            const response = await auth().signInWithEmailAndPassword(email, password);
            console.log('User logged in!', response);
        } catch (error) {

            // Log errors if login fails
            console.error('Login failed!', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#D9D9D9"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#D9D9D9"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggle}>
                <Icon name={hidePassword ? 'eye-off' : 'eye'} size={20} color="#6E6E6E" />
            </TouchableOpacity>
            <Button title="Log In" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        fontFamily: 'InriaSans-Regular',
        fontSize: 12,
        borderRadius: 20,
        height: 40,
        borderColor: 'gray'
    },
    toggle: {
        position: 'absolute',
        right: 10
    }
})

export default LoginScreen;