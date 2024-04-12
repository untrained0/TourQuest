import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import {
  Input,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  AspectRatio,
  ScrollView,
  Center,
} from "native-base";
import * as WebBrowser from "expo-web-browser";
import Colors from "./../Utils/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../../hooks/warmUpBrowser";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";


WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigation = useNavigation();

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

  const onSignUp = () => {
    if (email === "" || password === "") {
      Alert.alert(
        "Invalid Details",
        "Please enter all the credentials",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          // const user = userCredentials._tokenResponse.email;
          // const uid = auth.currentUser.uid;

          // setDoc(doc(db, "users", `${uid}`), {
          //   email: user,
          //   phone: phone,
          // });

          console.log("successfully signed up");
          // navigation.navigate("Popups");
        }
      );
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.scrollView}>
        <Image source={require("./../../assets/images/login_react.png")} />

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Image
            source={require("./../../assets/images/google_logo.png")}
            style={{ width: 30, height: 30, marginRight: 15 }}
          />
          <Text style={{ color: Colors.PRIMARY, fontSize: 15 }}>
            Sign In with Google
          </Text>
        </TouchableOpacity>

        <View style={styles.inputField}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputField}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <Text style={styles.text}>Forget Password</Text>

        <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
          <Text style={{ color: Colors.WHITE }}>Sign Up</Text>
        </TouchableOpacity>
        <QRCode value="https://www.github.com/untrained0" />
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    paddingLeft: 20,
  },
  text: {
    // paddingLeft: 150,
    color: Colors.BLUE,
    textAlign: "center",
  },
  signUpButton: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    // color: Colors.WHITE,
    backgroundColor: Colors.BLUE,
    height: 50,
    width: 300,
    margin: 20,
    borderRadius: 10,
    paddingTop: 15,
  },
});
