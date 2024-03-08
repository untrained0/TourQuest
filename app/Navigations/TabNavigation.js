import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SignUpScreen from '../Screens/SignUpScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AddPostNavigation from './../Navigations/AddPostNavigation';
import ProfileScreenNavigation from './../Navigations/ProfileScreenNavigation';
import HomeScreen from '../Screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnBoardingScreen from '../Screens/OnBoardingScreen';
import DemoNavigation from './DemoNavigation';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}


export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={DemoNavigation}
      // <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Add" component={AddPostNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircle" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreenNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          )
        }} />
      {/* <Tab.Screen name="OnBoarding" component={OnBoardingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      /> */}

    </Tab.Navigator>
  )
}
