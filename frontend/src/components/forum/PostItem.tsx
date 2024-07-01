import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PostItem = ({ post, onVotePressed }) => {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.detail}>Theme: {post.theme}</Text>
            <Text style={styles.detail}>Posted by: {post.username}</Text>
            <View style={styles.voteContainer}>
                <Text style={styles.detail}>Votes: {post.votes}</Text>
                <TouchableOpacity style={styles.voteButton} onPress={() => onVotePressed(post.id)}>
                    <Text style={styles.voteText}>Upvote</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.detail}>Comments: {post.commentsNumber}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
    },
    voteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    voteButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    voteText: {
        color: 'white',
        fontSize: 16,
    },
});

export default PostItem;