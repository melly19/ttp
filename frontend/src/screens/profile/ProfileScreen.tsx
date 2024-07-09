import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, NativeModules, TouchableOpacity } from 'react-native';
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
            <View style={styles.profileContainer}>
                <ProfileDetails profile={profile} />
            </View>
            <ProfileFormModal
                modalVisible={editModalVisible}
                setModalVisible={setEditModalVisible}
                profile={profile}
                setProfile={setProfile}
                handleSave={handleSave}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setEditModalVisible(true)}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={handleSignout}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0'
    },
    profileContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        marginBottom: 20
    },
    buttonContainer: {
        width: '100%',
        marginTop: 15,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    signOutButton: {
        backgroundColor: '#FF6347'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;