import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";
import { Camera } from "expo-camera";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import Svg, { Circle } from "react-native-svg";

const texts = [
  "Lets enter the lab number 309",
  "On left you can see the staircase leading to second floor",
  "You can see lab number 308 on your left",
  "You are near lab number 307"
];

const PopupFile = () => {
  const [displayTextIndex, setDisplayTextIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(10); // Initial time for each text
  const [isSkipping, setIsSkipping] = useState(false);
  const [nextText, setNextText] = useState(texts[1]); // Initial next text
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

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
          setRemainingTime(10); // Reset remaining time for the next text
          setIsPopupVisible(false); // Hide the popup after 10 seconds
          setIsNavigationVisible(true); // Show navigation indicator
          return 10;
        }
      });
    }, 1000); // Update every second

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

  const handlePreviewClick = () => {
    setDisplayTextIndex((prevIndex) => {
      if (prevIndex === texts.length - 1) {
        return 0; // Restart text sequence
      } else {
        return prevIndex + 1; // Move to the next text
      }
    });
    setNextText(texts[(displayTextIndex + 2) % texts.length]); // Update next text
    setIsPopupVisible(true);
    setIsNavigationVisible(false); // Hide navigation indicator when popup is clicked
  };
  

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} />
      <View style={styles.overlay}>
        {isPopupVisible && (
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
        )}
        {!isPopupVisible && (
          <TouchableOpacity
            style={styles.previewContainer}
            onPress={handlePreviewClick}
          >
            <Text style={styles.previewText}>{`Next: ${nextText}`}</Text>
          </TouchableOpacity>
        )}
        {isNavigationVisible && (
          <View style={styles.navigationContainer}>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.navigationText}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.navigationText}>{">"}</Text>
            </TouchableOpacity>
          </View>
        )}
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
  previewContainer: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  previewText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navigationContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a background color
    paddingVertical: 10, // Add padding to make the container taller
  },
  
  navigationText: {
    fontSize: 24,
    color: "black", // Change the color to make the arrows more visible
  },
  
});

export default PopupFile;
