import React from 'react';
import ScreenTemplate from './ScreenTemplate';

const HomeScreen: React.FC = () => {
    const handlePress = () => {
        console.log('Button Pressed in Home Screen');
    };

    return (
        <ScreenTemplate title="Home Screen" onButtonPress={handlePress} />
    );
};

export default HomeScreen;