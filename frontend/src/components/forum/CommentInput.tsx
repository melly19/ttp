import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, NativeModules, Alert } from 'react-native';

const { FirestoreModule } = NativeModules;

const CommentInput = ({ postId, onCommentPosted }) => {
    const [commentText, setCommentText] = useState('');

    const handleAddComment = () => {
        if (commentText.trim() === '') {
            Alert.alert("Error", "Comment cannot be empty.");
            return;
        }

        const commentData = {
            text: commentText,
            // You can add other data such as user information if needed
        };

        FirestoreModule.addCommentToPost(postId, commentData).then(commentId => {
            setCommentText('');
            if (onCommentPosted) {
                onCommentPosted();
            }
        })
        .catch(error => {
            Alert.alert("Error", "Failed to add comment: " + error.message);
        });
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
            <Button title="Post Comment" onPress={handleAddComment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        minHeight: 50,
        marginBottom: 10,
    },
});

export default CommentInput;