import React from 'react';
import ScreenTemplate from './ScreenTemplate';

const DictionaryScreen: React.FC = () => {
    const handlePress = () => {
        console.log('Button Pressed in Dictionary Screen');
    };

    return (
        <ScreenTemplate title="Dictionary Screen" onButtonPress={handlePress} />
    );
};

export default DictionaryScreen;