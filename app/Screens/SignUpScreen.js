import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, AspectRatio, ScrollView, Center } from 'native-base';
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
    <NativeBaseProvider config={{}} >
      <ScrollView style={styles.scrollView} >
        <Image source={require('./../../assets/images/login_react.png')} />
        
          {/* <Text style={{ textAlign: 'center', marginTop: 80, fontSize: 20 }}>Login/Signup</Text> */}
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={require('./../../assets/images/google_logo.png')} style={{ width: 30, height: 30, marginRight: 15 }} />
            <Text style={{ color: Colors.PRIMARY, fontSize:15 }}>Sign In with Google</Text>
          </TouchableOpacity>
          <View style={styles.inputField}>
            <TextInput placeholder='Username' style={styles.input} />
          </View>
          <View style={styles.inputField}>
            <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} />  
          </View>
          <Text style={styles.text}>Forget Password</Text>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={{ color: Colors.WHITE }}>Sign Up</Text>
          </TouchableOpacity>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  button: {
    backgroundColor: Colors.bgColor,
    padding: 10,
    margin: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 300,
  },
  inputField: {
    backgroundColor: Colors.LIGHTGRAY,
    height: 50,
    width: 300,
    margin: 20,
    borderRadius: 10,
    
  },
  input: {
    flex: 1,
    // padding: 100
    paddingLeft: 20
  },
  text: {
    // paddingLeft: 150,
    color: Colors.BLUE,
    textAlign: 'center'  
  },
  signUpButton: {
    marginTop: 20, 
    padding: 10,
    alignItems: 'center',
    // color: Colors.WHITE,
    backgroundColor: Colors.BLUE,
    height: 50,
    width: 300,
    margin: 20,
    borderRadius: 10,
    paddingTop: 15,
  },
});
