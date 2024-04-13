import { Component } from "react";
import {
  AppRegistry,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container component
} from "react-native";


import Swiper from "./Swiper";

export default class Screen extends Component {
  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide}>
          <Text style={styles.header}>Home Page</Text>
          <Text style={styles.text}>1. In the home screen indicated by house you can view/comment/like the existing posts and vlog which are shown based on your interests</Text>
          <Text style={styles.text}>2. In the record page indicated by Plus sign you can record and click photos of your journey to post it on our app</Text>
          <Text style={styles.text}>3. In the profile page indidcated by persons avtar you can edit name, bio, username of your existing profile</Text>
        </View>
        {/* Second screen */}
        <View style={styles.slide}>
          <Text style={styles.header}>Comment Page</Text>
          <Text style={styles.text}>1. Press the follow button to follow the user and get their post at the top of your feed</Text>
          <Text style={styles.text}>2. You can like the posts/vlog by clicking the heart below the post</Text>
          <Text style={styles.text}>3. You can comment on the the posts/vlog by clicking the speach balloon below the post</Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide}>
          <Text style={styles.header}>Record Page</Text>
          <Text style={styles.text}>1.. Press the torch button to start the flashlight of your device</Text>
          <Text style={styles.text}>2.. Press the record/dot button to start the recording</Text>
          <Text style={styles.text}>3. Press the photo button to switch to the front camera of your device</Text>
          <Text style={styles.text}>4. Press the camera button to click a picture</Text>
        </View>
        {/* Fourth screen */}
        <View style={styles.slide}>
          <Text style={styles.header}>Profile Page</Text>
          <Text style={styles.text}>1. Press the plus sign to add a profile picture</Text>
          <Text style={styles.text}>2. Enter your name in the name column to change your existing name on the app</Text>
          <Text style={styles.text}>3. Enter your username in the username column to change your existing username on the app</Text>
          <Text style={styles.text}>4. Enter your bio in the bio column to change your existing bio on the app</Text>
        </View>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 100,
  color: "#FFFFFF"
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#16a085"
  },
  // Header styles
  header: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center"
  }
});
AppRegistry.registerComponent("Screen", () => Screen);
