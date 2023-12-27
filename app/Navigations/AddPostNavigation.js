import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddPostScreen from '../Screens/AddPostScreen';
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
            <Stack.Screen name="AddPost" component={AddPostScreen} />
            <Stack.Screen name="Recorder" component={Recorder} />
            {/* <Stack.Screen name="CaptionDetail" component={CaptionDetail} /> */}
        </Stack.Navigator>
    )

}

