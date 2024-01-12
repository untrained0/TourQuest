import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/ProfileScreen';
import EditProfile from '../Components/ProfileScreen.js/EditProfile';

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

export default function HomeScreenNavigation() {
    return (
        <Stack.Navigator screenOptions = {screenOptions}>
            <Stack.Screen name="ProfileScreen" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            {/* <Stack.Screen name="CaptionDetail" component={CaptionDetail} /> */}
        </Stack.Navigator>
    )

}

