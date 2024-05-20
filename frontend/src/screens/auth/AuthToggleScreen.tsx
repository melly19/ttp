import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const AuthToggleScreen: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return (
        <View style={styles.container}>
            <SegmentedControl
                values={['Login', 'Signup']}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                style={styles.segmentedControl}
            />
            {selectedIndex === 0 ? <LoginScreen /> : <SignupScreen />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    },
    segmentedControl: {
        margin: 10
    }
});

export default AuthToggleScreen;