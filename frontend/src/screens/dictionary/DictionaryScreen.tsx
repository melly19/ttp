import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import termsData from '../../common/terms.json';

const DictionaryScreen = () => {

    interface Term {
        term: string;
        definition: string;
    }

    const [terms, setTerms] = useState<Term[]>([]);

    useEffect(() => {
        setTerms(termsData.terms);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={terms}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.term}>{item.term}</Text>
                        <Text style={styles.term}>{item.definition}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
    term: {
        fontWeight: 'bold'
    },
    definition: {
        color: 'gray'
    }
});

export default DictionaryScreen;