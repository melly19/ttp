import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostItem = ({ post }) => {

    const navigation = useNavigation();

    const navigateToPostDetails = () => {
        navigation.navigate('PostDetails', { 
            postId: post.id,
            postTitle: post.title,
            postBody: post.body,
            postVotes: post.votes,
            name: post.name
        });
    };

    return (
        <TouchableOpacity style={styles.postContainer} onPress={navigateToPostDetails}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.detail}>Theme: {post.theme}</Text>
            <Text style={styles.detail}>Posted by: {post.name}</Text>
            <View style={styles.voteContainer}>
                <Text style={styles.detail}>Votes: {post.votes}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        borderRadius: 5,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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