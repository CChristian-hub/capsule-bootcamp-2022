import React from 'react';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { Ionicons } from '@expo/vector-icons';

import GalleryScreen from './screens/GalleryScreen';
import SnapScreen from './screens/SnapScreen';
import HomeScreen from './screens/HomeScreen';
import VideoScreen from './screens/VideoScreen';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import photos from './reducers/photos';
import videos from './reducers/videos';


const store = createStore(combineReducers({ photos, videos }));



function tabNav() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Gallery') {
          iconName = 'ios-images'
        } else if (route.name === 'Snap') {
          iconName = 'ios-camera'
        } else if (route.name === 'Videos') {
          iconName = 'ios-videocam'
        }
        return <Ionicons name={iconName} size={25} color={color} />;
      },
    })}

      tabBarOptions={{
        activeTintColor: '#009788',
        inactiveTintColor: '#FFFFFF',
        style: {
          backgroundColor: '#111224'
        }
      }}>
      <Tab.Screen name="Snap" component={SnapScreen} />
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Videos" component={VideoScreen} />

    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='tabNav' component={tabNav} />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
}
