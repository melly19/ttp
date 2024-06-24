import React, { useEffect, useState } from 'react';
import ScreenTemplate from '../ScreenTemplate';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Button, Text, StyleSheet, Alert, NativeModules } from 'react-native';

const { FirestoreModule, AuthModule } = NativeModules;

const ProfileScreen: React.FC = ({ navigation }) => {
    const [uid, setUid] = useState(null);
    const [profile, setProfile] = useState({
        name: '',
        gender: '',
        ageGroup: '',
        position: ''
    });

    const handleSignout = async () => {
        try {
            await AuthModule.signOut();
            navigation.replace('AuthToggle');
        } catch (error) {
            Alert.alert("Sign out failed", "Unable to sign out, please try again.")
        }
    };

    useEffect(() => {
        const fetchProfile = async() => {
            try {
                const userId = "current_user_id"; // Fetch from auth or pass as a prop
                FirestoreModule.getUserProfile(userId, (error, profileData) => {
                    if (error) {
                        console.error("Failed to fetch profile:", error);
                        Alert.alert("Error", "Failed to load profile.");
                    } else {
                        setProfile(profileData || {});
                    }
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async() => {
        try {
            const userId = "current_user_id"; // Fetch from auth or pass as a prop
            FirestoreModule.updateUserProfile(userId, profile, (error, message) => {
                if (error) {
                    console.error("Failed to update profile:", error);
                    Alert.alert("Error", "Failed to update profile.");
                } else {
                    Alert.alert("Success", "Profile updated successfully.");
                    // navigation.goBack();
                }
            });
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Name:</Text>
            <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => setProfile({...profile, name: text})}
            />
            <Text>Gender:</Text>
            <TextInput
                style={styles.input}
                value={profile.gender}
                onChangeText={(text) => setProfile({...profile, gender:text})}
            />
            <Text>Age group:</Text>
            <TextInput
                style={styles.input}
                value={profile.ageGroup}
                onChangeText={(text) => setProfile({...profile, ageGroup:text})}
            />
            <Text>Position:</Text>
            <TextInput
                style={styles.input}
                value={profile.position}
                onChangeText={(text) => setProfile({...profile, position:text})}
            />
            <Button title="Save Changes" onPress={handleSave} />
            <Button title="Sign Out" onPress={handleSignout} color="#FF6347" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10
    }
});

export default ProfileScreen;