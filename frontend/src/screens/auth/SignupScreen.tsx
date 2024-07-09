import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, NativeModules, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../common/Logo.png';

const { AuthModule } = NativeModules;

const SignupScreen: React.FC = () => {
    const navigation = useNavigation();
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

        // If any of the fields are empty, prompt the user to enter all relevant details
        if (!email || !password || !confirmPassword) {
            Alert.alert("Error", "All fields are required. Please do not leave any of them blank.");
            return;
        }

        // If password and password confirmation doesn't match, re-prompt the user to enter again
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {

            // Call the native module method to create user
            const userId = await AuthModule.createUserWithEmail(email, password);
            Alert.alert('Success', 'User account created!');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {

            // Error handling coming from Kotlin side
            Alert.alert('Signup failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={Logo}
                    style={styles.logo}
                    reiszeMode='contain'
                />
            </View>
            <Text style={styles.welcomeText}>We're excited to have you join us!</Text>
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
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    input: {
        padding: 10,
        fontSize: 12,
        height: 40,
        borderColor: '#000'
    },
    toggle: {
        position: 'absolute',
        right: 10
    },
    welcomeText: {
        fontFamily: 'InriaSans-Regular',
        fontSize: 24,
        marginBottom: 30,
        textAlign: 'center',
        color: '#c74375'
    },
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default SignupScreen;