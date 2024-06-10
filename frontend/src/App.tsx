import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Alert, NativeModules, ActivityIndicator, View } from 'react-native';
import Navbar from './components/Navbar';
import AuthToggleScreen from './screens/auth/AuthToggleScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileSetupScreen from './screens/profile/ProfileSetupScreen';
import { initializeApp } from 'firebase/app';

const { FirestoreModule } = NativeModules;
const { AuthModule } = NativeModules;

const Stack = createNativeStackNavigator();

const firebaseConfig = {

};

const App: React.FC = ({ navigation }) => {
  initializeApp(firebaseConfig);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // useEffect(() => {
  //   AuthModule.getCurrentUser().then(uid => {
  //     if (uid) {
  //       checkUserProfile(uid);
  //     } else {
  //       setUser(null);
  //       setInitializing(false);
  //     }
  //   })
  // }, []);

  // const checkUserProfile = (uid) => {
  //   FirestoreModule.getUserProfile(uid, (error, profileData) => {
  //     if (error) {
  //       console.error("Failed to fetch profile:", error);
  //       Alert.alert("Error", "Unable to fetch user details.");
  //     } else if (profileData) {
  //       setUser({ uid, profileCompleted: true })
  //       navigation.navigate('MainApp');
  //     } else {
  //       setUser({ uid, profileCompleted: false })
  //       navigation.navigate('ProfileSetup');
  //     }
  //   });
  // };

  // if (initializing) {
  //   return <View style={{ flex: 1, justifyContent: 'center' }}>
  //     <ActivityIndicator />
  //   </View>
  // };

  // if (!user) {
  //   navigation.navigate('AuthToggle');
  // }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* {user ? (
            user.profileCompleted ? ( */}
              <Stack.Screen name="MainApp" component={Navbar} options={{ headerShown: false }} />
            {/* ) : ( */}
              <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ headerShown: false }}/>
            {/* )
          ) : ( */}
            <Stack.Screen name="AuthToggle" component={AuthToggleScreen} options={{ headerShown: false }} />
          {/* )} */}
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