import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, NativeModules, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { AuthModule } = NativeModules;

const SignupScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State to toggle visibility of the password
    const [hidePassword, setHidePassword] = useState(true);

    // Toggles the visibility of the password
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    // State to toggle visibility of the confirmed password
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    // Toggles the visibility of the confirmed password
    const toggleConfirmPasswordVisibility = () => {
        setHideConfirmPassword(!hideConfirmPassword);
    };

    const handleSignUp = async () => {

        // If password and password confirmation doesn't match, re-prompt the user to enter again
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {

            // Call the native module method to create user
            const userId = await AuthModule.createUserWithEmail(email, password);
            Alert.alert('Success', 'User account created & signed in with ID:, ${userId}');
        } catch (error) {

            // Error handling coming from Kotlin side
            console.error('Login failed:', error);
            Alert.alert('Signup failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor="#D9D9D9"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={hidePassword}
                    placeholderTextColor="#D9D9D9"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggle}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={20} color={'#6E6E6E'} />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={hideConfirmPassword}
                    placeholderTextColor="#D9D9D9"
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.toggle}>
                    <Ionicons name={hideConfirmPassword ? 'eye-off' : 'eye'} size={20} color={'#6E6E6E'} />
                </TouchableOpacity>
            </View>
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FAF3E3'
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
});

export default SignupScreen;