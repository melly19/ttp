import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForumScreen from '../../screens/forum/ForumScreen';
import PostDetailsScreen from '../../screens/forum/PostDetailsScreen';

const ForumStack = createStackNavigator();

const ForumNavigator = () => {
    return (
        <ForumStack.Navigator>
            <ForumStack.Screen name="Forum" component={ForumScreen} options={{ headerShown: false }} />
            <ForumStack.Screen name="PostDetails" component={PostDetailsScreen} options={{ headerShown: false }} />
        </ForumStack.Navigator>
    );
}

export default ForumNavigator;