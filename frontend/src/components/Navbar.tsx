import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DictionaryScreen from '../screens/DictionaryScreen';
import ForumScreen from '../screens/ForumScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Creating a new bottom tab navigator instance
const Tab = createBottomTabNavigator();

// Navbar component using function component syntax with TypeScript
const Navbar: React.FC = () => {
    return (

        // Tab.Navigator component to hold the navigation configuration
        <Tab.Navigator
            // screenOptions receives a function with route and navigation props
            // and returns configuration options for each screen
            screenOptions={({ route }) => ({

                // Defining the icon for each tab depending on its focus state
                tabBarIcon: ({ focused, color, size }) => {

                    // Variable to store the icon name based on the route and focus state
                    let iconName: string;

                    // Variable to change the colour when focused
                    let iconColor: string = focused ? '#222222' : color;

                    // Conditionally setting iconName (based on Ionicons library) by the route name and if it's focused
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Dictionary') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Forum') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // Returning the Ionicons components with the iconName, size and color
                    return <Ionicons name={iconName} size={size} color={iconColor} />
                },

                // Hiding the labels of the navigation bar
                tabBarShowLabel: false,

                // Style for the tab bar, setting background color
                tabBarStyle: { backgroundColor: '#FAF3E3' }
            })}
        >
            {/* Tab.Screen components define each page of the app accessible via the tab bar */}
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Dictionary" component={DictionaryScreen} />
            <Tab.Screen name="Forum" component={ForumScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

// Export the Navbar component for use in other parts of the app
export default Navbar;