import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, NativeModules, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostItem from './PostItem';

const PostList = ({ posts }) => {

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
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});

export default PostList;
