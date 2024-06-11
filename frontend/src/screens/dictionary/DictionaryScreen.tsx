import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import termsData from '../../common/terms.json';
import Accordion from 'react-native-collapsible/Accordion';

const DictionaryScreen = () => {

    interface Term {
        term: string;
        definition: string;
    }

    const [terms, setTerms] = useState<Term[]>([]);
    const [activeSections, setActiveSections] = useState<number[]>([]);

    useEffect(() => {
        setTerms(termsData.terms);
    }, []);

    const renderHeader = (section: Term) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.term}</Text>
            </View>
        );
    };

    const renderContent = (section: Term) => {
        return (
            <View style={styles.content}>
                <Text>{section.definition}</Text>
            </View>
        );
    };

    const updateSections = (activeSections: number[]) => {
        setActiveSections(activeSections);
    };

    return (
        <View style={styles.container}>
            <Accordion
                sections={terms}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
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
    }
});

export default DictionaryScreen;