import React from 'react';
import { Modal, View, TextInput, Text, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProfileFormModal = ({ modalVisible, setModalVisible, profile, setProfile, handleSave }) => {
    return (
        <Modal
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
                style={styles.container}
            >
                <ScrollView>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Change your profile details here!</Text>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput style={styles.input} value={profile.name} onChangeText={(text) => setProfile({ ...profile, name: text })} placeholder="Name" />
                        <Text style={styles.label}>Gender:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={profile.gender}
                                onValueChange={(itemValue) => setProfile({...profile, gender: itemValue})}
                                style={styles.picker}
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                        <Text style={styles.label}>Age group:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={profile.ageGroup}
                                onValueChange={(itemValue) => setProfile({...profile, ageGroup: itemValue})}
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
                        <Text style={styles.label}>Position:</Text>
                        <TextInput style={styles.input} value={profile.position} onChangeText={(text) => setProfile({ ...profile, position: text })} placeholder="Position" />
                        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalContent: {
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        padding: 20,
        backgroundColor: 'white',
        width: '80%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        padding: 10,
        fontFamily: 'InriaSans-Regular'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width: '100%',
        fontSize: 16
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        alignSelf: 'flex-start'
    },
    picker: {
        width: '100%',
        height: 40
    },
    pickerContainer: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 10
    },
    button: {
        width: '100%',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5
    },
    saveButton: {
        backgroundColor: '#007bff'
    },
    cancelButton: {
        backgroundColor: '#ff6347'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ProfileFormModal;