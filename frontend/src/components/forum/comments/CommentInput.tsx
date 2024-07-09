import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, NativeModules, Alert } from 'react-native';

const { FirestoreModule, AuthModule } = NativeModules;

const CommentInput = ({ postId, onCommentPosted }) => {
    const [commentText, setCommentText] = useState('');

    const handleAddComment = async () => {
        if (commentText.trim() === '') {
            Alert.alert("Error", "Comment cannot be empty.");
            return;
        }

        try {
            const userId = await AuthModule.getCurrentUserUID();
            const commentData = {
                text: commentText,
                
            };

            const commentId = await FirestoreModule.addCommentToPost(userId, postId, commentData);
            setCommentText('');
            if (onCommentPosted) {
                onCommentPosted();
            }
        } catch (error) {
            Alert.alert("Failed to add comment", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Write a comment..."
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                <Text style={styles.buttonText}>Post Comment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        minHeight: 50,
        marginBottom: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor: '#6200ea',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default CommentInput;