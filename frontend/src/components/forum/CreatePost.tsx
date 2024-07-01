import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, NativeModules, Alert } from 'react-native';

const { FirestoreModule } = NativeModules;

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [body, setBody] = useState('');

    const handlePost = async () => {

        const postData = {
            title: title,
            theme: theme,
            body: body,
            votes: 0
        }

        FirestoreModule.createPost(postData)
        .then(postId => {
            Alert.alert("Post created", "Your post has been successfully created!");
            onPostCreated({...postData, id: postId, timestamp: new Date().toISOString()});
        })
        .catch(error => {
            Alert.alert("Failed to create post", error.message);
        })
    };

    return (
        <View style={styles.container}>
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
            <Button title="Post" onPress={handlePost} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    input: {
        height: 40,
        width: 300,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    },
    bodyInput: {
        height: 100,
        width: 300,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    }
});

export default CreatePost;
