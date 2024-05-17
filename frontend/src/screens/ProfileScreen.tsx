import React from 'react';
import ScreenTemplate from './ScreenTemplate';

const ProfileScreen: React.FC = () => {
    const handlePress = () => {
        console.log('Button Pressed in Profile Screen');
    };

    return (
        <ScreenTemplate title="Profile Screen" onButtonPress={handlePress} />
    );
};

export default ProfileScreen;