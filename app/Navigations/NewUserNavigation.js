import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import Profile from '../Screens/ProfileScreen';
import CreateProfileScreen from './../Screens/CreateProfileScreen';
// import SignUpScreen from '../Screens/SignUpScreen';
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator();

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

export default function NewUserNavigation() {
    return (
        <Stack.Navigator screenOptions = {screenOptions}>
            <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
            <Stack.Screen name="HomePage" component={TabNavigation} />
            {/* <Stack.Screen name="CaptionDetail" component={CaptionDetail} /> */}
        </Stack.Navigator>
    )

}

