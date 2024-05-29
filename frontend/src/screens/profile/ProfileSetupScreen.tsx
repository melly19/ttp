import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Picker, StyleSheet, Alert } from 'react-native';
import { NativeModule } from 'react-native';

const { FirestoreModule } = NativeModules;
const { AuthModule } = NativeModules;

const ProfileSetupScreen = () => {
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
            const result = await FirestoreModule.createUserProfile(uid, profileData)
            console.log("Profile created successfully!");
            Alert.alert("Success", result);
        } catch (error) {
            console.error("Error creating profile:", error);
            Alert.alert("Error", "Failed to create profile: ${error.message}");
        }
    };

    return {
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Picker
                selectValue={gender}
                onValueChange={setGender}
                style={styles.picker}
            >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
            </Picker>
            <Picker
                selectedValue={ageGroup}
                onValueChange={setAgeGroup}
                style={styles.picker}
            >
                <Picker.Item label="<18" value="<18" />
                <Picker.Item label="18-25" value="18-25" />
            </Picker>
            <TextInput
                placeholder="Position"
                value={position}
                onChangeText={setPosition}
                style={styles.input}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
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
        marginVertical: 8
    }
});

export default ProfileSetupScreen;