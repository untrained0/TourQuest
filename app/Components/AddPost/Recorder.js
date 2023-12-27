import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Recorder() {
  const navigation = useNavigation();
  const cameraRef = useRef(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [values, setValues] = useState({
    hasPermission: [],
    isFlashLightOn: Camera.Constants.FlashMode.off,
    videoStatus: 0,
    isRecordingPaused: false,
  });

  const { hasPermission, isFlashLightOn, videoStatus, isRecordingPaused } = values;

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const AudioStatus = await Audio.requestPermissionsAsync();
    setValues({ ...values, hasPermission: [status, AudioStatus.status] });
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (!hasPermission) {
    Alert.alert(
      'Camera Permission Required',
      'Please grant camera permission to use this feature.',
      [{ text: 'OK' }]
    );
    return null;
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const videoRecord = async () => {
    if (!videoStatus && cameraRef.current) {
      setValues({
        ...values,
        videoStatus: 1,
        isFlashLightOn: isFlashLightOn ? Camera.Constants.FlashMode.torch : isFlashLightOn,
      });

      await cameraRef.current
        .recordAsync()
        .then((data) => {
          // console.log(data);
          navigation.navigate('AddPost', { video: data.uri });
        })
        .catch((e) => console.log(e));
    } else {
      try {
        if (isRecordingPaused) {
          // Resume recording
          await cameraRef.current.resumePreview();
        } else {
          // Stop recording
          await cameraRef.current.stopRecording();
        }

        setValues({
          ...values,
          videoStatus: 0,
          isFlashLightOn: Camera.Constants.FlashMode.off,
          isRecordingPaused: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleRecordingPause = async () => {
    if (videoStatus && cameraRef.current) {
      if (isRecordingPaused) {
        // Resume recording
        await cameraRef.current.resumePreview();
      } else {
        // Pause recording
        await cameraRef.current.pausePreview();
      }

      setValues({
        ...values,
        isRecordingPaused: !isRecordingPaused,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} flashMode={isFlashLightOn} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (!videoStatus) {
                setValues({
                  ...values,
                  isFlashLightOn: isFlashLightOn
                    ? Camera.Constants.FlashMode.off
                    : Camera.Constants.FlashMode.on,
                });
              }
            }}
          >
            <MaterialCommunityIcons
              name={isFlashLightOn ? 'flashlight' : 'flashlight-off'}
              size={24}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={videoRecord}>
            <MaterialCommunityIcons
              name={videoStatus ? 'stop' : 'record'}
              size={24}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <MaterialCommunityIcons name="camera-front" size={24} color="black" />
          </TouchableOpacity>

          {/* {videoStatus && (
            <TouchableOpacity style={styles.button} onPress={toggleRecordingPause}>
              <MaterialCommunityIcons
                name={isRecordingPaused ? 'play' : 'pause'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          )} */}
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
});
