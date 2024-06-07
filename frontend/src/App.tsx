import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Alert, NativeModules } from 'react-native';
import Navbar from './components/Navbar';
import AuthToggleScreen from './screens/auth/AuthToggleScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileSetupScreen from './screens/profile/ProfileSetupScreen';
import { initializeApp } from 'firebase/app';
import auth from '@react-native-firebase/auth';

const { FirestoreModule } = NativeModules;

const Stack = createNativeStackNavigator();

const firebaseConfig = {

};

const App: React.FC = ({ navigation }) => {
  initializeApp(firebaseConfig);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      checkUserProfile(user.uid);
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const checkUserProfile = (uid) => {
    FirestoreModule.getUserProfile(uid, (error, profileData) => {
      if (error) {
        console.error("Failed to fetch profile:", error);
        Alert.alert("Error", "Unable to fetch user details.");
      } else if (profileData) {
        navigation.navigate('MainApp');
      } else {
        navigation.navigate('ProfileSetup');
      }
    });
  };

  if (initializing) return null;

  if (!user) {
    navigation.navigate('AuthToggle');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthToggle">
          <Stack.Screen name="AuthToggle" component={AuthToggleScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainApp" component={Navbar} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ headerShown: false }} />
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