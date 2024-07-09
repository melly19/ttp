import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, Image, NativeModules } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../common/Logo.png';

const { AuthModule } = NativeModules;

const LoginScreen = ({ navigation }) => {

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

            // If any of the fields are empty, re-prompt the user to enter them in
            if (!email || !password) {
                Alert.alert("Error", "All fields are required. Please do not leave any of them blank.");
                return;
            }

            // Attempts to log in with email and password via Firebase, uses the AuthModule.signIn method
            const response = await AuthModule.signInWithEmail(email, password);
            console.log('User logged in!', response);
            navigation.navigate('ProfileSetup');
        } catch (error) {

            // Log errors if login fails
            console.error('Login failed!', error);
            Alert.alert("Login failed", error);
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
            <Text style={styles.welcomeText}>Welcome back to Mosaic!</Text>
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
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
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
    welcomeText: {
        fontFamily: 'InriaSans-Regular',
        fontSize: 24,
        marginBottom: 30,
        textAlign: 'center',
        color: '#c74375'
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
    },
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20
    },
})

export default LoginScreen;