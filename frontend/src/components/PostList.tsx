import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, NativeModules } from 'react-native';

const { FirestoreModule } = NativeModules;

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(querySnapshot => {
                const posts = [];
                querySnapshot.forEach(documentSnapshot => {
                    posts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setPosts(posts);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => (
                <View style={styles.post}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{item.body}</Text>
                    <Button title="Like" onPress={() => likePost(item.key)} />
                    {/* Add a button for comments or show comments directly */}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    post: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontWeight: 'bold',
    },
});

export default PostList;
