import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import termsData from '../../common/terms.json';

const { AuthModule, FirestoreModule } = NativeModules;

const HomeScreen: React.FC = () => {
    const [wordOfTheDay, setWordOfTheDay] = useState(null);
    const navigation = useNavigation();

    const [greeting, setGreeting] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = await AuthModule.getCurrentUserUID();
            const profileData = await FirestoreModule.getUserProfile(userId);
            setName(profileData.name);

            const hours = new Date().getHours();
            let timeGreeting;

            if (hours < 12) {
                timeGreeting = 'Good morning';
            } else if (hours < 18) {
                timeGreeting = 'Good afternoon';
            } else {
                timeGreeting = 'Good evening';
            }

            setGreeting(`${timeGreeting}, ${profileData.name}`);
        }

        fetchUserProfile();

        const randomIndex = Math.floor(Math.random() * termsData.terms.length);
        setWordOfTheDay(termsData.terms[randomIndex]);
    }, []);

    const handleWordPress = () => {
        navigation.navigate('Dictionary', { term: wordOfTheDay.term });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.greetingText}>{greeting}</Text>
            {wordOfTheDay && (
                <TouchableOpacity onPress={handleWordPress} style={styles.wordContainer}>
                    <View style={styles.titleContainer}>
                        <Text>Word of the Day</Text>
                        <Text style={styles.word}>{wordOfTheDay.term}</Text>
                    </View>
                    <Text style={styles.definition}>Definition: {wordOfTheDay.definition}</Text>
                    <Text style={styles.example}>Example: {wordOfTheDay.example}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    wordContainer: {
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10
    },
    titleContainer: {
        alignItems: 'center'
    },
    word: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    definition: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    example: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50
    }
})

export default HomeScreen;