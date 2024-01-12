import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, ScrollView, StyleSheet } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { app } from '../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { generateRandomString } from '../Utils/GenerateRandomString';
import { UserDetailContext } from '../Contexts/UserDetailContext';


export default function CreateProfileScreen() {

    const {userDetail, setUserDetail} = useContext(UserDetailContext);

    const navigation = useNavigation();
    const storage = getStorage(app);
    const db = getFirestore(app);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageBlob = await uploadImageAsync(result.assets[0].uri)
            setUserDetail(prevState => ({ ...prevState, image: imageBlob }));
        }
    };

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        try {
            const storageRef = ref(storage, 'Profile_photos/' + Date.now());
            const result = await uploadBytes(storageRef, blob);

            blob.close();

            return await getDownloadURL(storageRef);

        } catch (error) {
            console.log('error: ', error);
        }

    }

    const saveInfo = async () => {
        console.log("Data added in firebase database!");
        const docId = generateRandomString();
        setUserDetail(prevState => ({ ...prevState, id: docId }));
        await setDoc(doc(db, "UserDetail", docId), {
            userDetail: userDetail,
            id: docId.trim(),
        });
        ToastAndroid.show('Profile Created Successfully!', ToastAndroid.SHORT);
        navigation.navigate('HomePage');
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Create Profile</Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={userDetail.image == null ? require('./../../assets/images/plus-icon.png') : { uri: userDetail.image }}
                        style={styles.profileImage}
                    />
                    <View style={styles.cameraIcon}>
                        <MaterialIcons name="photo-camera" size={24} color={Colors.GRAY} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.formField}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        placeholder="Name"
                        value={userDetail.name}
                        onChangeText={(name) => setUserDetail((prevState) => ({ ...prevState, name }))}
                        style={styles.input}
                    />
                </View>
                <View style={styles.formField}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        placeholder="Username"
                        value={userDetail.username}
                        onChangeText={(username) => setUserDetail((prevState) => ({ ...prevState, username }))}
                        style={styles.input}
                    />
                </View>
                <View style={styles.formField}>
                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        placeholder="Bio"
                        value={userDetail.bio}
                        onChangeText={(bio) => setUserDetail((prevState) => ({ ...prevState, bio }))}
                        style={styles.input}
                        multiline={true}
                        numberOfLines={3}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                    // CreateProfile(image);
                    saveInfo();
                }}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    imageContainer: {
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: Colors.BLACK,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        zIndex: 9999,
    },
    formContainer: {
        padding: 20,
    },
    formField: {
        marginBottom: 20,
    },
    label: {
        opacity: 0.5,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#CDCDCD',
    },
    nextButton: {
        backgroundColor: Colors.BLUE,
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 8,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
