import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF3E3'
  }
});

export default App;