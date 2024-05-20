import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, NativeModules } from 'react-native';

const { AuthModule } = NativeModules;

const SignupScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {

        // If password and password confirmation doesn't match, re-prompt the user to enter again
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {

            // Call the native module method to create user
            const userId = await AuthModule.createUserWithEmail(email, password);
            Alert.alert('Success', 'User account created & signed in with ID:', {userId});
        } catch (error) {

            // Error handling coming from Kotlin side
            console.error('Login failed:', error);
            Alert.alert('Signup failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#D9D9D9"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#D9D9D9"
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="#D9D9D9"
            />
            <Button title="Sign Up" onPress={handleSignUp} />
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
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    }
});

export default SignupScreen;