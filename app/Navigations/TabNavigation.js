import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import SignUpScreen from '../Screens/SignUpScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AddPostNavigation from './../Navigations/AddPostNavigation';
import HomeScreen from '../Screens/HomeScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const screenOptions = {
  // tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
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
    <Tab.Navigator >
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home" size={size} color={color} />
        )
      }}
      />
      <Tab.Screen name="Add" component={AddPostNavigation} 
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home" size={size} color={color} />
        )
      }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Signin" component={SignUpScreen} 
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home" size={size} color={color} />
        )
      }}
      />

    </Tab.Navigator>
  )
}
