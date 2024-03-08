import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../Utils/Colors';
import { UserDetailContext } from '../../Contexts/UserDetailContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from '../../../firebaseConfig';

export default function EditProfile({ route, navigation }) {
    const { name, accountName, profileImage, bio } = route.params;
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [editSuccess, setEditSuccess] = useState(false);

    const storage = getStorage(app);
    const db = getFirestore(app);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const imageBlob = await uploadImageAsync(result.uri);
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
                console.error(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        try {
            const storageRef = ref(storage, 'Profile_photos/' + Date.now());
            await uploadBytes(storageRef, blob);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    }

    const onEditProfile = async () => {
        const washingtonRef = doc(db, "UserDetail", " " + userDetail.id.trim());
        await updateDoc(washingtonRef, {
            userDetail: userDetail,
        });
        setEditSuccess(true);
        ToastAndroid.show('Edited Successfully!', ToastAndroid.SHORT);
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close-outline" style={styles.headerIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={onEditProfile}>
                    <Ionicons name="checkmark" style={[styles.headerIcon, styles.headerIconCheck]} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={userDetail.image ? { uri: userDetail.image } : require('./../../../assets/images/plus-icon.png')}
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
                        style={[styles.input, styles.bioInput]}
                        multiline={true}
                        numberOfLines={3}
                    />
                </View>
            </View>
            {editSuccess && <Text style={styles.successMessage}>Profile Updated Successfully!</Text>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LIGHT_GRAY,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.WHITE,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIcon: {
        fontSize: 30,
        color: Colors.DARK_GRAY,
    },
    headerIconCheck: {
        color: Colors.PRIMARY,
    },
    imageContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.WHITE,
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
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        padding: 5,
    },
    formContainer: {
        padding: 20,
        backgroundColor: Colors.WHITE,
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
        borderColor: Colors.LIGHT_GRAY,
    },
    bioInput: {
        height: 100,
        paddingTop: 10,
    },
    successMessage: {
        textAlign: 'center',
        marginTop: 20,
        color: Colors.PRIMARY,
        fontSize: 16,
    },
});
