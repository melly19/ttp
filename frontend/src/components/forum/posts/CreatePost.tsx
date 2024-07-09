import React, { useState } from 'react';
import { View, TextInput, StyleSheet, NativeModules, Alert, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Logo from '../../../common/Logo.png';

const { FirestoreModule, AuthModule } = NativeModules;

const CreatePost = ({ onPostCreated, onCancel }) => {
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [body, setBody] = useState('');

    const handlePost = async () => {
        if (title.trim() === '' || theme.trim() === '' || body.trim() === '') {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        try {
            const userId = await AuthModule.getCurrentUserUID();
            const postData = {
                title: title,
                theme: theme,
                body: body,
                votes: 0,
                timestamp: new Date().toISOString()
            };
            const postId = await FirestoreModule.createPost(userId, postData);
            Alert.alert("Post created", "Your post has been successfully created!");
            onPostCreated({ ...postData, id: postId });
        } catch (error) {
            Alert.alert("Failed to create post", error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.innerContainer}>
                    <Image source={Logo} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.titleText}>Share your story, start a new post!</Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Title"
                        style={styles.input}
                    />
                    <TextInput
                        value={theme}
                        onChangeText={setTheme}
                        placeholder="Theme"
                        style={styles.input}
                    />
                    <TextInput
                        value={body}
                        onChangeText={setBody}
                        placeholder="Body"
                        style={styles.bodyInput}
                        multiline
                    />
                    <TouchableOpacity style={[styles.button, styles.postButton]} onPress={handlePost}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    innerContainer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    titleText: {
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 30,
        color: '#c74375'
    },
    input: {
        height: 40,
        width: 300,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5
    },
    bodyInput: {
        height: 100,
        width: 300,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        textAlignVertical: 'top'
    },
    button: {
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    postButton: {
        backgroundColor: '#007bff',
        width: 300
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        width: 300
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CreatePost;