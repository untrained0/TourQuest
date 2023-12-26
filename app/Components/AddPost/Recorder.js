import { View, Text, TouchableOpacity, StyleSheet, type } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Recorder() {

    const cameraRef = useRef(null);

    const [values, setValues] = useState({
        hasPermission: [],
        cameraType: Camera.Constants.Type.back,
        isFlashLightOn: Camera.Constants.FlashMode.off,
        videoStatus: 0
    });

    const { hasPermission, cameraType, isFlashLightOn, videoStatus } = values;

    useEffect(() => {
        getPermissions();
    }, []);

    const getPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        const AudioStatus = await Audio.requestPermissionsAsync();
        setValues({ ...values, hasPermission: [status, AudioStatus.status] });
    }

    const videoRecord = async () => {
        if (!videoStatus && cameraRef.current) {
            
            setValues({
                ...values,
                videoStatus: 1,
                isFlashLightOn: isFlashLightOn ?
                    Camera.Constants.FlashMode.torch :
                    isFlashLightOn
            });
            
            await cameraRef.current
                .recordAsync()
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => console.log(e));

        } else {
            try {
                await cameraRef.current.stopRecording();
                setValues({
                    ...values,
                    videoStatus: 0,
                    isFlashLightOn: Camera.Constants.FlashMode.off,
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Camera ref={cameraRef} flashMode={isFlashLightOn} style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            if (!videoStatus) {
                                setValues({
                                    ...values,
                                    isFlashLightOn: isFlashLightOn ?
                                        Camera.Constants.FlashMode.off :
                                        Camera.Constants.FlashMode.on
                                })
                            }
                        }}>
                        <MaterialCommunityIcons name={isFlashLightOn ? 'flashlight-off' : 'flashlight'} size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                        onPress={() => videoRecord()}>
                        <MaterialCommunityIcons name={videoStatus ? "stop" : 'record'} size={24} color="black" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                        if (!videoStatus) {
                            setValues({
                                ...values,
                                cameraType: cameraType ?
                                Camera.Constants.Type.back:
                                Camera.Constants.Type.front
                            })
                        }
                      }} >
                        <MaterialCommunityIcons name="camera-front" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
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


