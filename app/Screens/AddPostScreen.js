import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Colors from '../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { generateRandomString } from '../Utils/GenerateRandomString';

export default function AddPostScreen() {
  const { user } = useUser();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const video = useRef(null);
  const captionInput = useRef(null); // Added ref for caption input
  const navigation = useNavigation();
  const params = useRoute().params;

  // const [progress, setProgress] = useState(0);
  // const [fileDocId, setFileDocId] = useState();
  // const [videoUrl, setVideoUrl] = useState();
  const [caption, setCaption] = useState(''); // Added state for caption

  const onRecord = () => {
    navigation.navigate('Recorder');
  };

  const onAddPost = async () => {
    const metadata = {
      contentType: 'video/mp4',
    };

    const response = await fetch(params?.video);
    const blob = await response.blob();

    const storageRef = ref(storage, 'post-videos/' + Date.now() + '.mp4');
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        // setProgress(progress);
      },
      (error) => {
        console.error('Error uploading video:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at:', downloadURL);
        // setVideoUrl(downloadURL);
        saveInfo(downloadURL);
      }
    );
  };

  const saveInfo = async (videoUrl) => {
    console.log("Data added in firebase database!");
    const docId = generateRandomString();
    await setDoc(doc(db, "addedPost", docId), {
      VideoUrl: videoUrl,
      caption: caption, // Save caption in the database
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      Likes: 0,
      Comments : 0,
      id: docId,
    });
    // setFileDocId(docId);
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      {params?.video ? (
        <>
          <Video
            ref={video}
            style={{ width: '100%', flex: 1, marginBottom: '50%' }}
            source={{
              uri: params?.video,
            }}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
          <View style={styles.captionContainer}>
            <TextInput
              ref={captionInput}
              style={styles.captionInput}
              placeholder="Add a Caption..."
              onChangeText={(text) => setCaption(text)}
              multiline
            />
            <TouchableOpacity style={styles.addPostButton} onPress={onAddPost}>
              <Text style={{ color: Colors.WHITE, fontSize: 20, padding: 5 }}>Add Post</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TouchableOpacity style={styles.recordButton} onPress={onRecord}>
          <Text style={{ color: Colors.WHITE, fontSize: 20, padding: 5 }}>Record</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: Colors.GREEN,
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  addPostButton: {
    backgroundColor: Colors.BLUE,
    padding: 12,
    borderRadius: 15,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captionInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
  },
});
