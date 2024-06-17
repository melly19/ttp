import React, { useState, useEffect } from 'react';
import { Linking, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import termsData from '../../common/terms.json';
import Accordion from 'react-native-collapsible/Accordion';
import Searchbar from '../../components/Searchbar';

const DictionaryScreen = () => {

    interface Term {
        term: string;
        definition: string;
        example: string;
        resource: string;
    }

    const [terms, setTerms] = useState<Term[]>([]);
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [filteredTerms, setFilteredTerms] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    useEffect(() => {
        setTerms(termsData.terms);
        setFilteredTerms(termsData.terms);
    }, []);

    const handleSearch = (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setFilteredTerms(terms);
        } else {
            const filtered = terms.filter(term =>
                term.term.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setFilteredTerms(filtered);
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
        <View style={styles.container}>
            <Searchbar onSearch={handleSearch}/>
            <Accordion
                sections={filteredTerms}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
                touchableComponent={TouchableOpacity}
                expandMultiple={false}
            />
        </View>
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
    }
});

export default DictionaryScreen;