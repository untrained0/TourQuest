import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import Profile from '../Screens/ProfileScreen';
import CreateProfileScreen from '../Screens/CreateProfileScreen';
// import SignUpScreen from '../Screens/SignUpScreen';
import TabNavigation from './TabNavigation';
// import CameraOf from '../Components/HomeScreen/Camera';
import PopupFile from '../Screens/PopUpFile';
import HomeScreen from '../Screens/HomeScreen';
import PopupExample from '../Screens/OnBoardingScreen';
import SignUpScreen from '../Screens/SignUpScreen';
// import Recorder from '../Components/AddPost/Recorder';

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

export default function DemoNavigation() {
    return (
        <Stack.Navigator screenOptions = {screenOptions}>
            {/* <Stack.Screen name="CreateProfile" component={CreateProfileScreen} /> */}
            {/* <Stack.Screen name="signin" component={SignUpScreen} /> */}
            {/* <Stack.Screen name="Popups" component={PopupExample} /> */}
            <Stack.Screen name="HomePage" component={HomeScreen} />
            <Stack.Screen name="Tour" component={PopupFile} />
            {/* <Stack.Screen name="CaptionDetail" component={CaptionDetail} /> */}
        </Stack.Navigator>
    )

}

