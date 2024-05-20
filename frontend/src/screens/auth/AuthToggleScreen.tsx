import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import Logo from '../../common/Logo.png';

const AuthToggleScreen: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={Logo}
                    style={styles.logo}
                    reiszeMode='contain'
                />
            </View>
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
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 20
    },
    container: {
        flex: 1,
        padding: 20
    },
    segmentedControl: {
        marginBottom: 20,
        alignSelf: 'stretch'
    }
});

export default AuthToggleScreen;