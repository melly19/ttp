import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';

interface ScreenTemplateProps {
    title: string;
    onButtonPress: () => void;
}

const ScreenTemplate: React.FC<ScreenTemplateProps> = ({ title, onButtonPress }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Button title="Click Me" onPress={onButtonPress} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'InriaSans-Regular'
    }
});

export default ScreenTemplate;