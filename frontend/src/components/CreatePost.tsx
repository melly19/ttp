import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [theme, setTheme] = useState('');

    const handlePost = async () => {
        await firestore().collection('Posts').add({
            title: title,
            theme: theme,
            body: body,
            timestamp: firestore.FieldValue.serverTimestamp(),
        });
        setTitle('');
        setBody('');
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
                style={styles.input}
                multiline
            />
            <Button title="Post" onPress={handlePost} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
});

export default CreatePost;
