import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileDetails = ({ profile }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://i2.cdn.turner.com/money/dam/assets/170210115106-pollinating-bee-340xa.jpg" }} style={styles.avatar} />
            <Text style={styles.title}>Your Profile Information</Text>
            <Text style={styles.detail}>Name: {profile.name}</Text>
            <Text style={styles.detail}>Gender: {profile.gender}</Text>
            <Text style={styles.detail}>Age group: {profile.ageGroup}</Text>
            <Text style={styles.detail}>Position: {profile.position}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 40,
        borderWidth: 4,
        borderColor: '#c74375'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#c74375'
    },
    detail: {
        marginBottom: 10,
        fontSize: 18
    }
});

export default ProfileDetails;