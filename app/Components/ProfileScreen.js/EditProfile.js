import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../Utils/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { UserDetailContext } from '../../Contexts/UserDetailContext';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from '../../../firebaseConfig';
import CheckBox from 'react-native-checkbox'; // Import CheckBox component

export default function EditProfile({ route, navigation }) {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const { name, accountName, profileImage, bio, interests } = route.params;

    const storage = getStorage(app);
    const db = getFirestore(app);

    const [selectedInterests, setSelectedInterests] = useState([]);

    useEffect(() => {
        setSelectedInterests(interests || []);
    }, [interests]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
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

    const onEditProfile = async () => {
        const washingtonRef = doc(db, "UserDetail", " " + userDetail.id.trim());

        await updateDoc(washingtonRef, {
            userDetail: userDetail,
            interests: selectedInterests, // Update the interests in the database
        });
        console.log("updated");
        ToastAndroid.show('Edited Successfully!', ToastAndroid.SHORT);
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close-outline" style={{ fontSize: 35 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Edit Profile</Text>
                <TouchableOpacity
                    onPress={() => {
                        onEditProfile(); // Call the function to update the profile
                    }}>
                    <Ionicons name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={userDetail.image == null ? require('./../../../assets/images/plus-icon.png') : { uri: userDetail.image }}
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
                <View style={styles.formField}>
                    <Text style={styles.label}>Interests</Text>
                    <ScrollView style={styles.dropdownContent}>
                        {Array.isArray(interests) && interests.map((interest, index) => (
                            <View key={index} style={styles.checkboxContainer}>
                                <Text style={styles.dropdownItem}>{interest}</Text>
                                <CheckBox
                                    isChecked={selectedInterests.includes(interest)}
                                    onClick={() => {
                                        if (selectedInterests.includes(interest)) {
                                            setSelectedInterests(prev => prev.filter(item => item !== interest));
                                        } else {
                                            setSelectedInterests(prev => [...prev, interest]);
                                        }
                                    }}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        color:'white',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    selectedInterestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 20,
    },
    selectedInterest: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 5,
    },
    dropdownContent: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#CDCDCD',
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: 'white', // Background color for the dropdown content
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#CDCDCD',
    },
    dropdownItem: {
        flex: 1,
    },
});

export { EditProfile };

