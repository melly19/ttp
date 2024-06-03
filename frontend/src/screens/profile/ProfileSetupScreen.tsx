import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeModules } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const { FirestoreModule } = NativeModules;
const { AuthModule } = NativeModules;

const ProfileSetupScreen = ({ navigation }) => {
    const [uid, setUid] = useState(null);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [position, setPosition] = useState('');

    useEffect(() => {

        // Fetches the UID of the current user that is logged in
        const fetchUID = async () => {
            try {
                const uid = await AuthModule.getCurrentUserUID();
                setUid(uid);
            } catch (error) {
                console.error("Failed to fetch UID:", error);
                Alert.alert("Error", "Unable to fetch user details. Please log in again.");
                // Navigate to the log in screen
                navigation.navigate("AuthToggle");
            }
        };

        fetchUID();
    }, []);
    

    const handleSubmit = async () => {

        // If there is no uid, the user has not been properly authenticated
        if (!uid) {
            Alert.alert("Error", "User not properly authenticated.");
            return;
        }

        // Stores the relevant profile data that the user has to input
        const profileData = {
            name,
            gender,
            ageGroup,
            position
        }

        try {

            // Creates the user profile to store into the database for new users (only new users
            // will be shown this profile setup screen when they first log in)
            FirestoreModule.createUserProfile(uid, profileData).then(result => {
                console.log("Profile created successfully!", result);
                Alert.alert("Success", "Profile created successfully!");
                navigation.navigate("MainApp");
            });
        } catch (error) {
            console.error("Error creating profile:", error);
            Alert.alert("Error", "Failed to create profile: ${error.message}");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Let's set up your profile!</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>What's your name?</Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>What's your gender?</Text>
                <Picker
                    selectedValue={gender}
                    onValueChange={setGender}
                    style={styles.picker}
                >
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>What's your age group?</Text>
                <Picker
                    selectedValue={ageGroup}
                    onValueChange={setAgeGroup}
                    style={styles.picker}
                >
                    <Picker.Item label="<18" value="<18" />
                    <Picker.Item label="18-25" value="18-25" />
                    <Picker.Item label="26-35" value="26-35" />
                    <Picker.Item label="36-45" value="36-45" />
                    <Picker.Item label="46-55" value="46-55" />
                    <Picker.Item label="56-65" value="56-65" />
                    <Picker.Item label=">65" value=">65" />
                </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>What's your position?</Text>
                <TextInput
                    placeholder="Position"
                    value={position}
                    onChangeText={setPosition}
                    style={styles.input}
                />
            </View>
            <Button title="Complete profile" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    inputContainer: {
        marginBottom: 20
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5
    },
    picker: {
        width: "100%",
        marginVertical: 8,
        backgroundColor: '#fff'
    }
});

export default ProfileSetupScreen;