import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import Logo from '../../common/Logo.png';

const AuthToggleScreen: React.FC = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return (
        <View style={styles.container}>
            <SegmentedControl
                values={['Log in', 'Sign up']}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                style={styles.segmentedControl}
            />
            {selectedIndex === 0 ? <LoginScreen navigation={navigation}/> : <SignupScreen />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    segmentedControl: {
        marginBottom: 20,
        alignSelf: 'stretch',
        font: 'InriaSans-Regular'
    }
});

export default AuthToggleScreen;