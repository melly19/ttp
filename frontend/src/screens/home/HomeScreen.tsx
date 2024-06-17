import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import termsData from '../../common/terms.json';

const HomeScreen: React.FC = () => {
    const [wordOfTheDay, setWordOfTheDay] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * termsData.terms.length);
        setWordOfTheDay(termsData.terms[randomIndex]);
    }, []);

    const handleWordPress = () => {
        navigation.navigate('Dictionary', { term: wordOfTheDay.term });
    };

    return (
        <View style={styles.container}>
            {wordOfTheDay && (
                <TouchableOpacity onPress={handleWordPress} style={styles.wordContainer}>
                    <Text>Word of the Day</Text>
                    <Text style={styles.word}>{wordOfTheDay.term}</Text>
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
        borderRadius: 10,
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
        flexShrink: 1,
        flexWrap: 'wrap'
    },
    example: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
        flexShrink: 1,
        flexWrap: 'wrap'
    }
})

export default HomeScreen;