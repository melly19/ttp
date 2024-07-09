import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList, Button, Modal, NativeModules, TouchableOpacity } from 'react-native';
import CreatePost from '../../components/forum/posts/CreatePost';
import PostList from '../../components/forum/posts/PostList';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { FirestoreModule } = NativeModules;

const ForumScreen: React.FC = () => {
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);

    const toggleCreatePostModal = () => {
        setCreateModalVisible(!isCreateModalVisible);
    }

    const fetchPosts = async () => {
        try {
            const fetchedPosts = await FirestoreModule.fetchPosts();
            setPosts(fetchedPosts);
        } catch (error) {
            Alert.alert("Failed to fetch posts", error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    })

    const handlePostCreated = async (newPost) => {
        await fetchPosts();
        toggleCreatePostModal();
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Current Posts</Text>
            </View>
            <PostList posts={posts} />
            <TouchableOpacity style={styles.addButton} onPress={toggleCreatePostModal}>
                <Ionicons name="add-outline" size={24} color='#fff' />
            </TouchableOpacity>
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
    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        color: '#ee778a'
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ee778a',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
        marginBottom: 140,
        backgroundColor: '#faf3e3',
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