import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Speech from "expo-speech";
import { Camera } from "expo-camera";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import Svg, { Circle } from "react-native-svg";

const texts = [
  "Lets enter the lab number 309",
  "On left you can see the stair cases leading to second floor",
  "You have reached 308 lab",
  "You have reached 307 lab",
  "You can see language lab towards the left",
  "You can see lab number 306",
  "This is HOD room",
];

const PopupFile = () => {
  const [displayTextIndex, setDisplayTextIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(10); // Initial time for each text
  const [isSkipping, setIsSkipping] = useState(false);
  const [nextText, setNextText] = useState(texts[1]); // Initial next text

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0 && !isSkipping) {
          return prevTime - 1;
        } else {
          setIsSkipping(false);
          setDisplayTextIndex((prevIndex) => {
            if (prevIndex === texts.length - 1) {
              return 0; // Restart text sequence
            } else {
              return prevIndex + 1; // Move to the next text
            }
          });
          return 10; // Reset remaining time for the next text
        }
      });
    }, 1500); // Update every second

    return () => clearInterval(interval); // Clean up the interval
  }, [displayTextIndex, isSkipping]);

  useEffect(() => {
    setNextText(texts[(displayTextIndex + 1) % texts.length]); // Update next text
  }, [displayTextIndex]);

  const handleSkip = () => {
    setIsSkipping(true);
  };

  const handleSpeak = () => {
    Speech.speak(texts[displayTextIndex], { language: "en" });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} />
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Animatable.Text animation="fadeIn" style={styles.text}>
            {texts[displayTextIndex]}
          </Animatable.Text>
          <View style={styles.remainingTimeContainer}>
            <Svg height="50" width="50">
              <Circle
                cx="25"
                cy="25"
                r="20"
                stroke={remainingTime < 9 ? "red" : "green"}
                strokeWidth="3"
                fill="transparent"
              />
            </Svg>
            <Icon
              raised
              name="skip-next"
              type="materialicons"
              color="#f50"
              onPress={handleSkip}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Icon
              raised
              name="volume-up"
              type="materialicons"
              color="#f50"
              onPress={handleSpeak}
            />
          </View>
        </View>
        <Animatable.View animation="fadeInUp" style={styles.nextTextContainer}>
          <Text style={styles.nextText}>{`Next: ${nextText}`}</Text>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  popupContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  remainingTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nextTextContainer: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  nextText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PopupFile;
