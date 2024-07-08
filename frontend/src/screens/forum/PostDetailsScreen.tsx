import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, Alert, NativeModules, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommentList from '../../components/forum/comments/CommentList';
import CommentInput from '../../components/forum/comments/CommentInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { FirestoreModule } = NativeModules;

const PostDetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { postId, postTitle, postBody, name, postVotes: initialPostVotes, commentsNumber } = route.params;
    const [comments, setComments] = useState([]);
    const [postVotes, setPostVotes] = useState(initialPostVotes);

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
        FirestoreModule.incrementPostVote(postId)
            .then(() => {
                setPostVotes(postVotes + 1);
            })
            .catch(error => Alert.alert("Failed to increment vote: ", error.message));
    };

    useEffect(() => {
        fetchComments();

        console.log(postTitle);
    }, [postId]);

    return (
        <View style={styles.container}>
            <Button title="Back to forum" onPress={() => navigation.goBack()} />
            <Text style={styles.title}>{postTitle}</Text>
            <Text style={styles.body}>{postBody}</Text>
            <Text style={styles.info}>Votes: {postVotes}</Text>
            <TouchableOpacity onPress={handleVote}>
                <Ionicons name="arrow-up-outline" size={24} color="green" />
            </TouchableOpacity>
            <Text style={styles.info}>Posted by: {name}</Text>
            <Text style={styles.commentsHeader}>Comments</Text>
            <CommentList comments={comments} />
            <CommentInput postId={postId} onCommentPosted={fetchComments}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
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
        marginTop: 20,
        marginBottom: 10
    }
});

export default PostDetailsScreen;