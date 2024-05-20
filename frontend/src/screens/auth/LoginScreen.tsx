import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeModules } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { AuthModule } = NativeModules;

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

            // Attempts to log in with email and password via Firebase, uses the AuthModule.signIn method
            const response = await AuthModule.signInWithEmail(email, password);
            console.log('User logged in!', response);
        } catch (error) {

            // Log errors if login fails
            console.error('Login failed!', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor="#D9D9D9"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={hidePassword}
                    style={styles.input}
                    placeholderTextColor="#D9D9D9"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggle}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={20} color={'#6E6E6E'} />
                </TouchableOpacity>
            </View>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray'
    },
    input: {
        padding: 10,
        fontFamily: 'InriaSans-Regular',
        fontSize: 12,
        height: 40,
        borderColor: '#000'
    },
    toggle: {
        position: 'absolute',
        right: 10
    }
})

export default LoginScreen;