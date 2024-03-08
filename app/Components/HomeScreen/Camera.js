import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';


export default function CameraOf() {
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  const [type, setType] = useState(Camera.Constants.Type.back);

  const [values, setValues] = useState({
    hasPermission: [],
    isFlashLightOn: Camera.Constants.FlashMode.off,
    videoStatus: 0,
    capturedImages: [], // Array to store captured images
  });

  const { hasPermission, isFlashLightOn, videoStatus, capturedImages } = values;

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
    Alert.alert('Camera Permission Required', 'Please grant camera permission to use this feature.', [{ text: 'OK' }]);
    return null;
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
    );
  };

  const videoRecord = async () => {
    if (!videoStatus && cameraRef.current) {
      setValues({
        ...values,
        videoStatus: 1,
        isFlashLightOn: isFlashLightOn ? Camera.Constants.FlashMode.torch : isFlashLightOn,
      });
  
      try {
        const data = await cameraRef.current.recordAsync();
        setValues({
          ...values,
          videoStatus: 0,
          isFlashLightOn: Camera.Constants.FlashMode.off,
          capturedImages: [...capturedImages, { uri: data.uri }],
        });
  
        navigation.navigate('AfterPost', {
          video: data.uri,
          images: capturedImages,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await cameraRef.current.stopRecording();
        setValues({
          ...values,
          videoStatus: 0,
          isFlashLightOn: Camera.Constants.FlashMode.off,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const uniqueId = Date.now().toString();
        const location = await Location.getCurrentPositionAsync({});
        const capturedImageObject = {
          id: uniqueId,
          uri: photo.uri,
          caption: '',
          location: location?.coords,
        };
  
        setValues((prevValues) => ({
          ...prevValues,
          capturedImages: [...prevValues.capturedImages, capturedImageObject],
        }));
        console.log('Captured Images:', capturedImages);
  
        // Continue video recording after capturing the image
        if (videoStatus) {
          await cameraRef.current.recordAsync();
        }
      } catch (error) {
        console.log('Error capturing image:', error);
      }
    }
  };
  

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location?.coords);
      console.log(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }



  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} flashMode={isFlashLightOn} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (!videoStatus) {
                setValues({
                  ...values,
                  isFlashLightOn: isFlashLightOn ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on,
                });
              }
            }}
          >
            <MaterialCommunityIcons name={isFlashLightOn ? 'flashlight' : 'flashlight-off'} size={24} color="black" />
          </TouchableOpacity> */}

          {/* <TouchableOpacity style={styles.button} onPress={videoRecord}>
            <MaterialCommunityIcons name={videoStatus ? 'stop' : 'record'} size={24} color="black" />
          </TouchableOpacity> */}

          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <MaterialCommunityIcons name="camera-front" size={24} color="black" />
          </TouchableOpacity> */}

          {/* <TouchableOpacity style={styles.button} onPress={captureImage}>
            <MaterialCommunityIcons name="camera" size={24} color="black" />
          </TouchableOpacity> */}
        </View>
      </Camera>
      {/* Display captured images */}
      <View style={styles.imagesContainer}>
        {capturedImages.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.capturedImage} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -10,
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
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  capturedImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
