import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (text: string) => void;
}

const Searchbar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [inputText, setInputText] = useState('');

    const handleSearchPress = () => {
        onSearch(inputText); // Passes the current input text back to the parent component
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for terms..."
                value={inputText}
                onChangeText={setInputText}
                autoCorrect={false} // Disabling autocorrect
                clearButtonMode="while-editing"
            />
            <TouchableOpacity onPress={handleSearchPress} style={styles.search}>
                <Ionicons name={'search-outline'} size={20} color={'#6e6e6e'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray'
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        paddingHorizontal: 10
    },
    search: {
        position: 'absolute',
        right: 10
    }
});

export default Searchbar;