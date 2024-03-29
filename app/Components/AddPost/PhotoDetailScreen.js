import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../Utils/Colors';
import { app } from '../../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { generateRandomString } from '../../Utils/GenerateRandomString';
import { UserDetailContext } from '../../Contexts/UserDetailContext';
import { AntDesign } from '@expo/vector-icons';

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
            <Text style={styles.caption}>{capturedImages[index].caption}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddPost}>
        <AntDesign name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Add Post</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
  },
  imageContainer: {
    marginBottom: 20,
  },
  capturedImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
  caption: {
    fontSize: 16,
    marginTop: 5,
    color: Colors.GRAY,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BLUE,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 400,
  },
  addButtonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
