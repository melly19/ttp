import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList, Button, Modal } from 'react-native';
import CreatePost from '../../components/forum/CreatePost';
import PostItem from '../../components/forum/PostItem'; 
import PostList from '../../components/forum/PostList';

const ForumScreen: React.FC = () => {
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        // Implementation of a function that fetches posts and sets them
    }

    const toggleCreatePostModal = () => {
        setCreateModalVisible(!isCreateModalVisible);
    }

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
        toggleCreatePostModal();
    }

    return (
        <View style={styles.container}>
            <Button title="Create Post" onPress={toggleCreatePostModal} />
            <Text style={styles.header}>Current Posts</Text>
            <PostList />
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
        backgroundColor: '#f0f0f0'  // Added to ensure content behind the modal is less distracting
    },
    header: {
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