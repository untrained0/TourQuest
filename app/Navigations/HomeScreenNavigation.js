import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/ProfileScreen';
import EditProfile from '../Components/ProfileScreen.js/EditProfile';
import HomeScreen from '../Components/HomeScreen';
import Recorder from '../Components/AddPost/Recorder';

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
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Recorder" component={Recorder} />
            {/* <Stack.Screen name="CaptionDetail" component={CaptionDetail} /> */}
        </Stack.Navigator>
    )

}
''
