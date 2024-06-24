import React, { useState, useEffect, useCallback } from 'react';
import { Linking, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import termsData from '../../common/terms.json';
import Accordion from 'react-native-collapsible/Accordion';
import Searchbar from '../../components/Searchbar';
import { useFocusEffect } from '@react-navigation/native';

const DictionaryScreen = ({ route }) => {

    interface Term {
        term: string;
        definition: string;
        example: string;
        resource: string;
    }

    const { term: wordOfTheDay } = route.params || {};
    const [terms, setTerms] = useState(termsData.terms);
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useFocusEffect(
        useCallback(() => {
            setTerms(termsData.terms);
            setSearchTerm('');
        }, [])
    );

    useEffect(() => {
        const filtered = searchTerm ? termsData.terms.filter(term =>
            term.term.toLowerCase().includes(searchTerm.toLowerCase())
        ) : termsData.terms;

        setTerms(filtered);

        // Optionally focus on the word of the day if it's part of the filtered set
        if (wordOfTheDay) {
            const index = filtered.findIndex(t => t.term === wordOfTheDay);
            if (index !== -1) {
                setActiveSections([index]);
            } else {
                setActiveSections([]);
            }
        }
    }, [searchTerm, wordOfTheDay]);

    const handleSearch = (input: string) => {
        setSearchTerm(input);
    };

    const handleSort = () => {
        const sortedTerms = [...terms].sort((a, b) => a.term.localeCompare(b.term));
        setTerms(sortedTerms);

        // Automatically resets active sections if needed
        if (wordOfTheDay) {
            const index = sortedTerms.findIndex(t => t.term === wordOfTheDay);
            if (index !== -1) {
                setActiveSections([index]);
            } else {
                setActiveSections([]);
            }
        } else {
            setActiveSections([]);
        }
    }

    const renderHeader = (section, _, isActive) => {
        return (
            <View style={[styles.header, isActive ? styles.active : styles.inactive]}>
                <Text style={styles.headerText}>{section.term}</Text>
            </View>
        );
    };

    const renderContent = (section: Term) => {
        return (
            <View style={styles.content}>
                <Text>Definition: {section.definition}</Text>
                <Text style={styles.example}>Example: {section.example}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(section.resource)}>
                    <Text style={styles.resource}>Learn More</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const updateSections = (activeSections: number[]) => {
        setActiveSections(activeSections);
    };

    return (
        <ScrollView style={styles.container}>
            <Searchbar onSearch={handleSearch}/>
            <TouchableOpacity onPress={handleSort} style={styles.sortButton}>
                <Text style={styles.sortButtonText}>Sort A-Z</Text>
            </TouchableOpacity>
            <Accordion
                sections={terms}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
                touchableComponent={TouchableOpacity}
                expandMultiple={true}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f8f8f8'
    },
    header: {
        backgroundColor: '#f7f7f7',
        padding: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        padding: 20,
        backgroundColor: '#fff'
    },
    example: {
        fontStyle: 'italic',
        marginVertical: 10
    },
    resource: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    sortButton: {
        padding: 10,
        backgroundColor: '#007bff',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 5
    },
    sortButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default DictionaryScreen;