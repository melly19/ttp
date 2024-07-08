import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList, Button, Modal, NativeModules } from 'react-native';
import CreatePost from '../../components/forum/posts/CreatePost';
import PostItem from '../../components/forum/posts/PostItem'; 
import PostList from '../../components/forum/posts/PostList';

const { FirestoreModule } = NativeModules;

const ForumScreen: React.FC = () => {
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);

    const toggleCreatePostModal = () => {
        setCreateModalVisible(!isCreateModalVisible);
    }

    const fetchPosts = () => {
        FirestoreModule.fetchPosts()
            .then(fetchedPosts => {
                setPosts(fetchedPosts);
            })
            .catch(error => {
                Alert.alert("Failed to fetch posts", error.message);
            })
    }

    useEffect(() => {
        fetchPosts();
    })

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
        toggleCreatePostModal();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Current Posts</Text>
            <PostList />
            <Button title="Create Post" onPress={toggleCreatePostModal} onPostCreated={handlePostCreated} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isCreateModalVisible}
                onRequestClose={toggleCreatePostModal}>
                <View style={styles.modalView}>
                    <CreatePost onPostCreated={handlePostCreated} onCancel={toggleCreatePostModal} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: 'white', // Ensures the modal background is opaque
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});

export default ForumScreen;