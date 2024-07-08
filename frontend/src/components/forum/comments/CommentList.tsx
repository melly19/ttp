import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';

const CommentList = ({ comments }) => {
    const renderItem = ({ item }) => (
        <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{item.text || 'No text'}</Text>
            <Text style={styles.authorText}>- {item.name || 'Anonymous'}</Text>
        </View>
    );

    return (
        <FlatList
            data={comments}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    commentText: {
        fontSize: 16,
    },
    authorText: {
        fontSize: 14,
        color: 'grey',
        marginTop: 5,
    },
});

export default CommentList;