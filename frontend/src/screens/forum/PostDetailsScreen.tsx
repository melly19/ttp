import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Alert, NativeModules, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommentList from '../../components/forum/comments/CommentList';
import CommentInput from '../../components/forum/comments/CommentInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Touchable } from '../../../node_modules/react-native/types/index';

const { FirestoreModule } = NativeModules;

const PostDetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { postId, postTitle, postBody, name, postVotes: initialPostVotes, commentsNumber } = route.params;
    const [comments, setComments] = useState([]);
    const [postVotes, setPostVotes] = useState(initialPostVotes);
    const [hasUpvoted, setHasUpvoted] = useState(false);

    const fetchComments = () => {
        FirestoreModule.fetchComments(postId)
            .then(fetchedComments => {
                setComments(fetchedComments);
            })
            .catch(error => {
                Alert.alert("Failed to fetch comments: ", error.message);
            });
    }

    const handleVote = (postId) => {
        if (!hasUpvoted) {
            FirestoreModule.incrementPostVote(postId)
            .then(() => {
                setPostVotes(prevVotes => prevVotes + 1);
                setHasUpvoted(true);
            })
            .catch(error => {
                Alert.alert("Failed to increment vote: ", error.message);
                console.log(error);
            });
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Post details</Text>
            </View>
            <View style={styles.postContainer}>
                <Text style={styles.title}>{postTitle}</Text>
                <Text style={styles.body}>{postBody}</Text>
                <Text style={styles.info}>Votes: {postVotes}</Text>
                <TouchableOpacity 
                    onPress={() => handleVote(postId)} 
                    style={[styles.voteButton, hasUpvoted && styles.voteButtonUpvoted]}>
                    <Ionicons 
                        name="arrow-up-outline" 
                        size={24} 
                        color={hasUpvoted ? "white" : "green"}
                    />
                </TouchableOpacity>
                <Text style={styles.info}>Posted by: {name}</Text>
            </View>
            <Text style={styles.commentsHeader}>Comments</Text>
            <CommentList comments={comments} />
            <CommentInput postId={postId} onCommentPosted={fetchComments}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0'
    },
    postContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        position: 'relative'
    },
    voteButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    voteButtonUpvoted: {
        backgroundColor: 'green'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    body: {
        fontSize: 16,
        marginBottom: 20
    },
    commentsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    backButton: {
        position: 'absolute',
        left: 0
    },
    headerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },
    headerTitle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        fontSize: 20
    }
});

export default PostDetailsScreen;