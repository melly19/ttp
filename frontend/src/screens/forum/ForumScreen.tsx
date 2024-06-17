import React from 'react';
import ScreenTemplate from '../ScreenTemplate';

const ForumScreen: React.FC = () => {
    const handlePress = () => {
        console.log('Button Pressed in Forum Screen');
    };

    return (
        <ScreenTemplate title="Forum Screen" onButtonPress={handlePress} />
    );
};

export default ForumScreen;