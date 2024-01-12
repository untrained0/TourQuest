import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";
// import OnBoardingScreen from './app/Screens/OnBoardingScreen';


import SignUpScreen from './app/Screens/SignUpScreen';
import TabNavigation from './app/Navigations/TabNavigation';
// import NewUserNavigation from './app/Navigations/NewUserNavigation';
import { NativeBaseProvider } from 'native-base';
import { UserDetailContext } from './app/Contexts/UserDetailContext';
import { useState } from 'react';
import NewUserNavigation from './app/Navigations/NewUserNavigation';

// const CLERK_PUBLISHABLE_KEY= "pk_test_Y2F1c2FsLWdpcmFmZmUtNDguY2xlcmsuYWNjb3VudHMuZGV2JA";
const CLERK_PUBLISHABLE_KEY = "pk_test_bG92aW5nLW95c3Rlci05NC5jbGVyay5hY2NvdW50cy5kZXYk";


const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};



export default function App() {

  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    username: '',
    bio: '',
    image: null,
    points: 0
});

  const [fontsLoaded] = useFonts({
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-light': require('./assets/fonts/Outfit-Light.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
  });

  if (!fontsLoaded) {
    // Add a loading indicator or return null
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY} >
      <NativeBaseProvider>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }} >
          <View style={styles.container}>
            <SignedIn>
              <NavigationContainer>
                {/* <TabNavigation /> */}
                <NewUserNavigation />
              </NavigationContainer>
              {/* <OnBoardingScreen /> */}
            </SignedIn>

            <SignedOut>
              <SignUpScreen />
              {/* <NavigationContainer>
            <NewUserNavigation />
          </NavigationContainer> */}
            </SignedOut>
          </View>
        </UserDetailContext.Provider>
      </NativeBaseProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 35
  }
})