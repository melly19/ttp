import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, NativeModules, Modal } from 'react-native';
import ProfileDetails from '../../components/profile/ProfileDetails';
import ProfileFormModal from '../../components/profile/ProfileFormModal';

const { FirestoreModule, AuthModule } = NativeModules;

const ProfileScreen = ({ navigation }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        gender: '',
        ageGroup: '',
        position: ''
    });

    useEffect(() => {
        let isMounted = true; // Flag to check if component is mounted
    
        async function fetchProfile() {
            try {
                const userId = await AuthModule.getCurrentUserUID();
                const profileData = await FirestoreModule.getUserProfile(userId);
                if (isMounted) {
                    setProfile(profileData || {});
                }
            } catch (error) {
                Alert.alert("Failed to load profile", error.message);
            }
        }
    
        fetchProfile();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleSignout = async () => {
        try {
            await AuthModule.signOut();
            navigation.replace('AuthToggle');
        } catch (error) {
            Alert.alert("Sign out failed", error.message);
        }
    };

    const handleSave = async () => {
        try {
            const userId = await AuthModule.getCurrentUserUID();
            await FirestoreModule.updateUserProfile(userId, profile);
            Alert.alert("Success", "Profile updated successfully");
            setEditModalVisible(false);
        } catch (error) {
            Alert.alert("Failed to update profile", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ProfileDetails profile={profile} />
            <ProfileFormModal
                modalVisible={editModalVisible}
                setModalVisible={setEditModalVisible}
                profile={profile}
                setProfile={setProfile}
                handleSave={handleSave}
            />
            <View style={styles.buttonContainer}>
                <Button title="Edit Profile" onPress={() => setEditModalVisible(true)} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Sign Out" onPress={handleSignout} color='#FF6347' />
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    buttonContainer: {
        marginTop: 15
    }
});

export default ProfileScreen;