import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, AspectRatio, ScrollView } from 'native-base';
import * as WebBrowser from "expo-web-browser";
import Colors from './../Utils/Colors'
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../../hooks/warmUpBrowser";


WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  return (
    <NativeBaseProvider config={{}}>
      <ScrollView>
        <Image source={require('./../../assets/images/login_react.png')} />
        
          {/* <Text style={{ textAlign: 'center', marginTop: 80, fontSize: 20 }}>Login/Signup</Text> */}
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={require('./../../assets/images/google_logo.png')} style={{ width: 30, height: 30, marginRight: 15 }} />
            <Text style={{ color: Colors.PRIMARY, fontSize:15 }}>Sign In with Google</Text>
          </TouchableOpacity>

      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    margin: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
