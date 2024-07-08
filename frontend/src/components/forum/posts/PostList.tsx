import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, NativeModules, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostItem from './PostItem';

const { FirestoreModule } = NativeModules;

const PostList = ({ refreshPosts }) => {
    const [posts, setPosts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        FirestoreModule.fetchPosts().then(fetchedPosts => {
            setPosts(fetchedPosts);
        }).catch(error => {
            Alert.alert("Failed to fetch posts", error.message);
        });
    }, [refreshPosts]);

    const handleVote = (postId) => {
        FirestoreModule.incrementPostVote(postId)
            .then(() => {
                const updatedPosts = posts.map(post => {
                    if (post.id === postId) {
                        return {...post, votes: post.votes + 1};
                    }
                    return post;
                });
                setPosts(updatedPosts);
            })
            .catch(error => Alert.alert("Failed to increment vote", error.message));
    };

    return (
        <FlatList 
            data={posts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <PostItem 
                    post={item}
                />
            )}
            style={styles.list}
        />
    )
};

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});

export default PostList;
