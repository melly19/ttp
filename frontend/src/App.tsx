import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navbar from './components/Navbar';
import AuthToggleScreen from './screens/auth/AuthToggleScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthToggle">
          <Stack.Screen name="AuthToggle" component={AuthToggleScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />
        </Stack.Navigator>
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