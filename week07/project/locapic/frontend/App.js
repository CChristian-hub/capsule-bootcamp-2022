//* Ignore warnings
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']);
// import { YellowBox } from "react-native";
// YellowBox.ignoreWarnings([""]);

import React from 'react';

//* Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//* Icons
import { Ionicons } from '@expo/vector-icons';

//* Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

//* Reducer
import username from './reducers/username';
import markers from './reducers/markers'

//* Pages
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen';
import MapScreen from './screens/MapScreen';
import MarkerScreen from './screens/MarkerList'

const store = createStore(combineReducers({ username, markers }));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabNav = () => {
  return (
    <Tab.Navigator screenOptions={
      ({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Map') {
            iconName = 'navigate';
          }
          if (route.name === 'Chat') {
            iconName = 'chatbubbles';
          }
          if (route.name === 'Markers') {
            iconName = 'list';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })
    }
      tabBarOptions={{
        activeTintColor: '#eb4d4b',
        inactiveTintColor: '#FFFFFF',
        style: {
          backgroundColor: '#130f40'
        }
      }}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Markers" component={MarkerScreen} />

    </Tab.Navigator >
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="tabNav" component={tabNav} />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
}