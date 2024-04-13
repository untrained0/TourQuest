import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../Utils/Colors';
import { app } from '../../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, getFirestore, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { generateRandomString } from '../../Utils/GenerateRandomString';
import { UserDetailContext } from '../../Contexts/UserDetailContext';

export default function PhotoDetailScreen() {
  const isFocused = useIsFocused();
  const params = useRoute().params;
  const navigation = useNavigation();

  const { user } = useUser();
  const storage = getStorage(app);
  const db = getFirestore(app);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [uploadProgress, setUploadProgress] = useState(0);



  useEffect(() => {
    console.log('Params:', params);
    if (params && params.images) {
      console.log('Captured Images:', params.images);
      setCapturedImages(
        params.images.map((image, index) => ({ id: index.toString(), uri: image.uri, caption: '', location: image.location }))
      );
    }
  }, [isFocused, params?.images]);

  const [capturedImages, setCapturedImages] = useState([]);

  const onAddPost = async () => {
    const metadata = {
      contentType: 'video/mp4',
    };

    const response = await fetch(params?.video);
    const blob = await response.blob();

    const storageRef = ref(storage, 'post-videos/' + Date.now() + '.mp4');
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading video:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at:', downloadURL);
        saveInfo(downloadURL);
      }
    );
  };
  

  const saveInfo = async (videoUrl) => {
  //   const updatedUserDetail = { ...userDetail, points: userDetail.points + 100 };
  // setUserDetail(updatedUserDetail);

  // // Save user details to Firebase
  // const washingtonRef = doc(db, "UserDetail", " " + userDetail.id.trim());
  // await updateDoc(washingtonRef, {
  //   userDetail: updatedUserDetail,
  // });
    console.log('Data added in firebase database!');
    const docId = generateRandomString();
    await setDoc(doc(db, 'addedPost', docId), {
      VideoUrl: videoUrl,
      VideoCaption: params?.videoCaption,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      Likes: 0,
      Comments: [],
      PostId: docId,
      UserID: userDetail.id,
      createdAt: serverTimestamp(),
      images: capturedImages.map((image) => ({
        uri: image.uri,
        caption: image.caption,
        location: image.location,
      })),
    });
    navigation.navigate('Home');
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={capturedImages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.capturedImage} />
            <TextInput
              style={styles.captionInput}
              placeholder="Add a Caption..."
              value={capturedImages[index].caption} // Controlled input
              onChangeText={(text) => {
                const updatedCapturedImages = [...capturedImages];
                updatedCapturedImages[index].caption = text;
                setCapturedImages(updatedCapturedImages);
              }}
              multiline
            />
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addPostButton} onPress={onAddPost}>
          <Text style={{ color: Colors.WHITE, fontSize: 20, padding: 5 }}>Add Post</Text>
        </TouchableOpacity>
      </View>
      {uploadProgress > 0 && (
        <View style={styles.progressContainer}>
          <Text>{`Uploading: ${Math.round(uploadProgress)}%`}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 60,
  },
  imageContainer: {
    marginRight: 10,
  },
  capturedImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
  captionInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  addPostButton: {
    backgroundColor: Colors.BLUE,
    padding: 12,
    borderRadius: 15,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});